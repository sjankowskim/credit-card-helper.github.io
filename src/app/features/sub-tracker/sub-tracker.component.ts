import { Component, computed, inject, signal } from '@angular/core';
import { UserCardsService } from '../../core/services/user-cards.service';
import { CppSettingsService } from '../../core/services/cpp-settings.service';
import { ToastService } from '../../core/services/toast.service';
import { CARD_MAP } from '../../core/data/cards';
import type { Card, UserCard } from '../../core/models/card.model';
import { CardDetailComponent } from '../wallet/components/card-detail/card-detail.component';
import { formatCurrency, getCardDisplayName, getDisplayInstanceNumber } from '../../core/utils/card-display.utils';
import { formatDate, parseLocalDate, toIsoDate, today } from '../../core/utils/date.utils';
import { compareUrgency, getBonusValue, getSubProgress, type SubProgress } from '../../core/utils/sub.utils';

@Component({
  selector: 'app-sub-tracker',
  imports: [CardDetailComponent],
  templateUrl: './sub-tracker.component.html',
  styleUrl: './sub-tracker.component.scss'
})
export class SubTrackerComponent {
  private readonly userCardsService = inject(UserCardsService);
  private readonly cppSettingsService = inject(CppSettingsService);
  private readonly toastService = inject(ToastService);

  readonly formatCurrency = formatCurrency;
  readonly formatIso = formatDate;

  readonly selected = signal<{ card: Card; userCard: UserCard } | null>(null);
  /** Quick-add spend amounts being typed, by UserCard.id */
  readonly spendDrafts = signal<Partial<Record<string, string>>>({});

  private readonly ownedCards = computed(() => this.userCardsService.cards().filter(c => !c.isWishlist));

  private readonly subs = computed(() =>
    this.ownedCards().flatMap(userCard => {
      const card = CARD_MAP.get(userCard.cardId);
      const bonus = userCard.userData.signUpBonus;
      return card && bonus ? [getSubProgress(userCard, card, bonus)] : [];
    })
  );

  readonly active = computed(() => this.subs().filter(s => s.state === 'in-progress').sort(compareUrgency));

  /** Earned and missed bonuses, most recent first */
  readonly history = computed(() =>
    this.subs()
      .filter(s => s.state !== 'in-progress')
      .sort((a, b) => this.getOutcomeDate(b).localeCompare(this.getOutcomeDate(a)))
  );

  readonly stats = computed(() => {
    const year = today().getFullYear();
    const earnedThisYear = this.subs().filter(s => parseLocalDate(s.bonus.earnedDate)?.getFullYear() === year);
    return {
      active: this.active().length,
      spendRemaining: this.active().reduce((sum, s) => sum + s.remaining, 0),
      earnedCount: earnedThisYear.length,
      earnedValue: Math.round(earnedThisYear.reduce((sum, s) => sum + this.getValue(s), 0))
    };
  });

  getName(userCard: UserCard, card: Card): string {
    const name = getCardDisplayName(userCard, card.name);
    const number = getDisplayInstanceNumber(userCard, this.ownedCards());
    return number ? `${name} #${number}` : name;
  }

  getValue(sub: SubProgress): number {
    return getBonusValue(sub.bonus, this.cppSettingsService.getCppValuation(sub.card.rewardsProgram));
  }

  describeBonus(sub: SubProgress): string {
    const amount = sub.bonus.currency === 'Cashback' ? formatCurrency(sub.bonus.amount) : sub.bonus.amount.toLocaleString();
    const currency = sub.bonus.currency === 'Cashback' ? 'cash back' : sub.bonus.currency;
    const value = sub.bonus.currency === 'Cashback' ? '' : ` · worth ~${formatCurrency(Math.round(this.getValue(sub)))}`;
    return `${amount} ${currency}${value}`;
  }

  getPercent(sub: SubProgress): number {
    return sub.bonus.spendRequired > 0 ? Math.min(100, (sub.spent / sub.bonus.spendRequired) * 100) : 100;
  }

  formatDay(date: Date | null): string {
    return date ? formatDate(toIsoDate(date)) : '';
  }

  /** Earned date, or the deadline for a missed bonus, as an ISO date */
  getOutcomeDate(sub: SubProgress): string {
    return sub.bonus.earnedDate ?? (sub.deadline ? toIsoDate(sub.deadline) : '');
  }

  open(sub: SubProgress): void {
    this.selected.set({ card: sub.card, userCard: sub.userCard });
  }

  setDraft(userCardId: string, value: string): void {
    this.spendDrafts.update(drafts => ({ ...drafts, [userCardId]: value }));
  }

  addSpend(sub: SubProgress, event: Event): void {
    event.preventDefault();
    const amount = Number(this.spendDrafts()[sub.userCard.id]);
    if (!(amount > 0)) return;

    this.userCardsService.patchSignUpBonus(sub.userCard.id, { spent: sub.spent + amount });
    this.setDraft(sub.userCard.id, '');
    if (sub.spent < sub.bonus.spendRequired && sub.spent + amount >= sub.bonus.spendRequired) {
      this.toastService.success(`Spend requirement met on ${sub.card.name}! Mark it earned once the bonus posts.`);
    }
  }

  markEarned(sub: SubProgress): void {
    this.userCardsService.patchSignUpBonus(sub.userCard.id, { earnedDate: toIsoDate(today()) });
    this.toastService.success(`Earned the ${sub.card.name} bonus: ${this.describeBonus(sub)}`);
  }

  undoEarned(sub: SubProgress): void {
    this.userCardsService.patchSignUpBonus(sub.userCard.id, { earnedDate: undefined });
  }
}
