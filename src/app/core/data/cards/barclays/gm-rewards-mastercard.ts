import type { Card } from '../../../models/card.model';

export const GM_REWARDS_MASTERCARD: Card = {
  id: 'barclays-gm-rewards-mastercard',
  name: 'GM Rewards Mastercard',
  issuer: 'Barclays',
  rewardsProgram: 'Store Rewards',
  rewardsCurrency: 'GM Rewards Points',
  network: 'MASTERCARD',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'good',
  baseRewardRate: 3.0,
  termsCheckedOn: '2026-10-11',
  note: 'GM Rewards points are for GM vehicles and services; their value per point is not shown, so 1¢ is assumed.',
  defaultSignUpBonus: { amount: 30000, currency: 'GM Rewards Points', spendRequired: 1000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'gm-rewards-gm',
      name: 'GM Purchases',
      rewardRate: 7.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: [],
      onlyWhen: 'Eligible GM purchases (up to 10x as a GM Rewards member)'
    }
  ]
};
