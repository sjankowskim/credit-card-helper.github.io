/**
 * IRS contribution limits for tax-advantaged accounts. Limits change every year; add
 * a year here once the IRS announces it (usually October/November). Trackers store
 * their own limit, so a missing year just means the user types it in.
 */

export type ContributionType = '401k' | '457b' | 'ira' | 'hsa' | 'health-fsa' | 'dependent-care-fsa' | 'custom';

/** Extra amount allowed by age; which apply depends on the account type */
export type CatchUp = 'none' | 'age-50' | 'age-60-63' | 'age-55';

export type HsaCoverage = 'self' | 'family';

export interface ContributionTypeInfo {
  id: ContributionType;
  label: string;
  /** Shown under the tracker, e.g. which accounts share the limit */
  note?: string;
  /** Contributions for a tax year can be made until April 15 of the next year */
  extendsToTaxDay: boolean;
  catchUps: CatchUp[];
  hasCoverage: boolean;
}

export const CONTRIBUTION_TYPES: readonly ContributionTypeInfo[] = [
  {
    id: '401k',
    label: '401(k) / 403(b) / TSP',
    note: 'Employee deferrals, pre-tax and Roth combined, across all of these plans. Employer match does not count.',
    extendsToTaxDay: false,
    catchUps: ['none', 'age-50', 'age-60-63'],
    hasCoverage: false
  },
  {
    id: '457b',
    label: '457(b)',
    note: 'Has its own limit, separate from 401(k) and 403(b).',
    extendsToTaxDay: false,
    catchUps: ['none', 'age-50', 'age-60-63'],
    hasCoverage: false
  },
  {
    id: 'ira',
    label: 'IRA (Roth + Traditional)',
    note: 'Roth and Traditional IRAs share one limit. Contributions for the year are allowed until April 15.',
    extendsToTaxDay: true,
    catchUps: ['none', 'age-50'],
    hasCoverage: false
  },
  {
    id: 'hsa',
    label: 'HSA',
    note: 'Employer contributions count toward the limit. Contributions for the year are allowed until April 15.',
    extendsToTaxDay: true,
    catchUps: ['none', 'age-55'],
    hasCoverage: true
  },
  { id: 'health-fsa', label: 'Health FSA', extendsToTaxDay: false, catchUps: ['none'], hasCoverage: false },
  {
    id: 'dependent-care-fsa',
    label: 'Dependent care FSA',
    note: 'Per household ($3,750 each if married filing separately).',
    extendsToTaxDay: false,
    catchUps: ['none'],
    hasCoverage: false
  },
  { id: 'custom', label: 'Custom', extendsToTaxDay: false, catchUps: ['none'], hasCoverage: false }
];

export const CATCH_UP_LABELS: Record<CatchUp, string> = {
  none: 'None',
  'age-50': 'Age 50+',
  'age-60-63': 'Age 60-63',
  'age-55': 'Age 55+'
};

interface YearLimits {
  '401k': number;
  '457b': number;
  ira: number;
  hsaSelf: number;
  hsaFamily: number;
  healthFsa: number;
  dependentCareFsa: number;
  catchUp401k50: number;
  /** Ages 60-63 super catch-up, starting in 2025; earlier years use the age-50 amount */
  catchUp401k60to63?: number;
  catchUpIra50: number;
  catchUpHsa55: number;
}

const LIMITS: Record<number, YearLimits> = {
  2015: {
    '401k': 18000,
    '457b': 18000,
    ira: 5500,
    hsaSelf: 3350,
    hsaFamily: 6650,
    healthFsa: 2550,
    dependentCareFsa: 5000,
    catchUp401k50: 6000,
    catchUpIra50: 1000,
    catchUpHsa55: 1000
  },
  2016: {
    '401k': 18000,
    '457b': 18000,
    ira: 5500,
    hsaSelf: 3350,
    hsaFamily: 6750,
    healthFsa: 2550,
    dependentCareFsa: 5000,
    catchUp401k50: 6000,
    catchUpIra50: 1000,
    catchUpHsa55: 1000
  },
  2017: {
    '401k': 18000,
    '457b': 18000,
    ira: 5500,
    hsaSelf: 3400,
    hsaFamily: 6750,
    healthFsa: 2600,
    dependentCareFsa: 5000,
    catchUp401k50: 6000,
    catchUpIra50: 1000,
    catchUpHsa55: 1000
  },
  2018: {
    '401k': 18500,
    '457b': 18500,
    ira: 5500,
    hsaSelf: 3450,
    hsaFamily: 6900,
    healthFsa: 2650,
    dependentCareFsa: 5000,
    catchUp401k50: 6000,
    catchUpIra50: 1000,
    catchUpHsa55: 1000
  },
  2019: {
    '401k': 19000,
    '457b': 19000,
    ira: 6000,
    hsaSelf: 3500,
    hsaFamily: 7000,
    healthFsa: 2700,
    dependentCareFsa: 5000,
    catchUp401k50: 6000,
    catchUpIra50: 1000,
    catchUpHsa55: 1000
  },
  2020: {
    '401k': 19500,
    '457b': 19500,
    ira: 6000,
    hsaSelf: 3550,
    hsaFamily: 7100,
    healthFsa: 2750,
    dependentCareFsa: 5000,
    catchUp401k50: 6500,
    catchUpIra50: 1000,
    catchUpHsa55: 1000
  },
  // Dependent care FSA was temporarily raised for 2021
  2021: {
    '401k': 19500,
    '457b': 19500,
    ira: 6000,
    hsaSelf: 3600,
    hsaFamily: 7200,
    healthFsa: 2750,
    dependentCareFsa: 10500,
    catchUp401k50: 6500,
    catchUpIra50: 1000,
    catchUpHsa55: 1000
  },
  2022: {
    '401k': 20500,
    '457b': 20500,
    ira: 6000,
    hsaSelf: 3650,
    hsaFamily: 7300,
    healthFsa: 2850,
    dependentCareFsa: 5000,
    catchUp401k50: 6500,
    catchUpIra50: 1000,
    catchUpHsa55: 1000
  },
  2023: {
    '401k': 22500,
    '457b': 22500,
    ira: 6500,
    hsaSelf: 3850,
    hsaFamily: 7750,
    healthFsa: 3050,
    dependentCareFsa: 5000,
    catchUp401k50: 7500,
    catchUpIra50: 1000,
    catchUpHsa55: 1000
  },
  2024: {
    '401k': 23000,
    '457b': 23000,
    ira: 7000,
    hsaSelf: 4150,
    hsaFamily: 8300,
    healthFsa: 3200,
    dependentCareFsa: 5000,
    catchUp401k50: 7500,
    catchUpIra50: 1000,
    catchUpHsa55: 1000
  },
  2025: {
    '401k': 23500,
    '457b': 23500,
    ira: 7000,
    hsaSelf: 4300,
    hsaFamily: 8550,
    healthFsa: 3300,
    dependentCareFsa: 5000,
    catchUp401k50: 7500,
    catchUp401k60to63: 11250,
    catchUpIra50: 1000,
    catchUpHsa55: 1000
  },
  2026: {
    '401k': 24500,
    '457b': 24500,
    ira: 7500,
    hsaSelf: 4400,
    hsaFamily: 8750,
    healthFsa: 3400,
    dependentCareFsa: 7500,
    catchUp401k50: 8000,
    catchUp401k60to63: 11250,
    catchUpIra50: 1100,
    catchUpHsa55: 1000
  }
};

/** Years with built-in limits */
export const LIMIT_YEARS = Object.keys(LIMITS).map(Number);

export function getContributionTypeInfo(type: ContributionType): ContributionTypeInfo {
  return CONTRIBUTION_TYPES.find(t => t.id === type) ?? CONTRIBUTION_TYPES[CONTRIBUTION_TYPES.length - 1];
}

/** The IRS limit for a type, year, and options; undefined for custom types and years not on file */
export function getDefaultLimit(type: ContributionType, year: number, catchUp: CatchUp, coverage: HsaCoverage): number | undefined {
  const l = LIMITS[year];
  if (!l) return undefined;
  switch (type) {
    case '401k':
    case '457b':
      if (catchUp === 'age-60-63') return l[type] + (l.catchUp401k60to63 ?? l.catchUp401k50);
      return l[type] + (catchUp === 'age-50' ? l.catchUp401k50 : 0);
    case 'ira':
      return l.ira + (catchUp === 'age-50' ? l.catchUpIra50 : 0);
    case 'hsa':
      return (coverage === 'family' ? l.hsaFamily : l.hsaSelf) + (catchUp === 'age-55' ? l.catchUpHsa55 : 0);
    case 'health-fsa':
      return l.healthFsa;
    case 'dependent-care-fsa':
      return l.dependentCareFsa;
    default:
      return undefined;
  }
}
