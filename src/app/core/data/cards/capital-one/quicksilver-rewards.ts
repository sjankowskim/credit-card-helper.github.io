import { Card, CardNetwork, CardIssuer, RewardsProgram } from '../../../models/card.model';

export const QUICKSILVER_REWARDS: Card = {
  id: 'capital-one-quicksilver-rewards',
  name: 'Capital One Quicksilver Rewards',
  issuer: CardIssuer.CAPITAL_ONE,
  rewardsProgram: RewardsProgram.CAPITAL_ONE_REWARDS,
  rewardsCurrency: 'Cashback',
  network: CardNetwork.MASTERCARD,
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  baseRewardRate: 1.5,
  imageUrl: '/images/cards/capital-one-quicksilver-rewards.png',
  rewardTiers: []
};
