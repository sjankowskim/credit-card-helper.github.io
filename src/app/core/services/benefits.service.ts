import { Injectable, computed, inject } from '@angular/core';
import { StorageService } from './storage.service';
import { UserCardsService } from './user-cards.service';
import { CARD_MAP } from '../data/cards';
import { CardStatus, type Benefit, type Card, type UserCard } from '../models/card.model';
import type { Referral, RetentionOffer } from '../models/benefits.model';
import { getBenefitPeriod, type BenefitPeriod } from '../utils/benefit.utils';
import { parseLocalDate, toIsoDate, today } from '../utils/date.utils';

/** One credit on one card in its current period */
export interface CreditStatus {
  userCard: UserCard;
  card: Card;
  benefit: Benefit;
  isCustom: boolean;
  period: BenefitPeriod;
  used: number;
  remaining: number;
}

@Injectable({
  providedIn: 'root'
})
export class BenefitsService {
  private readonly storage = inject(StorageService);
  private readonly userCardsService = inject(UserCardsService);

  private readonly benefits = computed(() => this.storage.state().benefits);
  readonly referrals = computed(() => [...this.storage.state().referrals].sort((a, b) => b.date.localeCompare(a.date)));
  readonly retentionOffers = computed(() =>
    [...this.benefits().retentionOffers].sort((a, b) => b.date.localeCompare(a.date))
  );

  /** Active cards with their catalog card */
  readonly activeCards = computed(() =>
    this.userCardsService.cards().flatMap(userCard => {
      const card = CARD_MAP.get(userCard.cardId);
      return card && !userCard.isWishlist && userCard.userData.status === CardStatus.ACTIVE ? [{ userCard, card }] : [];
    })
  );

  /** Current-period status of every credit on every active card; expired one-time credits drop off */
  readonly credits = computed<CreditStatus[]>(() => {
    const { usage, custom } = this.benefits();
    return this.activeCards().flatMap(({ userCard, card }) => {
      const catalog = (card.benefits ?? []).map(benefit => ({ benefit, isCustom: false }));
      const added = (custom[userCard.id] ?? []).map(benefit => ({ benefit, isCustom: true }));

      return [...catalog, ...added].flatMap(({ benefit, isCustom }) => {
        const period = getBenefitPeriod(benefit, userCard.userData.accountStartDate);
        if (period.daysLeft !== null && period.daysLeft < 1) return [];
        const used = usage[userCard.id]?.[benefit.id]?.[period.key] ?? 0;
        return [{ userCard, card, benefit, isCustom, period, used, remaining: Math.max(0, benefit.amount - used) }];
      });
    });
  });

  setUsed(credit: CreditStatus, amount: number | undefined): void {
    const { id: cardKey } = credit.userCard;
    const { id: benefitKey } = credit.benefit;
    this.storage.update('benefits', benefits => {
      const periods = { ...benefits.usage[cardKey]?.[benefitKey] };
      if (amount === undefined || amount <= 0) delete periods[credit.period.key];
      else periods[credit.period.key] = Math.min(amount, credit.benefit.amount);
      return {
        ...benefits,
        usage: { ...benefits.usage, [cardKey]: { ...benefits.usage[cardKey], [benefitKey]: periods } }
      };
    });
  }

  /** Dollars of credits used on a card in periods that started in `year` */
  capturedIn(userCardId: string, year: number): number {
    const byBenefit = this.benefits().usage[userCardId] ?? {};
    let total = 0;
    for (const periods of Object.values(byBenefit)) {
      for (const [key, amount] of Object.entries(periods)) {
        // One-time credits are keyed 'once'; count them in the current year
        const keyYear = parseLocalDate(key)?.getFullYear() ?? today().getFullYear();
        if (keyYear === year) total += amount;
      }
    }
    return total;
  }

  addCustom(userCardId: string, benefit: Omit<Benefit, 'id'>): void {
    this.storage.update('benefits', benefits => ({
      ...benefits,
      custom: {
        ...benefits.custom,
        [userCardId]: [...(benefits.custom[userCardId] ?? []), { ...benefit, id: `custom-${crypto.randomUUID()}` }]
      }
    }));
  }

  removeCustom(userCardId: string, benefitId: string): void {
    this.storage.update('benefits', benefits => {
      const usage = { ...benefits.usage[userCardId] };
      delete usage[benefitId];
      return {
        ...benefits,
        custom: { ...benefits.custom, [userCardId]: (benefits.custom[userCardId] ?? []).filter(b => b.id !== benefitId) },
        usage: { ...benefits.usage, [userCardId]: usage }
      };
    });
  }

  // ---- Retention offers ----

  addRetentionOffer(offer: Omit<RetentionOffer, 'id'>): void {
    this.storage.update('benefits', benefits => ({
      ...benefits,
      retentionOffers: [...benefits.retentionOffers, { ...offer, id: crypto.randomUUID() }]
    }));
  }

  updateRetentionOffer(id: string, patch: Partial<RetentionOffer>): void {
    this.storage.update('benefits', benefits => ({
      ...benefits,
      retentionOffers: benefits.retentionOffers.map(o => (o.id === id ? { ...o, ...patch } : o))
    }));
  }

  removeRetentionOffer(id: string): void {
    this.storage.update('benefits', benefits => ({
      ...benefits,
      retentionOffers: benefits.retentionOffers.filter(o => o.id !== id)
    }));
  }

  // ---- Referrals ----

  addReferral(referral: Omit<Referral, 'id'>): void {
    this.storage.update('referrals', referrals => [...referrals, { ...referral, id: crypto.randomUUID() }]);
  }

  setReferralPosted(id: string, posted: boolean): void {
    this.storage.update('referrals', referrals =>
      referrals.map(r =>
        r.id === id
          ? { ...r, status: posted ? 'posted' : 'pending', postedDate: posted ? toIsoDate(today()) : undefined }
          : r
      )
    );
  }

  removeReferral(id: string): void {
    this.storage.update('referrals', referrals => referrals.filter(r => r.id !== id));
  }
}
