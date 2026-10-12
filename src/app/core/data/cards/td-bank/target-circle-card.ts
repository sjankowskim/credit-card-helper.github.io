import type { Card } from '../../../models/card.model';

export const TARGET_CIRCLE_CARD: Card = {
  id: 'td-bank-target-circle-card',
  name: 'Target Circle Card',
  issuer: 'TD Bank',
  rewardsProgram: 'Store Rewards',
  rewardsCurrency: 'Cashback',
  network: 'STORE',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'fair',
  baseRewardRate: 0.0,
  termsCheckedOn: '2026-10-11',
  note: 'Only works at Target. 5% comes off at checkout; Target Circle 360 is discounted to $49 a year.',
  defaultSignUpBonus: { amount: 50, currency: 'Cashback', spendRequired: 50, windowMonths: 2 },
  rewardTiers: [
    {
      id: 'target-circle-target',
      name: 'Target',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['department-stores'],
      onlyWhen: 'Target stores and Target.com'
    }
  ]
};
