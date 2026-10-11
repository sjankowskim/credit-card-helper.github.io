/**
 * Default CPP (Cents Per Point) valuations for rewards programs
 * Based on TPG (The Points Guy) valuations for travel redemptions
 * These represent the effective multiplier when points are redeemed for travel
 */
import type { RewardsProgram } from '../models/card.model';

export const DEFAULT_CPP_VALUATIONS: Record<RewardsProgram, number> = {
  'Capital One Rewards': 1.85,
  'Chase Ultimate Rewards': 2.05,
  'Amex Membership Rewards': 2.0,
  'Citi ThankYou': 1.9,
  'Wells Fargo Rewards': 1.75,
  'BILT': 2.2
};

/**
 * Get the default CPP valuation for a rewards program
 */
export function getDefaultCppValuation(program: RewardsProgram): number {
  return DEFAULT_CPP_VALUATIONS[program] ?? 1.0;
}


