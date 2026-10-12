import { Component, computed, inject, signal } from '@angular/core';
import { RewardsService, type EarnedRow } from '../../../../core/services/rewards.service';
import { UserCardsService } from '../../../../core/services/user-cards.service';
import { ToastService } from '../../../../core/services/toast.service';
import { CARD_MAP } from '../../../../core/data/cards';
import { CardStatus } from '../../../../core/models/card.model';
import type { EarnedSource } from '../../../../core/models/rewards.model';
import { formatCurrency } from '../../../../core/utils/card-display.utils';
import { formatDate, parseLocalDate, toIsoDate, today } from '../../../../core/utils/date.utils';

/** A row in the earned table: something earned on a card, or miles earned in an airline program */
interface DisplayRow {
  key: string;
  date: string;
  name: string;
  note?: string;
  sourceLabel: string;
  amountLabel: string;
  value: number;
  /** Set for rows deleted here; others are edited where they're recorded */
  remove?: () => void;
  origin?: string;
}

const SOURCE_LABELS: Record<EarnedSource, string> = {
  spend: 'Spending',
  sub: 'Sign-up bonus',
  referral: 'Referral',
  retention: 'Retention offer',
  other: 'Other'
};

@Component({
  selector: 'app-rewards-earned',
  templateUrl: './earned.component.html',
  styleUrl: './earned.component.scss'
})
export class EarnedComponent {
  private readonly rewardsService = inject(RewardsService);
  private readonly userCardsService = inject(UserCardsService);
  private readonly toastService = inject(ToastService);

  readonly formatCurrency = formatCurrency;
  readonly formatDate = formatDate;
  readonly sourceLabels = SOURCE_LABELS;
  /** Sign-up bonuses, referrals, and retention offers are recorded on their own pages */
  readonly sources: EarnedSource[] = ['spend', 'other'];

  readonly year = signal(today().getFullYear());
  readonly years = computed(() => {
    const years = new Set([today().getFullYear()]);
    const dates = [...this.rewardsService.earnedRows().map(r => r.date), ...this.rewardsService.loyaltyEarned().map(e => e.date)];
    for (const iso of dates) {
      const date = parseLocalDate(iso);
      if (date) years.add(date.getFullYear());
    }
    return [...years].sort((a, b) => b - a);
  });

  readonly cardValues = computed(() => this.rewardsService.getCardValues(this.year()));
  /** Card rewards and airline miles earned in the selected year, newest first */
  readonly rows = computed<DisplayRow[]>(() => {
    const inYear = (date: string) => parseLocalDate(date)?.getFullYear() === this.year();
    const cards = this.rewardsService
      .earnedRows()
      .filter(row => inYear(row.date))
      .map((row, i) => ({
        key: row.entryId ?? `${row.origin}-${row.userCard.id}-${row.date}-${i}`,
        date: row.date,
        name: this.rewardsService.getName(row.userCard),
        note: row.source !== 'sub' ? row.note : undefined,
        sourceLabel: SOURCE_LABELS[row.source],
        amountLabel: this.formatAmount(row),
        value: row.value,
        remove: row.entryId ? () => this.rewardsService.removeEarned(row.entryId!) : undefined,
        origin: row.entryId ? undefined : row.origin === 'card' ? 'From card' : 'From Benefits'
      }));
    const miles = this.rewardsService
      .loyaltyEarnedRows()
      .filter(row => inYear(row.entry.date))
      .map(row => ({
        key: row.entry.id,
        date: row.entry.date,
        name: row.account.name,
        note: row.entry.note,
        sourceLabel: 'Airline miles',
        amountLabel: `${row.entry.amount.toLocaleString('en-US')} miles`,
        value: row.value,
        remove: () => this.rewardsService.removeLoyaltyEarned(row.entry.id)
      }));
    return [...cards, ...miles].sort((a, b) => b.date.localeCompare(a.date));
  });

  /** Active cards first, then closed ones, for the add form */
  readonly cardOptions = computed(() =>
    this.userCardsService
      .cards()
      .filter(c => !c.isWishlist && CARD_MAP.has(c.cardId))
      .sort((a, b) => Number(b.userData.status === CardStatus.ACTIVE) - Number(a.userData.status === CardStatus.ACTIVE))
      .map(c => ({ id: c.id, name: this.rewardsService.getName(c), card: CARD_MAP.get(c.cardId)! }))
  );

  readonly airlineOptions = computed(() => this.rewardsService.loyaltyAccounts().map(a => ({ id: a.account.id, name: a.account.name })));

  // ---- Add form ----
  /** 'card:<UserCard.id>' or 'account:<LoyaltyAccount.id>' */
  readonly draftTarget = signal('');
  readonly draftCardId = computed(() => (this.draftTarget().startsWith('card:') ? this.draftTarget().slice(5) : ''));
  readonly draftAccountId = computed(() => (this.draftTarget().startsWith('account:') ? this.draftTarget().slice(8) : ''));
  readonly draftDate = signal(toIsoDate(today()));
  readonly draftAmount = signal('');
  readonly draftSource = signal<EarnedSource>('spend');
  readonly draftNote = signal('');

  readonly draftCard = computed(() => this.cardOptions().find(o => o.id === this.draftCardId())?.card);
  readonly draftUnit = computed(() => {
    if (this.draftAccountId()) return 'miles';
    const card = this.draftCard();
    return card ? (card.rewardsCurrency === 'Cashback' ? '$' : card.rewardsCurrency) : '';
  });
  readonly canAdd = computed(
    () => (!!this.draftCard() || !!this.draftAccountId()) && Number(this.draftAmount()) > 0 && !!this.draftDate()
  );

  add(event: Event): void {
    event.preventDefault();
    if (!this.canAdd()) return;
    const note = this.draftNote().trim() || undefined;
    if (this.draftAccountId()) {
      this.rewardsService.addLoyaltyEarned({
        accountId: this.draftAccountId(),
        date: this.draftDate(),
        amount: Number(this.draftAmount()),
        note
      });
      this.toastService.success('Miles added to your earned log and balance');
    } else {
      this.rewardsService.addEarned({
        userCardId: this.draftCardId(),
        date: this.draftDate(),
        amount: Number(this.draftAmount()),
        source: this.draftSource(),
        note
      });
      this.toastService.success('Added to your earned log');
    }
    this.draftAmount.set('');
    this.draftNote.set('');
  }

  formatAmount(row: EarnedRow): string {
    return row.isCash || row.card.rewardsCurrency === 'Cashback'
      ? formatCurrency(row.amount)
      : `${row.amount.toLocaleString('en-US')} ${row.card.rewardsCurrency}`;
  }

}
