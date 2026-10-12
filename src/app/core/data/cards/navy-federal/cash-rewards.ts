import type { Card } from '../../../models/card.model';

export const CASH_REWARDS: Card = {
  id: 'navy-federal-cash-rewards',
  name: 'Navy Federal cashRewards',
  issuer: 'Navy Federal',
  rewardsProgram: 'Navy Federal Rewards',
  rewardsCurrency: 'Cashback',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'good',
  baseRewardRate: 1.5,
  termsCheckedOn: '2026-10-11',
  note: 'Approvals with a credit limit of $5,000 or more get cashRewards Plus (2%) instead.',
  defaultSignUpBonus: { amount: 250, currency: 'Cashback', spendRequired: 2500, windowMonths: 3 },
  rewardTiers: []
};
