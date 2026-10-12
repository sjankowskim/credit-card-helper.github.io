import type { Card } from '../../../models/card.model';

export const MYLOWES_REWARDS: Card = {
  id: 'synchrony-mylowes-rewards',
  name: "MyLowe's Rewards Credit Card",
  issuer: 'Synchrony',
  rewardsProgram: 'Store Rewards',
  rewardsCurrency: 'Cashback',
  network: 'STORE',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 0.0,
  termsCheckedOn: '2026-10-11',
  note: "Only works at Lowe's. The 5% comes off at checkout; you can take special financing instead.",
  rewardTiers: [
    {
      id: 'mylowes-lowes',
      name: "Lowe's",
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['home-improvement'],
      onlyWhen: "Lowe's purchases"
    }
  ]
};
