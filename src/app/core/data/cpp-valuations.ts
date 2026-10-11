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
  'BILT': 2.2,
  'American Airlines AAdvantage': 1.65,
  // Cash back or fixed-value points only; no travel partners
  'U.S. Bank Rewards': 1.0,
  'Amex Cash Back': 1.0,
  'Bank of America Rewards': 1.0,
  'Discover Cashback Bonus': 1.0,
  'Delta SkyMiles': 1.2,
  'Hilton Honors': 0.5,
  'Marriott Bonvoy': 0.8,
  // Store credit at one retailer
  'Store Rewards': 1.0,
  // Alaska Airlines and Hawaiian Airlines points
  'Atmos Rewards': 1.45,
  // Air France KLM miles
  'Flying Blue': 1.3,
  'Emirates Skywards': 1.2,
  'Wyndham Rewards': 1.1,
  'JetBlue TrueBlue': 1.3,
  // Lufthansa Group miles
  'Miles & More': 1.2,
  'Frontier Miles': 1.1,
  // 500 points = $1
  'Gap Inc. Rewards': 0.2,
  'Barclays Cash Back': 1.0
};

/**
 * Get the default CPP valuation for a rewards program
 */
export function getDefaultCppValuation(program: RewardsProgram): number {
  return DEFAULT_CPP_VALUATIONS[program] ?? 1.0;
}


