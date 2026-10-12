import { Injectable, computed, inject } from '@angular/core';
import { StorageService } from './storage.service';
import type { Loan, LoanPayment } from '../models/loan.model';
import { toIsoDate, today } from '../utils/date.utils';

/** Loans the user tracks by hand; logged payments take their principal off the balance */
@Injectable({
  providedIn: 'root'
})
export class LoansService {
  private readonly storage = inject(StorageService);

  readonly loans = computed(() => this.storage.state().loans ?? []);

  add(loan: Omit<Loan, 'id' | 'payments' | 'balanceAsOf'>): void {
    this.updateAll(loans => [...loans, { ...loan, id: crypto.randomUUID(), balanceAsOf: toIsoDate(today()), payments: [] }]);
  }

  /** Setting the balance stamps today as its as-of date */
  update(id: string, changes: Partial<Omit<Loan, 'id' | 'payments' | 'balanceAsOf'>>): void {
    this.updateAll(loans =>
      loans.map(l => (l.id === id ? { ...l, ...changes, ...('balance' in changes ? { balanceAsOf: toIsoDate(today()) } : {}) } : l))
    );
  }

  remove(id: string): void {
    this.updateAll(loans => loans.filter(l => l.id !== id));
  }

  addPayment(loanId: string, payment: Omit<LoanPayment, 'id'>): void {
    this.updateAll(loans =>
      loans.map(l =>
        l.id === loanId
          ? {
              ...l,
              balance: Math.max(0, roundCents(l.balance - payment.principal)),
              balanceAsOf: toIsoDate(today()),
              payments: [...l.payments, { ...payment, id: crypto.randomUUID() }]
            }
          : l
      )
    );
  }

  /** Deletes a payment and puts its principal back on the balance */
  removePayment(loanId: string, paymentId: string): void {
    this.updateAll(loans =>
      loans.map(l => {
        const payment = l.id === loanId ? l.payments.find(p => p.id === paymentId) : undefined;
        return payment
          ? { ...l, balance: roundCents(l.balance + payment.principal), payments: l.payments.filter(p => p.id !== paymentId) }
          : l;
      })
    );
  }

  private updateAll(recipe: (loans: Loan[]) => Loan[]): void {
    this.storage.update('loans', loans => recipe(loans ?? []));
  }
}

function roundCents(value: number): number {
  return Math.round(value * 100) / 100;
}
