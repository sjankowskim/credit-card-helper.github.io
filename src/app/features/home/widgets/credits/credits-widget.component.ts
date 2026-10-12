import { Component, computed, inject } from '@angular/core';
import { BenefitsService } from '../../../../core/services/benefits.service';
import { RewardsService } from '../../../../core/services/rewards.service';
import type { UserCard } from '../../../../core/models/card.model';
import { formatCurrency } from '../../../../core/utils/card-display.utils';
import { formatDate, toIsoDate } from '../../../../core/utils/date.utils';

const SHOWN = 5;

/** Statement credits with money left this period, soonest to reset first */
@Component({
  selector: 'app-credits-widget',
  templateUrl: './credits-widget.component.html',
  styleUrl: '../widget.scss'
})
export class CreditsWidgetComponent {
  private readonly benefitsService = inject(BenefitsService);
  private readonly rewardsService = inject(RewardsService);

  readonly formatCurrency = formatCurrency;

  readonly unused = computed(() =>
    this.benefitsService
      .credits()
      .filter(credit => credit.remaining > 0)
      .sort((a, b) => (a.period.daysLeft ?? Infinity) - (b.period.daysLeft ?? Infinity))
  );

  readonly remaining = computed(() => this.unused().reduce((sum, credit) => sum + credit.remaining, 0));
  readonly shown = computed(() => this.unused().slice(0, SHOWN));
  readonly hiddenCount = computed(() => this.unused().length - this.shown().length);

  cardName(userCard: UserCard): string {
    return this.rewardsService.getName(userCard);
  }

  formatEnd(end: Date | null): string {
    return end ? formatDate(toIsoDate(end)) : 'No expiry';
  }
}
