import type { Card } from '../../../models/card.model';

export const FREEDOM_FLEX: Card = {
  id: 'chase-freedom-flex',
  name: 'Chase Freedom Flex',
  issuer: 'Chase',
  rewardsProgram: 'Chase Ultimate Rewards',
  rewardsCurrency: 'Ultimate Rewards',
  network: 'MASTERCARD',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'good',
  networkTier: 'World Elite Mastercard',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  defaultSignUpBonus: { amount: 25000, currency: 'Ultimate Rewards', spendRequired: 500, windowMonths: 3 },
  referralCapPerYear: 50000,
  rewardTiers: [
    {
      id: 'freedom-flex-dining-drugstores',
      name: 'Dining & Drugstores',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining', 'drugstores']
    },
    {
      id: 'freedom-flex-travel-portal',
      name: 'Travel',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['travel'],
      onlyWhen: 'Booked through Chase Travel'
    },
    {
      id: 'freedom-flex-2026-q4',
      name: 'Q4 2026: Grocery Stores & Dining',
      rewardRate: 5.0,
      behavior: { type: 'ROTATING', year: 2026, quarter: 4, requiresActivation: true },
      eligibleCategories: ['grocery-stores', 'dining'],
      spendingCap: { amount: 1500, period: 'QUARTERLY' },
      note: 'Excludes Walmart and Target. Also covers American Red Cross donations. On dining it stacks with the 3% rate (7% total).'
    }
  ]
};
