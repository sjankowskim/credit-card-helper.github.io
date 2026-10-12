import { Component, computed, inject } from '@angular/core';
import { RewardsService } from '../../../../core/services/rewards.service';
import { formatCurrency } from '../../../../core/utils/card-display.utils';

interface BalanceRow {
  label: string;
  balance: string;
  value: number;
}

const SHOWN = 5;

/** What points and cash back are worth, biggest first */
@Component({
  selector: 'app-rewards-widget',
  templateUrl: './rewards-widget.component.html',
  styleUrl: '../widget.scss'
})
export class RewardsWidgetComponent {
  private readonly rewardsService = inject(RewardsService);

  /** Values come from balance × CPP, so round off floating-point leftovers like $1,722.0000001 */
  readonly formatCurrency = (value: number): string => formatCurrency(Math.round(value * 100) / 100);
  readonly total = this.rewardsService.totalBalanceValue;

  readonly rows = computed<BalanceRow[]>(() => {
    const pools = this.rewardsService
      .pools()
      .filter(pool => pool.balance)
      .map(pool => ({
        label: pool.label,
        balance: pool.isCash ? formatCurrency(pool.balance!.balance) : `${pool.balance!.balance.toLocaleString('en-US')} points`,
        value: pool.value
      }));
    const loyalty = this.rewardsService
      .loyaltyAccounts()
      .filter(a => !a.duplicatesCardPool)
      .map(a => ({ label: a.account.name, balance: `${a.account.balance.toLocaleString('en-US')} points`, value: a.value }));
    return [...pools, ...loyalty].sort((a, b) => b.value - a.value);
  });

  readonly shown = computed(() => this.rows().slice(0, SHOWN));
  readonly hiddenCount = computed(() => this.rows().length - this.shown().length);
}
