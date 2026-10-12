import type { Card } from '../../../models/card.model';

// The offer also pays up to 30,000 more points as an extra 1x on up to $15,000 of 1x purchases in the
// first 6 months; only the fixed 30,000-point part is listed.
export const WORLD_OF_HYATT: Card = {
  id: 'chase-world-of-hyatt',
  name: 'World of Hyatt Credit Card',
  issuer: 'Chase',
  rewardsProgram: 'World of Hyatt',
  rewardsCurrency: 'World of Hyatt Points',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 95,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: 'Free night at a Category 1-4 hotel each anniversary, plus another after $15,000 spend in a calendar year. 5 tier-qualifying night credits each year.',
  defaultSignUpBonus: { amount: 30000, currency: 'World of Hyatt Points', spendRequired: 3000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'world-of-hyatt-2x',
      name: 'Dining, Airfare, Transit & Fitness',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining', 'airfare', 'transit', 'rideshare', 'fitness'],
      note: 'Airfare must be bought directly from the airline. Fitness covers gym and fitness club memberships.'
    },
    {
      id: 'world-of-hyatt-hyatt',
      name: 'Hyatt',
      rewardRate: 4.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels'],
      onlyWhen: 'Hyatt hotels and resorts'
    }
  ]
};
