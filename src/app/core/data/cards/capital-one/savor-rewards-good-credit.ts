import type { Card } from '../../../models/card.model';

export const SAVOR_REWARDS_GOOD_CREDIT: Card = {
  id: 'capital-one-savor-rewards-good-credit',
  name: 'Capital One Savor Rewards for Good Credit',
  issuer: 'Capital One',
  rewardsProgram: 'Capital One Rewards',
  rewardsCurrency: 'Cashback',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  imageOf: 'capital-one-savor-one-rewards',
  rewardTiers: [
    {
      id: 'savor-good-credit-3pct',
      name: 'Grocery, Dining, Entertainment & Streaming',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['grocery-stores', 'dining', 'entertainment', 'streaming'],
      note: 'Grocery excludes superstores like Walmart and Target.'
    },
    {
      id: 'savor-good-credit-entertainment-portal',
      name: 'Capital One Entertainment',
      rewardRate: 8.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['entertainment'],
      onlyWhen: 'Tickets bought through Capital One Entertainment'
    },
    {
      id: 'savor-good-credit-travel-portal',
      name: 'Hotels & Rental Cars',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels', 'car-rentals'],
      onlyWhen: 'Booked through Capital One Travel'
    }
  ]
};
