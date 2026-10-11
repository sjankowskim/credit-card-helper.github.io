/**
 * Date helpers for calendar dates stored as ISO strings ('YYYY-MM-DD').
 *
 * `new Date('2024-05-01')` parses as UTC midnight, which is the previous day
 * in US timezones. These helpers always work in local time at midnight.
 */

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

/** Parses 'YYYY-MM-DD' as local midnight. Returns null for anything else. */
export function parseLocalDate(iso: string | null | undefined): Date | null {
  const match = iso ? ISO_DATE.exec(iso) : null;
  if (!match) return null;
  const [, year, month, day] = match.map(Number);
  const date = new Date(year, month - 1, day);
  // Reject overflowed dates like 2024-02-31
  return date.getMonth() === month - 1 ? date : null;
}

/** Formats a date as 'YYYY-MM-DD' in local time. */
export function toIsoDate(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** Today at local midnight. */
export function today(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function addDays(date: Date, days: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

/** Adds calendar months, clamping to the last day of the month (Jan 31 + 1 month = Feb 28/29). */
export function addMonths(date: Date, months: number): Date {
  const target = new Date(date.getFullYear(), date.getMonth() + months, 1);
  const lastDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
  target.setDate(Math.min(date.getDate(), lastDay));
  return target;
}

/** Whole days from `from` to `to` (negative when `to` is earlier). DST-safe. */
export function daysBetween(from: Date, to: Date): number {
  const utc = (d: Date) => Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
  return Math.round((utc(to) - utc(from)) / 86_400_000);
}

/**
 * Whether `date` falls within the last `amount` days or months of `reference`, inclusive.
 * A date exactly `amount` units ago counts as within; future dates count too.
 */
export function isWithin(
  date: Date,
  amount: number,
  unit: 'days' | 'months',
  reference: Date = today()
): boolean {
  const cutoff = unit === 'days' ? addDays(reference, -amount) : addMonths(reference, -amount);
  return date >= cutoff;
}

/** Formats an ISO date for display, e.g. 'Jan 5, 2025'. Returns '' for missing or invalid input. */
export function formatDate(iso: string | null | undefined): string {
  const date = parseLocalDate(iso);
  return date
    ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : '';
}
