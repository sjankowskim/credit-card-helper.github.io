import { Component, computed, inject, signal } from '@angular/core';
import { BenefitsService } from '../../../../core/services/benefits.service';
import { RewardsService } from '../../../../core/services/rewards.service';
import { UserCardsService } from '../../../../core/services/user-cards.service';
import { ToastService } from '../../../../core/services/toast.service';
import { CARD_MAP } from '../../../../core/data/cards';
import type { Card } from '../../../../core/models/card.model';
import type { Referral } from '../../../../core/models/benefits.model';
import { formatCurrency } from '../../../../core/utils/card-display.utils';
import { formatDate, parseLocalDate, toIsoDate, today } from '../../../../core/utils/date.utils';

@Component({
  selector: 'app-benefits-referrals',
  templateUrl: './referrals.component.html',
  styleUrl: './referrals.component.scss'
})
export class ReferralsComponent {
  private readonly benefitsService = inject(BenefitsService);
  private readonly rewardsService = inject(RewardsService);
  private readonly userCardsService = inject(UserCardsService);
  private readonly toastService = inject(ToastService);

  readonly formatCurrency = formatCurrency;
  readonly formatDate = formatDate;
  readonly year = today().getFullYear();

  readonly referrals = this.benefitsService.referrals;

  readonly cardOptions = computed(() =>
    this.benefitsService.activeCards().map(({ userCard, card }) => ({ id: userCard.id, name: this.rewardsService.getName(userCard), card }))
  );

  private readonly postedThisYear = computed(() =>
    this.referrals().filter(r => r.status === 'posted' && parseLocalDate(r.postedDate)?.getFullYear() === this.year)
  );

  readonly stats = computed(() => ({
    postedValue: this.postedThisYear().reduce((sum, r) => {
      const card = this.getCard(r);
      return sum + (card ? this.rewardsService.valueOf(r.bonusAmount, card) : 0);
    }, 0),
    postedCount: this.postedThisYear().length,
    pending: this.referrals().filter(r => r.status === 'pending').length
  }));

  /** Posted referral bonuses this year per card, against the issuer's yearly cap */
  readonly cardTotals = computed(() => {
    const totals = new Map<string, number>();
    for (const r of this.postedThisYear()) totals.set(r.userCardId, (totals.get(r.userCardId) ?? 0) + r.bonusAmount);
    return [...totals.entries()].flatMap(([userCardId, total]) => {
      const userCard = this.userCardsService.getById(userCardId);
      const card = userCard && CARD_MAP.get(userCard.cardId);
      return userCard && card
        ? [{ userCardId, name: this.rewardsService.getName(userCard), card, total, cap: card.referralCapPerYear }]
        : [];
    });
  });

  // ---- Add form ----
  readonly draftCardId = signal('');
  readonly draftDate = signal(toIsoDate(today()));
  readonly draftWho = signal('');
  readonly draftAmount = signal('');

  readonly draftCard = computed(() => this.cardOptions().find(o => o.id === this.draftCardId())?.card);
  readonly draftUnit = computed(() => {
    const card = this.draftCard();
    return card ? (card.rewardsCurrency === 'Cashback' ? '$' : card.rewardsCurrency) : '';
  });
  readonly canAdd = computed(() => !!this.draftCardId() && Number(this.draftAmount()) > 0);

  add(event: Event): void {
    event.preventDefault();
    if (!this.canAdd()) return;
    this.benefitsService.addReferral({
      userCardId: this.draftCardId(),
      date: this.draftDate(),
      referredWho: this.draftWho().trim() || undefined,
      bonusAmount: Number(this.draftAmount()),
      status: 'pending'
    });
    this.draftWho.set('');
    this.toastService.success('Referral logged as pending');
  }

  getCard(referral: Referral): Card | undefined {
    const userCard = this.userCardsService.getById(referral.userCardId);
    return userCard && CARD_MAP.get(userCard.cardId);
  }

  getCardName(referral: Referral): string {
    const userCard = this.userCardsService.getById(referral.userCardId);
    return userCard ? this.rewardsService.getName(userCard) : 'Removed card';
  }

  formatBonus(amount: number, card: Card | undefined): string {
    if (!card || card.rewardsCurrency === 'Cashback') return formatCurrency(amount);
    return `${amount.toLocaleString('en-US')} ${card.rewardsCurrency}`;
  }

  setPosted(referral: Referral, posted: boolean): void {
    this.benefitsService.setReferralPosted(referral.id, posted);
    if (posted) this.toastService.success('Referral bonus posted and added to your earned rewards');
  }

  remove(referral: Referral): void {
    this.benefitsService.removeReferral(referral.id);
  }
}
