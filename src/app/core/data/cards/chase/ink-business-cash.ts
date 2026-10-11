import type { Card } from '../../../models/card.model';

export const INK_BUSINESS_CASH: Card = {
  id: 'chase-ink-business-cash',
  name: 'Chase Ink Business Cash',
  issuer: 'Chase',
  rewardsProgram: 'Chase Ultimate Rewards',
  rewardsCurrency: 'Ultimate Rewards',
  network: 'VISA',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: false,
  annualFee: 0,
  isBusiness: true,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  defaultSignUpBonus: { amount: 75000, currency: 'Ultimate Rewards', spendRequired: 6000, windowMonths: 3 },
  referralCapPerYear: 100000,
  rewardTiers: [
    {
      id: 'ink-cash-5x',
      name: 'Office Supply Stores & Internet/Cable/Phone',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['office-supply-stores', 'internet-cable', 'phone'],
      spendingCap: { amount: 25000, period: 'ANNUAL' },
      note: 'The $25,000 cap is combined across these categories each account anniversary year.'
    },
    {
      id: 'ink-cash-2x',
      name: 'Gas Stations & Restaurants',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['gas-stations', 'dining'],
      spendingCap: { amount: 25000, period: 'ANNUAL' },
      note: 'The $25,000 cap is combined across these categories each account anniversary year.'
    }
  ]
};
