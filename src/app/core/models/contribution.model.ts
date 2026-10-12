import type { CatchUp, ContributionType, HsaCoverage } from '../data/contribution-limits';

export interface ContributionEntry {
  id: string;
  /** ISO date */
  date: string;
  amount: number;
  /** e.g. 'Roth' or 'Paycheck 10/15' */
  note?: string;
}

/** Contributions to one kind of tax-advantaged account for one tax year */
export interface ContributionTracker {
  id: string;
  year: number;
  type: ContributionType;
  /** Label shown instead of the type's, e.g. 'Fidelity Roth IRA'; required for custom types */
  name?: string;
  /** Yearly maximum in dollars; prefilled from the IRS limit, editable */
  limit: number;
  catchUp: CatchUp;
  /** HSA only */
  coverage?: HsaCoverage;
  entries: ContributionEntry[];
}
