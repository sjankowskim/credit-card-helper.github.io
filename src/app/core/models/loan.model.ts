export type LoanType = 'student-federal' | 'student-private' | 'auto' | 'mortgage' | 'personal' | 'other';

export const LOAN_TYPE_LABELS: Record<LoanType, string> = {
  'student-federal': 'Federal student loan',
  'student-private': 'Private student loan',
  auto: 'Auto loan',
  mortgage: 'Mortgage',
  personal: 'Personal loan',
  other: 'Other'
};

export interface LoanPayment {
  id: string;
  /** ISO date */
  date: string;
  amount: number;
  /** Part of the payment that went to principal; this much came off the balance */
  principal: number;
  note?: string;
}

/** A loan entered by the user; balances are kept by hand and by logged payments */
export interface Loan {
  id: string;
  /** e.g. 'Grad PLUS' or 'Honda Civic' */
  name: string;
  /** Lender or servicer, e.g. 'Nelnet' */
  lender?: string;
  type: LoanType;
  /** Current principal balance */
  balance: number;
  /** ISO date the balance was last set or changed */
  balanceAsOf: string;
  /** Annual interest rate, e.g. 6.54 */
  apr: number;
  /** Monthly payment */
  monthlyPayment: number;
  /** Amount originally borrowed, for showing progress */
  originalAmount?: number;
  /** ISO date the loan started */
  startDate?: string;
  payments: LoanPayment[];
}
