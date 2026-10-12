import type { Card } from '../../../models/card.model';

// Welcome offer is a first-year Cashback Match (all cash back doubled), not a fixed bonus.
export const NHL_DISCOVER_IT: Card = {
  id: 'discover-nhl',
  name: 'NHL Discover it',
  issuer: 'Discover',
  rewardsProgram: 'Discover Cashback Bonus',
  rewardsCurrency: 'Cashback',
  network: 'DISCOVER',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'good',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: 'Card designs for all 32 NHL teams.',
  rewardTiers: [
    {
      id: 'nhl-discover-it-2026-q4',
      name: 'Q4 2026: Restaurants, Entertainment & Utilities',
      rewardRate: 5.0,
      behavior: { type: 'ROTATING', year: 2026, quarter: 4, requiresActivation: true },
      eligibleCategories: ['dining', 'entertainment', 'utilities'],
      spendingCap: { amount: 1500, period: 'QUARTERLY' },
      note: 'Entertainment means tickets (movies, concerts, sports, parks); not standalone streaming.'
    }
  ]
};
