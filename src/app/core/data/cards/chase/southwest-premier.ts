import type { Card } from '../../../models/card.model';

export const SOUTHWEST_PREMIER: Card = {
  id: 'chase-southwest-premier',
  name: 'Southwest Rapid Rewards Premier',
  issuer: 'Chase',
  rewardsProgram: 'Southwest Rapid Rewards',
  rewardsCurrency: 'Rapid Rewards Points',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 149,
  isBusiness: false,
  creditNeeded: 'good',
  networkTier: 'Visa Signature',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: '6,000 points each anniversary. First checked bag free, 15% flight discount each anniversary, and 1,500 A-List qualifying points per $5,000 spent.',
  defaultSignUpBonus: { amount: 55000, currency: 'Rapid Rewards Points', spendRequired: 1500, windowMonths: 3 },
  referralCapPerYear: 100000,
  rewardTiers: [
    {
      id: 'southwest-premier-grocery-dining',
      name: 'Grocery Stores & Restaurants',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['grocery-stores', 'dining'],
      spendingCap: { amount: 8000, period: 'ANNUAL' },
      note: 'The $8,000 cap is combined across both categories each anniversary year.'
    },
    {
      id: 'southwest-premier-southwest',
      name: 'Southwest Airlines',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'Southwest Airlines purchases'
    }
  ]
};
