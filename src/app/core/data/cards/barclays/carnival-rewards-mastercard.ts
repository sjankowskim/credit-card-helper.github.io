import type { Card } from '../../../models/card.model';

export const CARNIVAL_REWARDS_MASTERCARD: Card = {
  id: 'barclays-carnival-rewards-mastercard',
  name: 'Carnival Rewards Mastercard',
  issuer: 'Barclays',
  rewardsProgram: 'Store Rewards',
  rewardsCurrency: 'Carnival Points',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'good',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: 'Points are for Carnival cruises.',
  defaultSignUpBonus: { amount: 20000, currency: 'Carnival Points', spendRequired: 1000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'carnival-2x',
      name: 'Restaurants & Grocery',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining', 'grocery-stores'],
      note: 'Grocery excludes Target and Walmart.'
    },
    {
      id: 'carnival-carnival',
      name: 'Carnival',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['travel'],
      onlyWhen: 'Carnival purchases (up to 6x with Carnival Rewards)'
    }
  ]
};
