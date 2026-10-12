import type { Card } from '../../../models/card.model';

// The welcome offer is 20% off your first purchase, so no default sign-up bonus is listed
export const REAL_REWARDS: Card = {
  id: 'synchrony-real-rewards',
  name: 'American Eagle Real Rewards Credit Card',
  issuer: 'Synchrony',
  rewardsProgram: 'Store Rewards',
  rewardsCurrency: 'Cashback',
  network: 'STORE',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'fair',
  baseRewardRate: 0.0,
  termsCheckedOn: '2026-10-11',
  note: 'Only works at American Eagle and Aerie. Free shipping and returns.',
  rewardTiers: [
    {
      id: 'real-rewards-ae',
      name: 'American Eagle & Aerie',
      rewardRate: 16.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['clothing-stores'],
      onlyWhen: 'American Eagle and Aerie purchases'
    }
  ]
};
