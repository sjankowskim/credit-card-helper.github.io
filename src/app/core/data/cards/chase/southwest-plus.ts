import type { Card } from '../../../models/card.model';

export const SOUTHWEST_PLUS: Card = {
  id: 'chase-southwest-plus',
  name: 'Southwest Rapid Rewards Plus',
  issuer: 'Chase',
  rewardsProgram: 'Southwest Rapid Rewards',
  rewardsCurrency: 'Rapid Rewards Points',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 99,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: '3,000 points each anniversary. First checked bag free, 10% flight discount each anniversary, and 10,000 Companion Pass qualifying points each year.',
  defaultSignUpBonus: { amount: 50000, currency: 'Rapid Rewards Points', spendRequired: 1000, windowMonths: 3 },
  referralCapPerYear: 100000,
  rewardTiers: [
    {
      id: 'southwest-plus-gas-grocery',
      name: 'Gas Stations & Grocery Stores',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['gas-stations', 'grocery-stores'],
      spendingCap: { amount: 5000, period: 'ANNUAL' },
      note: 'The $5,000 cap is combined across both categories each anniversary year.'
    },
    {
      id: 'southwest-plus-southwest',
      name: 'Southwest Airlines',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'Southwest Airlines purchases'
    }
  ]
};
