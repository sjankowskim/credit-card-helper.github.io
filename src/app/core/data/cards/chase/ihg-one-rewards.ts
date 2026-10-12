import type { Card } from '../../../models/card.model';

export const IHG_ONE_REWARDS: Card = {
  id: 'chase-ihg-one-rewards',
  name: 'IHG One Rewards Credit Card',
  issuer: 'Chase',
  rewardsProgram: 'IHG One Rewards',
  rewardsCurrency: 'IHG Points',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'good',
  baseRewardRate: 2.0,
  termsCheckedOn: '2026-10-11',
  note: 'Silver Elite status and 5 Elite Night Credits each year. 10,000 bonus points after $15,000 spend in a calendar year.',
  defaultSignUpBonus: { amount: 125000, currency: 'IHG Points', spendRequired: 2000, windowMonths: 3 },
  referralCapPerYear: 50000,
  rewardTiers: [
    {
      id: 'ihg-one-rewards-3x',
      name: 'Dining, Gas & Grocery Stores',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining', 'gas-stations', 'grocery-stores']
    },
    {
      id: 'ihg-one-rewards-ihg',
      name: 'IHG Hotels',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels'],
      onlyWhen: 'IHG Hotels & Resorts'
    }
  ]
};
