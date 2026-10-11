import { Component, inject } from '@angular/core';
import { RewardsService, type RewardsPool } from '../../../../core/services/rewards.service';
import { InlineEditFieldComponent } from '../../../../shared/inline-edit-field/inline-edit-field.component';
import { formatCurrency } from '../../../../core/utils/card-display.utils';
import { formatDate } from '../../../../core/utils/date.utils';

@Component({
  selector: 'app-rewards-balances',
  imports: [InlineEditFieldComponent],
  templateUrl: './balances.component.html',
  styleUrl: './balances.component.scss'
})
export class BalancesComponent {
  private readonly rewardsService = inject(RewardsService);

  readonly pools = this.rewardsService.pools;
  readonly formatCurrency = formatCurrency;
  readonly formatDate = formatDate;

  setBalance(pool: RewardsPool, value: string | number | undefined): void {
    this.rewardsService.setBalance(pool.key, value === undefined ? undefined : Number(value));
  }
}
