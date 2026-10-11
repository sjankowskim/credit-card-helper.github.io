import { Component, computed, inject, signal } from '@angular/core';
import { RewardsService, type EarnedRow } from '../../../../core/services/rewards.service';
import { UserCardsService } from '../../../../core/services/user-cards.service';
import { ToastService } from '../../../../core/services/toast.service';
import { CARD_MAP } from '../../../../core/data/cards';
import { CardStatus } from '../../../../core/models/card.model';
import type { EarnedSource } from '../../../../core/models/rewards.model';
import { formatCurrency } from '../../../../core/utils/card-display.utils';
import { formatDate, parseLocalDate, toIsoDate, today } from '../../../../core/utils/date.utils';

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
    for (const row of this.rewardsService.earnedRows()) {
      const date = parseLocalDate(row.date);
      if (date) years.add(date.getFullYear());
    }
    return [...years].sort((a, b) => b - a);
  });

  readonly cardValues = computed(() => this.rewardsService.getCardValues(this.year()));
  readonly rows = computed(() =>
    this.rewardsService.earnedRows().filter(row => parseLocalDate(row.date)?.getFullYear() === this.year())
  );

  /** Active cards first, then closed ones, for the add form */
  readonly cardOptions = computed(() =>
    this.userCardsService
      .cards()
      .filter(c => !c.isWishlist && CARD_MAP.has(c.cardId))
      .sort((a, b) => Number(b.userData.status === CardStatus.ACTIVE) - Number(a.userData.status === CardStatus.ACTIVE))
      .map(c => ({ id: c.id, name: this.rewardsService.getName(c), card: CARD_MAP.get(c.cardId)! }))
  );

  // ---- Add form ----
  readonly draftCardId = signal('');
  readonly draftDate = signal(toIsoDate(today()));
  readonly draftAmount = signal('');
  readonly draftSource = signal<EarnedSource>('spend');
  readonly draftNote = signal('');

  readonly draftCard = computed(() => this.cardOptions().find(o => o.id === this.draftCardId())?.card);
  readonly draftUnit = computed(() => {
    const card = this.draftCard();
    return card ? (card.rewardsCurrency === 'Cashback' ? '$' : card.rewardsCurrency) : '';
  });
  readonly canAdd = computed(() => !!this.draftCard() && Number(this.draftAmount()) > 0 && !!this.draftDate());

  add(event: Event): void {
    event.preventDefault();
    if (!this.canAdd()) return;
    this.rewardsService.addEarned({
      userCardId: this.draftCardId(),
      date: this.draftDate(),
      amount: Number(this.draftAmount()),
      source: this.draftSource(),
      note: this.draftNote().trim() || undefined
    });
    this.draftAmount.set('');
    this.draftNote.set('');
    this.toastService.success('Added to your earned log');
  }

  remove(row: EarnedRow): void {
    if (row.entryId) this.rewardsService.removeEarned(row.entryId);
  }

  getName(row: EarnedRow): string {
    return this.rewardsService.getName(row.userCard);
  }

  formatAmount(row: EarnedRow): string {
    return row.isCash || row.card.rewardsCurrency === 'Cashback'
      ? formatCurrency(row.amount)
      : `${row.amount.toLocaleString('en-US')} ${row.card.rewardsCurrency}`;
  }

  /** Where to edit a row that isn't a log entry */
  describeOrigin(row: EarnedRow): string {
    return row.origin === 'card' ? 'From card' : 'From Benefits';
  }
}
