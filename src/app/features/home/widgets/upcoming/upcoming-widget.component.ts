import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserCardsService } from '../../../../core/services/user-cards.service';
import { BenefitsService } from '../../../../core/services/benefits.service';
import { BankBonusesService } from '../../../../core/services/bank-bonuses.service';
import { SubscriptionsService } from '../../../../core/services/subscriptions.service';
import { RewardsService } from '../../../../core/services/rewards.service';
import { CARD_MAP } from '../../../../core/data/cards';
import {
  RECURRING_DAYS,
  UPCOMING_DAYS,
  describeDaysLeft,
  getUpcomingEvents,
  type UpcomingKind
} from '../../../../core/utils/upcoming.utils';
import { formatDate, toIsoDate } from '../../../../core/utils/date.utils';

const KIND_BADGES: Record<UpcomingKind, { label: string; class: string }> = {
  bonus: { label: 'Bonus', class: 'badge-warning' },
  fee: { label: 'Annual fee', class: 'badge-danger' },
  close: { label: 'Close', class: 'badge-info' },
  payment: { label: 'Payment', class: 'badge-info' },
  credit: { label: 'Credit', class: 'badge-success' },
  charge: { label: 'Charge', class: '' }
};

/** How many events show before "Show all" */
const COLLAPSED_COUNT = 6;

/** Deadlines and dates coming up across the app */
@Component({
  selector: 'app-upcoming-widget',
  imports: [RouterLink],
  templateUrl: './upcoming-widget.component.html',
  styleUrl: '../widget.scss'
})
export class UpcomingWidgetComponent {
  private readonly userCardsService = inject(UserCardsService);
  private readonly benefitsService = inject(BenefitsService);
  private readonly bankBonusesService = inject(BankBonusesService);
  private readonly subscriptionsService = inject(SubscriptionsService);
  private readonly rewardsService = inject(RewardsService);

  readonly upcomingDays = UPCOMING_DAYS;
  readonly recurringDays = RECURRING_DAYS;
  readonly badges = KIND_BADGES;
  readonly describeDaysLeft = describeDaysLeft;
  readonly showAll = signal(false);

  readonly events = computed(() =>
    getUpcomingEvents({
      cards: this.userCardsService.cards().flatMap(userCard => {
        const card = CARD_MAP.get(userCard.cardId);
        return card && !userCard.isWishlist ? [{ userCard, card }] : [];
      }),
      credits: this.benefitsService.credits(),
      bankBonuses: this.bankBonusesService.bonuses(),
      subscriptions: this.subscriptionsService.subscriptions(),
      nameOf: userCard => this.rewardsService.getName(userCard)
    })
  );

  readonly shown = computed(() => (this.showAll() ? this.events() : this.events().slice(0, COLLAPSED_COUNT)));
  readonly hiddenCount = computed(() => this.events().length - this.shown().length);

  formatDay(date: Date): string {
    return formatDate(toIsoDate(date)).replace(/, \d{4}$/, '');
  }
}
