import type { Card } from '../../../models/card.model';

export const INK_BUSINESS_UNLIMITED: Card = {
  id: 'chase-ink-business-unlimited',
  name: 'Chase Ink Business Unlimited',
  issuer: 'Chase',
  rewardsProgram: 'Chase Ultimate Rewards',
  rewardsCurrency: 'Ultimate Rewards',
  network: 'VISA',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: false,
  annualFee: 0,
  isBusiness: true,
  creditNeeded: 'good',
  networkTier: 'Visa Signature Business',
  baseRewardRate: 1.5,
  termsCheckedOn: '2026-10-11',
  defaultSignUpBonus: { amount: 100000, currency: 'Ultimate Rewards', spendRequired: 8000, windowMonths: 4 },
  referralCapPerYear: 75000,
  rewardTiers: []
};
