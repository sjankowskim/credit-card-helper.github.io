import type { Card } from '../../../models/card.model';

export const CASH_REWARDS_PLUS: Card = {
  id: 'navy-federal-cash-rewards-plus',
  name: 'Navy Federal cashRewards Plus',
  issuer: 'Navy Federal',
  rewardsProgram: 'Navy Federal Rewards',
  rewardsCurrency: 'Cashback',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 2.0,
  termsCheckedOn: '2026-10-11',
  note: 'Issued instead of cashRewards when the credit limit is $5,000 or more.',
  defaultSignUpBonus: { amount: 250, currency: 'Cashback', spendRequired: 2500, windowMonths: 3 },
  rewardTiers: []
};
