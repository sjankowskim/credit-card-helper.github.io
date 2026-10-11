import {
  addMonths,
  daysBetween,
  formatDate,
  isWithin,
  parseLocalDate,
  toIsoDate
} from './date.utils';

describe('date utils', () => {
  describe('parseLocalDate', () => {
    it('parses ISO dates as local midnight, not UTC', () => {
      const date = parseLocalDate('2024-05-01')!;
      expect(date.getFullYear()).toBe(2024);
      expect(date.getMonth()).toBe(4);
      expect(date.getDate()).toBe(1);
      expect(date.getHours()).toBe(0);
    });

    it('rejects missing, malformed, and overflowed dates', () => {
      expect(parseLocalDate(undefined)).toBeNull();
      expect(parseLocalDate('')).toBeNull();
      expect(parseLocalDate('05/01/2024')).toBeNull();
      expect(parseLocalDate('2024-02-31')).toBeNull();
    });

    it('round-trips through toIsoDate', () => {
      expect(toIsoDate(parseLocalDate('2025-12-31')!)).toBe('2025-12-31');
    });
  });

  describe('addMonths', () => {
    it('clamps to the end of shorter months', () => {
      expect(toIsoDate(addMonths(parseLocalDate('2024-01-31')!, 1))).toBe('2024-02-29');
      expect(toIsoDate(addMonths(parseLocalDate('2023-01-31')!, 1))).toBe('2023-02-28');
    });

    it('handles negative months across years', () => {
      expect(toIsoDate(addMonths(parseLocalDate('2026-03-15')!, -24))).toBe('2024-03-15');
    });
  });

  describe('daysBetween', () => {
    it('counts whole days, including across DST changes', () => {
      expect(daysBetween(parseLocalDate('2026-03-01')!, parseLocalDate('2026-03-31')!)).toBe(30);
      expect(daysBetween(parseLocalDate('2026-03-31')!, parseLocalDate('2026-03-01')!)).toBe(-30);
    });
  });

  describe('isWithin', () => {
    const reference = parseLocalDate('2026-10-11')!;

    it('includes the boundary day', () => {
      expect(isWithin(parseLocalDate('2026-09-11')!, 30, 'days', reference)).toBe(true);
      expect(isWithin(parseLocalDate('2026-09-10')!, 30, 'days', reference)).toBe(false);
    });

    it('supports months (24 months for 5/24)', () => {
      expect(isWithin(parseLocalDate('2024-10-11')!, 24, 'months', reference)).toBe(true);
      expect(isWithin(parseLocalDate('2024-10-10')!, 24, 'months', reference)).toBe(false);
    });
  });

  describe('formatDate', () => {
    it('formats for display and tolerates missing values', () => {
      expect(formatDate('2025-01-05')).toBe('Jan 5, 2025');
      expect(formatDate(undefined)).toBe('');
    });
  });
});
