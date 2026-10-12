import type { Card } from '../../../models/card.model';

// Welcome offer is a first-year Cashback Match (all cash back doubled), not a fixed bonus.
export const DISCOVER_IT_STUDENT_CHROME: Card = {
  id: 'discover-it-student-chrome',
  name: 'Discover it Student Chrome',
  issuer: 'Discover',
  rewardsProgram: 'Discover Cashback Bonus',
  rewardsCurrency: 'Cashback',
  network: 'DISCOVER',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'rebuilding',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  imageOf: 'discover-it-chrome',
  rewardTiers: [
    {
      id: 'discover-it-student-chrome-gas-dining',
      name: 'Gas Stations & Restaurants',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['gas-stations', 'dining'],
      spendingCap: { amount: 1000, period: 'QUARTERLY' },
      note: 'The $1,000 cap is combined across both categories each quarter.'
    }
  ]
};
