import type { Card } from '../../../models/card.model';

export const INK_BUSINESS_PREFERRED: Card = {
  id: 'chase-ink-business-preferred',
  name: 'Chase Ink Business Preferred',
  issuer: 'Chase',
  rewardsProgram: 'Chase Ultimate Rewards',
  rewardsCurrency: 'Ultimate Rewards',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: false,
  annualFee: 95,
  isBusiness: true,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  defaultSignUpBonus: { amount: 100000, currency: 'Ultimate Rewards', spendRequired: 8000, windowMonths: 3 },
  referralCapPerYear: 100000,
  rewardTiers: [
    {
      id: 'ink-preferred-3x',
      name: 'Travel, Shipping, Internet/Cable/Phone & Ads',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['travel', 'shipping', 'internet-cable', 'phone', 'advertising'],
      spendingCap: { amount: 150000, period: 'ANNUAL' },
      note: 'The $150,000 cap is combined across these categories each account anniversary year.'
    }
  ]
};
