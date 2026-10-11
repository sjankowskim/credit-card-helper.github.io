import { Card, CardNetwork, CardIssuer, RewardsProgram } from '../../../models/card.model';

export const VENTURE_X_REWARDS: Card = {
  id: 'capital-one-venture-x-rewards',
  name: 'Capital One Venture X Rewards',
  issuer: CardIssuer.CAPITAL_ONE,
  rewardsProgram: RewardsProgram.CAPITAL_ONE_REWARDS,
  rewardsCurrency: 'Capital One Miles',
  network: CardNetwork.VISA,
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  baseRewardRate: 2.0,
  imageUrl: '/images/cards/capital-one-venture-x-rewards.png',
  rewardTiers: []
};
