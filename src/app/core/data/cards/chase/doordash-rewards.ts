import type { Card } from '../../../models/card.model';

// The welcome offer is a free year of DashPass with no spend requirement, so no default sign-up bonus is listed
export const DOORDASH_REWARDS: Card = {
  id: 'chase-doordash-rewards',
  name: 'DoorDash Rewards Mastercard',
  issuer: 'Chase',
  rewardsProgram: 'Chase Cash Back',
  rewardsCurrency: 'Cashback',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'good',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: 'Free DashPass each year you spend $10,000.',
  rewardTiers: [
    {
      id: 'doordash-grocery',
      name: 'Grocery Stores',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['grocery-stores'],
      note: 'Online or in store.'
    },
    {
      id: 'doordash-dining',
      name: 'Dining',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining'],
      note: 'Purchased directly from the restaurant.'
    },
    {
      id: 'doordash-doordash',
      name: 'DoorDash & Caviar',
      rewardRate: 4.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['food-delivery'],
      onlyWhen: 'DoorDash and Caviar orders'
    }
  ]
};
