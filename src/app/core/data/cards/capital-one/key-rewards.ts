import type { Card } from '../../../models/card.model';

export const KEY_REWARDS: Card = {
  id: 'capital-one-key-rewards-visa',
  name: 'Key Rewards Visa',
  issuer: 'Capital One',
  rewardsProgram: 'Store Rewards',
  rewardsCurrency: 'Cashback',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: 'Capital One lists up to 5% back without naming categories, so only the brand rate is shown and 1% elsewhere is assumed. Rewards are store credit at Williams-Sonoma, Inc. brands.',
  rewardTiers: [
    {
      id: 'key-rewards-visa-brands',
      name: 'Williams-Sonoma Brands',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['furniture-stores', 'home-improvement'],
      onlyWhen: 'Williams-Sonoma, Inc. brands'
    }
  ]
};
