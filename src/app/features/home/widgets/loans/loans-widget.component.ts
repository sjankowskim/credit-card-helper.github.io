import { Component, computed, inject } from '@angular/core';
import { LoansService } from '../../../../core/services/loans.service';
import { formatCurrency } from '../../../../core/utils/card-display.utils';

/** Loan balances, payments, and average APR */
@Component({
  selector: 'app-loans-widget',
  templateUrl: './loans-widget.component.html',
  styleUrl: '../widget.scss'
})
export class LoansWidgetComponent {
  private readonly loansService = inject(LoansService);

  readonly formatWhole = (value: number): string => formatCurrency(Math.round(value));

  readonly stats = computed(() => {
    const open = this.loansService.loans().filter(l => l.balance > 0);
    const balance = open.reduce((sum, l) => sum + l.balance, 0);
    return {
      count: open.length,
      balance,
      monthly: open.reduce((sum, l) => sum + l.monthlyPayment, 0),
      /** Balance-weighted APR */
      apr: balance > 0 ? open.reduce((sum, l) => sum + l.apr * l.balance, 0) / balance : 0
    };
  });
}
