import type { Card } from '../../../models/card.model';

/** The original Chase Freedom, replaced by the Freedom Flex in 2019; it shares the Flex's rotating categories */
export const FREEDOM: Card = {
  id: 'chase-freedom',
  name: 'Chase Freedom',
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
  baseRewardRate: 1.0,
  discontinued: true,
  termsCheckedOn: '2026-10-11',
  rewardTiers: [
    {
      id: 'freedom-2026-q4',
      name: 'Q4 2026: Grocery Stores & Dining',
      rewardRate: 5.0,
      behavior: { type: 'ROTATING', year: 2026, quarter: 4, requiresActivation: true },
      eligibleCategories: ['grocery-stores', 'dining'],
      spendingCap: { amount: 1500, period: 'QUARTERLY' },
      note: 'Excludes Walmart and Target. Also covers American Red Cross donations.'
    }
  ]
};
