import type { Card } from '../../../models/card.model';

export const GO_REWARDS: Card = {
  id: 'navy-federal-go-rewards',
  name: 'Navy Federal GO REWARDS',
  issuer: 'Navy Federal',
  rewardsProgram: 'Navy Federal Rewards',
  rewardsCurrency: 'Navy Federal Points',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  rewardTiers: [
    {
      id: 'go-rewards-gas',
      name: 'Gas',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['gas-stations']
    },
    {
      id: 'go-rewards-dining',
      name: 'Restaurants',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining']
    }
  ]
};
