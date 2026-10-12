import type { RewardsProgram } from './card.model';

/** A balance the user entered for one rewards pool */
export interface RewardsBalance {
  /** Points, miles, or dollars of cash back */
  balance: number;
  /** When the balance was last updated (ISO date) */
  asOf: string;
}

export type EarnedSource = 'spend' | 'sub' | 'referral' | 'retention' | 'other';

/** Rewards earned on one card. Sign-up bonuses aren't stored here; they come from the card's signUpBonus. */
export interface EarnedEntry {
  id: string;
  userCardId: string;
  /** ISO date */
  date: string;
  /** Points, miles, or dollars of cash back, in the card's rewards currency */
  amount: number;
  source: EarnedSource;
  note?: string;
}

/**
 * Points cashed out for something worth `cashValue` dollars. Comes from a card points
 * program (`program`) or a hand-entered loyalty account (`loyaltyAccountId`).
 */
export interface Redemption {
  id: string;
  program?: RewardsProgram;
  /** Set for airline miles; logging the redemption took `points` off that account's balance */
  loyaltyAccountId?: string;
  /** ISO date */
  date: string;
  points: number;
  cashValue: number;
  description: string;
}

/** A loyalty program balance entered by hand, e.g. airline miles not tied to a card in the wallet */
export interface LoyaltyAccount {
  id: string;
  /** Program name as the user wants it shown, e.g. 'American Airlines' or 'Avios' */
  name: string;
  /** Set when the name matches a known program, so its default valuation can be offered */
  program?: RewardsProgram;
  balance: number;
  /** Total ever earned in the program, including what has been spent */
  allTimeEarned?: number;
  /** Cents per point used to value the balance */
  cpp: number;
  /** e.g. 'Transfers to American Airlines' or 'Valued on flight spend' */
  note?: string;
  /** When the balance was last updated (ISO date) */
  asOf: string;
}

/** Miles added to a loyalty account (flights, promos, transfers in) */
export interface LoyaltyEarnedEntry {
  id: string;
  accountId: string;
  /** ISO date */
  date: string;
  amount: number;
  note?: string;
}

export interface RewardsState {
  /**
   * Keyed by pool: 'program:<RewardsProgram>' for transferable points,
   * 'card:<UserCard.id>' for a card's own cash back
   */
  balances: Record<string, RewardsBalance>;
  earned: EarnedEntry[];
  redemptions: Redemption[];
  loyaltyAccounts: LoyaltyAccount[];
  loyaltyEarned: LoyaltyEarnedEntry[];
}

export function createDefaultRewardsState(): RewardsState {
  return { balances: {}, earned: [], redemptions: [], loyaltyAccounts: [], loyaltyEarned: [] };
}
