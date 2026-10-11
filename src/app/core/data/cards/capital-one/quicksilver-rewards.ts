import type { Card } from '../../../models/card.model';

export const QUICKSILVER_REWARDS: Card = {
  id: 'capital-one-quicksilver-rewards',
  name: 'Capital One Quicksilver Rewards',
  issuer: 'Capital One',
  rewardsProgram: 'Capital One Rewards',
  rewardsCurrency: 'Cashback',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 1.5,
  imageUrl: '/images/cards/capital-one-quicksilver-rewards.png',
  rewardTiers: []
};
