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

/** Points cashed out for something worth `cashValue` dollars */
export interface Redemption {
  id: string;
  program: RewardsProgram;
  /** ISO date */
  date: string;
  points: number;
  cashValue: number;
  description: string;
}

export interface RewardsState {
  /**
   * Keyed by pool: 'program:<RewardsProgram>' for transferable points,
   * 'card:<UserCard.id>' for a card's own cash back
   */
  balances: Record<string, RewardsBalance>;
  earned: EarnedEntry[];
  redemptions: Redemption[];
}

export function createDefaultRewardsState(): RewardsState {
  return { balances: {}, earned: [], redemptions: [] };
}
