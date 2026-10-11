/**
 * Default CPP (Cents Per Point) valuations for rewards programs
 * Based on TPG (The Points Guy) valuations for travel redemptions
 * These represent the effective multiplier when points are redeemed for travel
 */
import { RewardsProgram } from '../models/card.model';

export const DEFAULT_CPP_VALUATIONS: Record<RewardsProgram, number> = {
  [RewardsProgram.CAPITAL_ONE_REWARDS]: 1.85,
  [RewardsProgram.CHASE_ULTIMATE_REWARDS]: 2.05,
  [RewardsProgram.AMEX_MEMBERSHIP_REWARDS]: 2.0,
  [RewardsProgram.CITI_THANKYOU]: 1.9,
  [RewardsProgram.WELLS_FARGO_REWARDS]: 1.75,
  [RewardsProgram.BILT]: 2.2
};

/**
 * Get the default CPP valuation for a rewards program
 */
export function getDefaultCppValuation(program: RewardsProgram): number {
  return DEFAULT_CPP_VALUATIONS[program] ?? 1.0;
}


