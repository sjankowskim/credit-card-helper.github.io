import type { Card } from '../../../models/card.model';

export const ALLWAYS_REWARDS: Card = {
  id: 'bofa-allways-rewards',
  name: 'Allways Rewards Visa',
  issuer: 'Bank of America',
  rewardsProgram: 'Store Rewards',
  rewardsCurrency: 'Allways Points',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 59,
  isBusiness: false,
  creditNeeded: 'good',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: 'Points are for Allegiant travel.',
  defaultSignUpBonus: { amount: 30000, currency: 'Allways Points', spendRequired: 1500, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'allways-dining',
      name: 'Dining',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining']
    },
    {
      id: 'allways-allegiant',
      name: 'Allegiant',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'Allegiant purchases'
    }
  ]
};
