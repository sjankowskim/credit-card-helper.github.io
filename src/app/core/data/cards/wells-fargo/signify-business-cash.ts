import type { Card } from '../../../models/card.model';

export const SIGNIFY_BUSINESS_CASH: Card = {
  id: 'wells-fargo-signify-business-cash',
  name: 'Wells Fargo Signify Business Cash',
  issuer: 'Wells Fargo',
  rewardsProgram: 'Wells Fargo Rewards',
  rewardsCurrency: 'Cashback',
  network: 'MASTERCARD',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: false,
  annualFee: 0,
  isBusiness: true,
  baseRewardRate: 2.0,
  termsCheckedOn: '2026-10-11',
  defaultSignUpBonus: { amount: 500, currency: 'Cashback', spendRequired: 5000, windowMonths: 3 },
  rewardTiers: []
};
