import { Injectable, computed, inject } from '@angular/core';
import { StorageService } from './storage.service';
import { UserCardsService } from './user-cards.service';
import { CppSettingsService } from './cpp-settings.service';
import { BenefitsService } from './benefits.service';
import { CARD_MAP } from '../data/cards';
import { REWARDS_PROGRAM_REGISTRY } from '../data/rewards-program.registry';
import { CardStatus, type Card, type RewardsProgram, type UserCard } from '../models/card.model';
import type { EarnedEntry, LoyaltyAccount, LoyaltyEarnedEntry, Redemption, RewardsBalance } from '../models/rewards.model';
import { getAnnualFee, getCardDisplayName, getDisplayInstanceNumber } from '../utils/card-display.utils';
import { parseLocalDate, toIsoDate, today } from '../utils/date.utils';
import { getBonusValue } from '../utils/sub.utils';

/** One place rewards accumulate: a transferable points program, or one card's cash back */
export interface RewardsPool {
  key: string;
  label: string;
  /** Names of the cards that earn into this pool */
  cardNames: string[];
  program: RewardsProgram;
  isCash: boolean;
  balance?: RewardsBalance;
  /** Dollar value of the balance */
  value: number;
}

/**
 * Something earned on a card, for display: an earned-log entry, or a record kept
 * elsewhere (sign-up bonus on the card, posted referral, accepted retention offer)
 */
export interface EarnedRow {
  /** Log entry id; undefined for rows that come from elsewhere and are edited there */
  entryId?: string;
  /** Where a row without an entryId is edited */
  origin: 'log' | 'card' | 'benefits';
  /** True when `amount` is in dollars rather than the card's rewards currency */
  isCash: boolean;
  userCard: UserCard;
  card: Card;
  date: string;
  amount: number;
  source: EarnedEntry['source'];
  note?: string;
  value: number;
}

/** A hand-entered loyalty balance with its dollar values */
export interface LoyaltyAccountValue {
  account: LoyaltyAccount;
  value: number;
  /** Value of everything ever earned; undefined when all-time earned isn't set */
  allTimeValue?: number;
  /** True when a card in the wallet already tracks this program's balance, so it's left out of the total */
  duplicatesCardPool: boolean;
}

/** Miles earned in a hand-entered loyalty account, for display */
export interface LoyaltyEarnedRow {
  entry: LoyaltyEarnedEntry;
  account: LoyaltyAccount;
  value: number;
}

export interface CardValue {
  userCard: UserCard;
  card: Card;
  name: string;
  earnedValue: number;
  /** Dollars of statement credits used */
  creditsValue: number;
  annualFee: number;
  net: number;
}

/** Redemptions averaged for one card points program or one airline miles account */
export interface ProgramCpp {
  key: string;
  label: string;
  program?: RewardsProgram;
  loyaltyAccountId?: string;
  points: number;
  cashValue: number;
  /** Cents per point across all redemptions */
  cpp: number;
}

@Injectable({
  providedIn: 'root'
})
export class RewardsService {
  private readonly storage = inject(StorageService);
  private readonly userCardsService = inject(UserCardsService);
  private readonly cppSettingsService = inject(CppSettingsService);
  private readonly benefitsService = inject(BenefitsService);

  private readonly rewards = computed(() => this.storage.state().rewards);
  readonly redemptions = computed(() => [...this.rewards().redemptions].sort((a, b) => b.date.localeCompare(a.date)));

  private readonly ownedCards = computed(() =>
    this.userCardsService.cards().flatMap(userCard => {
      const card = CARD_MAP.get(userCard.cardId);
      return card && !userCard.isWishlist ? [{ userCard, card }] : [];
    })
  );

  getName(userCard: UserCard): string {
    const card = CARD_MAP.get(userCard.cardId);
    const name = getCardDisplayName(userCard, card?.name ?? userCard.cardId);
    const number = getDisplayInstanceNumber(userCard, this.ownedCards().map(o => o.userCard));
    return number ? `${name} #${number}` : name;
  }

  /** Dollar value of an amount earned on `card`: cash back is dollars, points use the program's CPP */
  valueOf(amount: number, card: Card): number {
    return card.rewardsCurrency === 'Cashback'
      ? amount
      : (amount * this.cppSettingsService.getCppValuation(card.rewardsProgram)) / 100;
  }

  // ---- Balances ----

  /**
   * Pools for active cards: points cards share one pool per program; each cash-back
   * card has its own. Pools with a saved balance stay listed after their cards close.
   */
  readonly pools = computed<RewardsPool[]>(() => {
    const balances = this.rewards().balances;
    const pools = new Map<string, RewardsPool>();

    for (const { userCard, card } of this.ownedCards()) {
      const isCash = card.rewardsCurrency === 'Cashback';
      const key = isCash ? `card:${userCard.id}` : `program:${card.rewardsProgram}`;
      const isActive = userCard.userData.status === CardStatus.ACTIVE;
      if (!isActive && !balances[key]) continue;

      const pool = pools.get(key) ?? {
        key,
        label: isCash ? `${this.getName(userCard)} cash back` : card.rewardsCurrency,
        cardNames: [],
        program: card.rewardsProgram,
        isCash,
        balance: balances[key],
        value: 0
      };
      if (isActive) pool.cardNames.push(this.getName(userCard));
      pools.set(key, pool);
    }

    return [...pools.values()].map(pool => ({
      ...pool,
      value: pool.balance
        ? pool.isCash
          ? pool.balance.balance
          : (pool.balance.balance * this.cppSettingsService.getCppValuation(pool.program)) / 100
        : 0
    }));
  });

  // ---- Loyalty accounts (entered by hand) ----

  readonly loyaltyAccounts = computed<LoyaltyAccountValue[]>(() => {
    const trackedPrograms = new Set(this.pools().filter(p => p.balance && !p.isCash).map(p => p.program));
    return (this.rewards().loyaltyAccounts ?? []).map(account => ({
      account,
      value: (account.balance * account.cpp) / 100,
      allTimeValue: account.allTimeEarned === undefined ? undefined : (account.allTimeEarned * account.cpp) / 100,
      duplicatesCardPool: !!account.program && trackedPrograms.has(account.program)
    }));
  });

  addLoyaltyAccount(account: Omit<LoyaltyAccount, 'id' | 'asOf'>): void {
    this.updateLoyaltyAccounts(accounts => [...accounts, { ...account, id: crypto.randomUUID(), asOf: toIsoDate(today()) }]);
  }

  /** Changing the balance stamps today as its as-of date */
  updateLoyaltyAccount(id: string, changes: Partial<Omit<LoyaltyAccount, 'id' | 'asOf'>>): void {
    this.updateLoyaltyAccounts(accounts =>
      accounts.map(a =>
        a.id === id ? { ...a, ...changes, ...('balance' in changes ? { asOf: toIsoDate(today()) } : {}) } : a
      )
    );
  }

  removeLoyaltyAccount(id: string): void {
    this.storage.update('rewards', rewards => ({
      ...rewards,
      loyaltyAccounts: (rewards.loyaltyAccounts ?? []).filter(a => a.id !== id),
      loyaltyEarned: (rewards.loyaltyEarned ?? []).filter(e => e.accountId !== id),
      redemptions: rewards.redemptions.filter(r => r.loyaltyAccountId !== id)
    }));
  }

  getLoyaltyAccount(id: string | undefined): LoyaltyAccount | undefined {
    return id ? (this.rewards().loyaltyAccounts ?? []).find(a => a.id === id) : undefined;
  }

  readonly loyaltyEarned = computed(() => [...(this.rewards().loyaltyEarned ?? [])].sort((a, b) => b.date.localeCompare(a.date)));

  /** Miles earned with their account and dollar value at the account's ¢ per mile */
  readonly loyaltyEarnedRows = computed<LoyaltyEarnedRow[]>(() => {
    const accounts = new Map((this.rewards().loyaltyAccounts ?? []).map(a => [a.id, a]));
    return this.loyaltyEarned().flatMap(entry => {
      const account = accounts.get(entry.accountId);
      return account ? [{ entry, account, value: (entry.amount * account.cpp) / 100 }] : [];
    });
  });

  /** Logs miles earned and adds them to the account's balance and all-time total */
  addLoyaltyEarned(entry: Omit<LoyaltyEarnedEntry, 'id'>): void {
    this.storage.update('rewards', rewards => ({
      ...rewards,
      loyaltyEarned: [...(rewards.loyaltyEarned ?? []), { ...entry, id: crypto.randomUUID() }],
      loyaltyAccounts: adjustAccount(rewards.loyaltyAccounts ?? [], entry.accountId, entry.amount, entry.amount)
    }));
  }

  /** Deletes a miles-earned entry and takes its miles back off the account */
  removeLoyaltyEarned(id: string): void {
    this.storage.update('rewards', rewards => {
      const entry = (rewards.loyaltyEarned ?? []).find(e => e.id === id);
      return {
        ...rewards,
        loyaltyEarned: (rewards.loyaltyEarned ?? []).filter(e => e.id !== id),
        loyaltyAccounts: entry
          ? adjustAccount(rewards.loyaltyAccounts ?? [], entry.accountId, -entry.amount, -entry.amount)
          : rewards.loyaltyAccounts ?? []
      };
    });
  }

  private updateLoyaltyAccounts(recipe: (accounts: LoyaltyAccount[]) => LoyaltyAccount[]): void {
    this.storage.update('rewards', rewards => ({ ...rewards, loyaltyAccounts: recipe(rewards.loyaltyAccounts ?? []) }));
  }

  /** Card pools plus hand-entered loyalty balances (skipping ones a card pool already counts) */
  readonly totalBalanceValue = computed(
    () =>
      this.pools().reduce((sum, p) => sum + p.value, 0) +
      this.loyaltyAccounts().reduce((sum, a) => sum + (a.duplicatesCardPool ? 0 : a.value), 0)
  );

  setBalance(key: string, balance: number | undefined): void {
    this.storage.update('rewards', rewards => {
      const balances = { ...rewards.balances };
      if (balance === undefined) delete balances[key];
      else balances[key] = { balance, asOf: toIsoDate(today()) };
      return { ...rewards, balances };
    });
  }

  // ---- Earned ----

  /** Log entries plus earned sign-up bonuses, newest first */
  readonly earnedRows = computed<EarnedRow[]>(() => {
    const owned = new Map(this.ownedCards().map(o => [o.userCard.id, o]));

    const logged = this.rewards().earned.flatMap(entry => {
      const o = owned.get(entry.userCardId);
      return o
        ? [{ entryId: entry.id, origin: 'log' as const, isCash: false, ...o, ...pick(entry), value: this.valueOf(entry.amount, o.card) }]
        : [];
    });

    const referrals = this.benefitsService.referrals().flatMap(referral => {
      const o = owned.get(referral.userCardId);
      if (!o || referral.status !== 'posted' || !referral.postedDate) return [];
      return [{
        ...o,
        origin: 'benefits' as const,
        isCash: false,
        date: referral.postedDate,
        amount: referral.bonusAmount,
        source: 'referral' as const,
        note: referral.referredWho ? `Referred ${referral.referredWho}` : 'Referral bonus',
        value: this.valueOf(referral.bonusAmount, o.card)
      }];
    });

    const retention = this.benefitsService.retentionOffers().flatMap(offer => {
      const o = owned.get(offer.userCardId);
      if (!o || !offer.accepted) return [];
      return [{
        ...o,
        origin: 'benefits' as const,
        isCash: true,
        date: offer.date,
        amount: offer.value,
        source: 'retention' as const,
        note: offer.description,
        value: offer.value
      }];
    });

    const bonuses = this.ownedCards().flatMap(({ userCard, card }) => {
      const bonus = userCard.userData.signUpBonus;
      if (!bonus?.earnedDate) return [];
      const cpp = this.cppSettingsService.getCppValuation(card.rewardsProgram);
      return [{
        userCard,
        card,
        origin: 'card' as const,
        isCash: false,
        date: bonus.earnedDate,
        amount: bonus.amount,
        source: 'sub' as const,
        note: 'Sign-up bonus',
        value: getBonusValue(bonus, cpp)
      }];
    });

    return [...logged, ...bonuses, ...referrals, ...retention].sort((a, b) => b.date.localeCompare(a.date));
  });

  addEarned(entry: Omit<EarnedEntry, 'id'>): void {
    this.storage.update('rewards', rewards => ({
      ...rewards,
      earned: [...rewards.earned, { ...entry, id: crypto.randomUUID() }]
    }));
  }

  removeEarned(id: string): void {
    this.storage.update('rewards', rewards => ({ ...rewards, earned: rewards.earned.filter(e => e.id !== id) }));
  }

  /** Earned value plus credits used, minus annual fee, for each card active or earning in `year` */
  getCardValues(year: number): CardValue[] {
    const earnedByCard = new Map<string, number>();
    for (const row of this.earnedRows()) {
      if (parseLocalDate(row.date)?.getFullYear() === year) {
        earnedByCard.set(row.userCard.id, (earnedByCard.get(row.userCard.id) ?? 0) + row.value);
      }
    }

    return this.ownedCards()
      .filter(
        ({ userCard }) =>
          userCard.userData.status === CardStatus.ACTIVE ||
          earnedByCard.has(userCard.id) ||
          this.benefitsService.capturedIn(userCard.id, year) > 0
      )
      .map(({ userCard, card }) => {
        const earnedValue = earnedByCard.get(userCard.id) ?? 0;
        const creditsValue = this.benefitsService.capturedIn(userCard.id, year);
        const annualFee = userCard.userData.status === CardStatus.ACTIVE ? getAnnualFee(userCard, card) : 0;
        const net = earnedValue + creditsValue - annualFee;
        return { userCard, card, name: this.getName(userCard), earnedValue, creditsValue, annualFee, net };
      })
      .sort((a, b) => b.net - a.net);
  }

  // ---- Redemptions ----

  /** Logs a redemption; airline miles redemptions also come off that account's balance */
  addRedemption(redemption: Omit<Redemption, 'id'>): void {
    this.storage.update('rewards', rewards => ({
      ...rewards,
      redemptions: [...rewards.redemptions, { ...redemption, id: crypto.randomUUID() }],
      loyaltyAccounts: redemption.loyaltyAccountId
        ? adjustAccount(rewards.loyaltyAccounts ?? [], redemption.loyaltyAccountId, -redemption.points, 0)
        : rewards.loyaltyAccounts ?? []
    }));
  }

  /** Deletes a redemption; airline miles go back on the account */
  removeRedemption(id: string): void {
    this.storage.update('rewards', rewards => {
      const redemption = rewards.redemptions.find(r => r.id === id);
      return {
        ...rewards,
        redemptions: rewards.redemptions.filter(r => r.id !== id),
        loyaltyAccounts: redemption?.loyaltyAccountId
          ? adjustAccount(rewards.loyaltyAccounts ?? [], redemption.loyaltyAccountId, redemption.points, 0)
          : rewards.loyaltyAccounts ?? []
      };
    });
  }

  /** What a redemption came from, for display */
  getRedemptionSource(redemption: Redemption): string {
    if (redemption.loyaltyAccountId) return this.getLoyaltyAccount(redemption.loyaltyAccountId)?.name ?? 'Removed miles account';
    return redemption.program ?? '';
  }

  /** Average realized CPP per program, weighted by points redeemed */
  readonly programCpps = computed<ProgramCpp[]>(() => {
    const totals = new Map<string, Omit<ProgramCpp, 'cpp'>>();
    for (const r of this.rewards().redemptions) {
      const key = r.loyaltyAccountId ? `account:${r.loyaltyAccountId}` : `program:${r.program}`;
      const total = totals.get(key) ?? {
        key,
        label: this.getRedemptionSource(r),
        program: r.loyaltyAccountId ? undefined : r.program,
        loyaltyAccountId: r.loyaltyAccountId,
        points: 0,
        cashValue: 0
      };
      totals.set(key, { ...total, points: total.points + r.points, cashValue: total.cashValue + r.cashValue });
    }
    return [...totals.values()].map(t => ({ ...t, cpp: t.points > 0 ? (t.cashValue / t.points) * 100 : 0 }));
  });

  /** Points programs the user's cards earn into */
  readonly pointsPrograms = computed(() => {
    const programs = new Set(
      this.ownedCards()
        .filter(({ card }) => card.rewardsCurrency !== 'Cashback')
        .map(({ card }) => card.rewardsProgram)
    );
    return [...programs].map(id => REWARDS_PROGRAM_REGISTRY[id]);
  });
}

function pick(entry: EarnedEntry): Pick<EarnedEntry, 'date' | 'amount' | 'source' | 'note'> {
  return { date: entry.date, amount: entry.amount, source: entry.source, note: entry.note };
}

/** Adds `balanceDelta` to an account's balance (not below 0) and `allTimeDelta` to its all-time total when set */
function adjustAccount(accounts: LoyaltyAccount[], id: string, balanceDelta: number, allTimeDelta: number): LoyaltyAccount[] {
  return accounts.map(a =>
    a.id === id
      ? {
          ...a,
          balance: Math.max(0, a.balance + balanceDelta),
          allTimeEarned: a.allTimeEarned === undefined ? undefined : Math.max(0, a.allTimeEarned + allTimeDelta),
          asOf: toIsoDate(today())
        }
      : a
  );
}
