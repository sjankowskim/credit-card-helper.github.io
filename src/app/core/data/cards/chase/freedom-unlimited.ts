import type { Card } from '../../../models/card.model';

export const FREEDOM_UNLIMITED: Card = {
  id: 'chase-freedom-unlimited',
  name: 'Chase Freedom Unlimited',
  issuer: 'Chase',
  rewardsProgram: 'Chase Ultimate Rewards',
  rewardsCurrency: 'Ultimate Rewards',
  network: 'VISA',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'good',
  networkTier: 'Visa Signature',
  baseRewardRate: 1.5,
  termsCheckedOn: '2026-10-11',
  defaultSignUpBonus: { amount: 20000, currency: 'Ultimate Rewards', spendRequired: 500, windowMonths: 3 },
  referralCapPerYear: 50000,
  rewardTiers: [
    {
      id: 'freedom-unlimited-dining-drugstores',
      name: 'Dining & Drugstores',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining', 'drugstores']
    },
    {
      id: 'freedom-unlimited-travel-portal',
      name: 'Travel',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['travel'],
      onlyWhen: 'Booked through Chase Travel'
    }
  ]
};
