import type { Card } from '../../../models/card.model';

// The id predates the SavorOne -> Savor rename; it's kept so saved cards still match.
export const SAVOR_REWARDS: Card = {
  id: 'capital-one-savor-one-rewards',
  name: 'Capital One Savor Rewards',
  issuer: 'Capital One',
  rewardsProgram: 'Capital One Rewards',
  rewardsCurrency: 'Cashback',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'excellent',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  defaultSignUpBonus: { amount: 200, currency: 'Cashback', spendRequired: 500, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'savor-one-bonus',
      name: 'Grocery, Dining, Entertainment & Streaming',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['grocery-stores', 'dining', 'entertainment', 'streaming']
    },
    {
      id: 'savor-capital-one-entertainment',
      name: 'Capital One Entertainment',
      rewardRate: 8.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['entertainment'],
      onlyWhen: 'Tickets bought through Capital One Entertainment'
    },
    {
      id: 'savor-travel-portal',
      name: 'Hotels, Rental Cars & Vacation Rentals',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels', 'car-rentals'],
      onlyWhen: 'Booked through Capital One Travel'
    }
  ]
};
