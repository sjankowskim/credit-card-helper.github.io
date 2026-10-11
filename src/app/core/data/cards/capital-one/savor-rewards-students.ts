import type { Card } from '../../../models/card.model';

export const SAVOR_REWARDS_STUDENTS: Card = {
  id: 'capital-one-savor-rewards-students',
  name: 'Capital One Savor Rewards for Students',
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
  defaultSignUpBonus: { amount: 50, currency: 'Cashback', spendRequired: 100, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'savor-students-3pct',
      name: 'Grocery, Dining, Entertainment & Streaming',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['grocery-stores', 'dining', 'entertainment', 'streaming'],
      note: 'Grocery excludes superstores like Walmart and Target.'
    },
    {
      id: 'savor-students-entertainment-portal',
      name: 'Capital One Entertainment',
      rewardRate: 8.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['entertainment'],
      onlyWhen: 'Tickets bought through Capital One Entertainment'
    },
    {
      id: 'savor-students-travel-portal',
      name: 'Hotels & Rental Cars',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels', 'car-rentals'],
      onlyWhen: 'Booked through Capital One Travel'
    }
  ]
};
