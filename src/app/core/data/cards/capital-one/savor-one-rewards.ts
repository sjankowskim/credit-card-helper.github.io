import type { Card } from '../../../models/card.model';

export const SAVOR_ONE_REWARDS: Card = {
  id: 'capital-one-savor-one-rewards',
  name: 'Capital One Savor One Rewards',
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
  imageUrl: '/images/cards/capital-one-savor-one-rewards.png',
  rewardTiers: [
    {
      id: 'savor-one-bonus',
      name: 'Grocery, Dining, Entertainment & Streaming',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['grocery-stores', 'dining', 'entertainment', 'streaming']
    }
  ]
};
