import { Component, computed, inject } from '@angular/core';
import { SubscriptionsService } from '../../../../core/services/subscriptions.service';
import { formatCurrency } from '../../../../core/utils/card-display.utils';
import { getAnnualCost, getNextPayment } from '../../../../core/utils/subscription.utils';
import { formatDate, toIsoDate } from '../../../../core/utils/date.utils';

const SHOWN = 4;

/** Subscription costs and the next charges */
@Component({
  selector: 'app-subscriptions-widget',
  templateUrl: './subscriptions-widget.component.html',
  styleUrl: '../widget.scss'
})
export class SubscriptionsWidgetComponent {
  private readonly subscriptionsService = inject(SubscriptionsService);

  readonly formatWhole = (value: number): string => formatCurrency(Math.round(value));
  readonly formatMoney = (value: number): string => formatCurrency(Math.round(value * 100) / 100);

  private readonly active = computed(() => this.subscriptionsService.subscriptions().filter(s => s.active));
  readonly annual = computed(() => this.active().reduce((sum, s) => sum + getAnnualCost(s), 0));

  readonly next = computed(() =>
    this.active()
      .flatMap(sub => {
        const date = getNextPayment(sub);
        return date ? [{ sub, date }] : [];
      })
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, SHOWN)
  );

  formatDay(date: Date): string {
    return formatDate(toIsoDate(date));
  }
}
