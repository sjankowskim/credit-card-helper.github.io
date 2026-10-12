import type { Card } from '../../../models/card.model';

export const OMNI_REWARDS_AMEX: Card = {
  id: 'credit-one-omni-rewards-amex',
  name: 'Credit One Bank Omni Rewards American Express',
  issuer: 'Credit One',
  rewardsProgram: 'Credit One Cash Back',
  rewardsCurrency: 'Cashback',
  network: 'AMEX',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'excellent',
  baseRewardRate: 2.0,
  termsCheckedOn: '2026-10-11',
  defaultSignUpBonus: { amount: 200, currency: 'Cashback', spendRequired: 1000, windowMonths: 6 },
  rewardTiers: []
};
