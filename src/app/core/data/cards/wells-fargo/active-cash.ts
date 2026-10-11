import type { Card } from '../../../models/card.model';

export const ACTIVE_CASH: Card = {
  id: 'wells-fargo-active-cash',
  name: 'Wells Fargo Active Cash',
  issuer: 'Wells Fargo',
  rewardsProgram: 'Wells Fargo Rewards',
  rewardsCurrency: 'Cashback',
  network: 'VISA',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 2.0,
  termsCheckedOn: '2026-10-11',
  defaultSignUpBonus: { amount: 200, currency: 'Cashback', spendRequired: 500, windowMonths: 3 },
  rewardTiers: []
};
