/**
 * A checking or savings account opening bonus. Entered freely by the user;
 * nothing here ties to the card catalog or the wallet.
 */
export interface BankBonus {
  id: string;
  /** e.g. 'Chase' */
  bank: string;
  /** e.g. 'Total Checking' */
  accountName: string;
  /** Bonus in dollars */
  amount: number;
  /** What earns the bonus, e.g. '2 direct deposits of $500+' */
  requirement: string;
  /** The number progress counts toward: deposits, transactions, or a dollar balance */
  goal: number;
  progress: number;
  /** ISO date progress was last changed */
  progressUpdated?: string;
  /** ISO date the account was opened; starts the deadline */
  openedDate?: string;
  /** Days from opening to meet the requirement */
  windowDays: number;
  /** ISO date the account can be closed without the bank taking the bonus back */
  keepOpenUntil?: string;
  /** ISO date the bonus posted */
  earnedDate?: string;
}
