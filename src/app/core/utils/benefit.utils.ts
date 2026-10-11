import type { Benefit } from '../models/card.model';
import { addDays, addMonths, daysBetween, parseLocalDate, toIsoDate, today } from './date.utils';

const PERIOD_MONTHS: Record<Exclude<Benefit['period'], 'ONE_TIME'>, number> = {
  MONTHLY: 1,
  QUARTERLY: 3,
  SEMIANNUAL: 6,
  ANNUAL: 12
};

export interface BenefitPeriod {
  /** Stable key for storing usage in this period (the start date, or 'once') */
  key: string;
  start: Date | null;
  /** Last day of the period; null for a one-time credit with no expiry */
  end: Date | null;
  /** Days left including today; null without an end */
  daysLeft: number | null;
  /** True when a cardmember-year credit had to fall back to calendar periods (no open date) */
  approximate: boolean;
}

/**
 * The period of `benefit` that contains `reference`.
 * Calendar periods start in January (Q1 = Jan–Mar); cardmember-year periods start on the
 * account open date and repeat every period length after it.
 */
export function getBenefitPeriod(
  benefit: Benefit,
  accountStartDate: string | undefined,
  reference: Date = today()
): BenefitPeriod {
  if (benefit.period === 'ONE_TIME') {
    const end = parseLocalDate(benefit.expiresOn);
    return { key: 'once', start: null, end, daysLeft: end ? daysBetween(reference, end) + 1 : null, approximate: false };
  }

  const months = PERIOD_MONTHS[benefit.period];
  const opened = parseLocalDate(accountStartDate);
  const useAnniversary = benefit.resetBasis === 'CARDMEMBER_YEAR' && opened !== null && opened <= reference;

  let start: Date;
  let nextStart: Date;
  if (useAnniversary) {
    const elapsed =
      (reference.getFullYear() - opened.getFullYear()) * 12 + reference.getMonth() - opened.getMonth();
    let index = Math.floor(elapsed / months);
    // The month count overshoots when the anniversary day hasn't come yet this month
    if (addMonths(opened, index * months) > reference) index--;
    // Both ends come from the open date so month-end clamping (Jan 31 -> Feb 28) leaves no gaps
    start = addMonths(opened, index * months);
    nextStart = addMonths(opened, (index + 1) * months);
  } else {
    start = new Date(reference.getFullYear(), Math.floor(reference.getMonth() / months) * months, 1);
    nextStart = addMonths(start, months);
  }

  const end = addDays(nextStart, -1);
  return {
    key: toIsoDate(start),
    start,
    end,
    daysLeft: daysBetween(reference, end) + 1,
    approximate: benefit.resetBasis === 'CARDMEMBER_YEAR' && !useAnniversary
  };
}

/** How many times the credit is available in a year, for annualized totals */
export function getPeriodsPerYear(benefit: Benefit): number {
  return benefit.period === 'ONE_TIME' ? 1 : 12 / PERIOD_MONTHS[benefit.period];
}

const PERIOD_LABELS: Record<Benefit['period'], string> = {
  MONTHLY: 'month',
  QUARTERLY: 'quarter',
  SEMIANNUAL: 'half-year',
  ANNUAL: 'year',
  ONE_TIME: 'one time'
};

export function getPeriodLabel(benefit: Benefit): string {
  if (benefit.period === 'ONE_TIME') return 'one time';
  const label = PERIOD_LABELS[benefit.period];
  return benefit.resetBasis === 'CARDMEMBER_YEAR' ? `${label} (card anniversary)` : label;
}
