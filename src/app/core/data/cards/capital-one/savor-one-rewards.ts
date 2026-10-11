import { Card, CardNetwork, CardIssuer, RewardsProgram } from '../../../models/card.model';

export const SAVOR_ONE_REWARDS: Card = {
  id: 'capital-one-savor-one-rewards',
  name: 'Capital One Savor One Rewards',
  issuer: CardIssuer.CAPITAL_ONE,
  rewardsProgram: RewardsProgram.CAPITAL_ONE_REWARDS,
  rewardsCurrency: 'Cashback',
  network: CardNetwork.MASTERCARD,
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
      name: 'Grocery, Dining & Entertainment',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['grocery-stores', 'dining', 'entertainment']
    }
  ]
};
