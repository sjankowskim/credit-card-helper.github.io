import type { Loan } from '../models/loan.model';
import { addMonths, today } from './date.utils';

/** Longest projection, in months; anything longer is treated as never paid off */
const MAX_MONTHS = 600;

/** A balance under a dollar counts as paid off, so payment rounding doesn't add a final cents-only month */
const PAID_OFF = 1;

export interface LoanPayoff {
  /** Payments until the loan is paid off; null when the payment doesn't cover the interest */
  months: number | null;
  payoffDate: Date | null;
  /** Interest left to pay at the current payment */
  interest: number | null;
}

/** One month of interest on a balance */
export function monthlyInterest(balance: number, apr: number): number {
  return (balance * apr) / 100 / 12;
}

/** Payoff of one loan at its monthly payment, compounding monthly */
export function getLoanPayoff(loan: Pick<Loan, 'balance' | 'apr' | 'monthlyPayment'>, from: Date = today()): LoanPayoff {
  let balance = loan.balance;
  let interest = 0;
  let months = 0;
  while (balance > PAID_OFF) {
    const charge = monthlyInterest(balance, loan.apr);
    if (loan.monthlyPayment <= charge || months >= MAX_MONTHS) return { months: null, payoffDate: null, interest: null };
    interest += charge;
    balance = balance + charge - Math.min(loan.monthlyPayment, balance + charge);
    months++;
  }
  return { months, payoffDate: addMonths(from, months), interest };
}

export type PayoffStrategy = 'avalanche' | 'snowball';

export interface PortfolioPayoff {
  /** Months until every loan is paid off; null when some loan never gets paid off */
  months: number | null;
  payoffDate: Date | null;
  interest: number | null;
}

/**
 * Pays every loan's monthly payment plus `extra` each month. The extra, and each paid-off
 * loan's payment, goes to the highest-APR loan (avalanche) or the smallest balance (snowball).
 */
export function getPortfolioPayoff(
  loans: Pick<Loan, 'balance' | 'apr' | 'monthlyPayment'>[],
  extra: number,
  strategy: PayoffStrategy,
  from: Date = today()
): PortfolioPayoff {
  const state = loans.filter(l => l.balance > 0).map(l => ({ ...l }));
  const budget = state.reduce((sum, l) => sum + l.monthlyPayment, 0) + Math.max(0, extra);
  let interest = 0;
  let months = 0;

  while (state.some(l => l.balance > PAID_OFF)) {
    if (months >= MAX_MONTHS) return { months: null, payoffDate: null, interest: null };
    const totalBefore = state.reduce((sum, l) => sum + l.balance, 0);
    let available = budget;
    // Interest accrues, then each open loan gets its regular payment
    for (const loan of state) {
      if (loan.balance <= PAID_OFF) continue;
      const charge = monthlyInterest(loan.balance, loan.apr);
      interest += charge;
      loan.balance += charge;
      const payment = Math.min(loan.monthlyPayment, loan.balance);
      loan.balance -= payment;
      available -= payment;
    }
    // Whatever is left goes to the target loans in strategy order
    const order = state
      .filter(l => l.balance > PAID_OFF)
      .sort((a, b) => (strategy === 'avalanche' ? b.apr - a.apr : a.balance - b.balance));
    for (const loan of order) {
      if (available <= 0) break;
      const payment = Math.min(available, loan.balance);
      loan.balance -= payment;
      available -= payment;
    }
    if (state.reduce((sum, l) => sum + l.balance, 0) >= totalBefore - PAID_OFF) {
      // The total didn't go down: payments don't cover the interest
      return { months: null, payoffDate: null, interest: null };
    }
    months++;
  }
  return { months, payoffDate: addMonths(from, months), interest };
}
