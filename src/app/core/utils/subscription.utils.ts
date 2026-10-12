import type { CadenceUnit, Subscription } from '../models/subscription.model';
import { addDays, addMonths, parseLocalDate, today } from './date.utils';

const PER_YEAR: Record<CadenceUnit, number> = { day: 365, week: 52, month: 12, year: 1 };

/** Yearly cost of a subscription at its cadence */
export function getAnnualCost(sub: Pick<Subscription, 'cost' | 'cadenceValue' | 'cadenceUnit'>): number {
  return sub.cadenceValue > 0 ? (sub.cost * PER_YEAR[sub.cadenceUnit]) / sub.cadenceValue : 0;
}

/** Adds `count` cadence periods to a date */
function step(date: Date, sub: Pick<Subscription, 'cadenceValue' | 'cadenceUnit'>, count: number): Date {
  const n = sub.cadenceValue * count;
  switch (sub.cadenceUnit) {
    case 'day':
      return addDays(date, n);
    case 'week':
      return addDays(date, n * 7);
    case 'month':
      return addMonths(date, n);
    case 'year':
      return addMonths(date, n * 12);
  }
}

/** Next charge on or after `reference`, rolled forward from the known payment date */
export function getNextPayment(
  sub: Pick<Subscription, 'paymentDate' | 'cadenceValue' | 'cadenceUnit'>,
  reference: Date = today()
): Date | null {
  const start = parseLocalDate(sub.paymentDate);
  if (!start || sub.cadenceValue <= 0) return null;
  // Count from the original date each time so month-end dates don't drift (Jan 31 -> Feb 28 -> Mar 31)
  let count = 0;
  let next = start;
  while (next < reference && count < 10000) {
    count++;
    next = step(start, sub, count);
  }
  return next;
}

export function describeCadence(sub: Pick<Subscription, 'cadenceValue' | 'cadenceUnit'>): string {
  const names: Record<CadenceUnit, [string, string]> = {
    day: ['Daily', 'days'],
    week: ['Weekly', 'weeks'],
    month: ['Monthly', 'months'],
    year: ['Yearly', 'years']
  };
  const [single, plural] = names[sub.cadenceUnit];
  return sub.cadenceValue === 1 ? single : `Every ${sub.cadenceValue} ${plural}`;
}
