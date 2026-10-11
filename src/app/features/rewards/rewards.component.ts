import { Component, computed, inject, signal } from '@angular/core';
import { RewardsService } from '../../core/services/rewards.service';
import { formatCurrency } from '../../core/utils/card-display.utils';
import { parseLocalDate, today } from '../../core/utils/date.utils';
import { BalancesComponent } from './components/balances/balances.component';
import { EarnedComponent } from './components/earned/earned.component';
import { RedemptionsComponent } from './components/redemptions/redemptions.component';

type RewardsTab = 'balances' | 'earned' | 'redemptions';

@Component({
  selector: 'app-rewards',
  imports: [BalancesComponent, EarnedComponent, RedemptionsComponent],
  templateUrl: './rewards.component.html',
  styleUrl: './rewards.component.scss'
})
export class RewardsComponent {
  private readonly rewardsService = inject(RewardsService);

  readonly tabs: { id: RewardsTab; label: string }[] = [
    { id: 'balances', label: 'Balances' },
    { id: 'earned', label: 'Earned & card value' },
    { id: 'redemptions', label: 'Redemptions' }
  ];
  readonly tab = signal<RewardsTab>('balances');

  readonly year = today().getFullYear();

  readonly totalBalance = this.rewardsService.totalBalanceValue;

  readonly earnedThisYear = computed(() =>
    this.rewardsService
      .earnedRows()
      .filter(row => parseLocalDate(row.date)?.getFullYear() === this.year)
      .reduce((sum, row) => sum + row.value, 0)
  );

  readonly netThisYear = computed(() =>
    this.rewardsService.getCardValues(this.year).reduce((sum, c) => sum + c.net, 0)
  );

  formatWhole(amount: number): string {
    return formatCurrency(Math.round(amount));
  }
}
