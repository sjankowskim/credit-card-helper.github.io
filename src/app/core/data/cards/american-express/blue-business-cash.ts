import type { Card } from '../../../models/card.model';

// Amex welcome offers vary by applicant, so no default sign-up bonus is listed.
export const BLUE_BUSINESS_CASH: Card = {
  id: 'amex-blue-business-cash',
  name: 'The American Express Blue Business Cash Card',
  issuer: 'American Express',
  rewardsProgram: 'Amex Cash Back',
  rewardsCurrency: 'Cashback',
  network: 'AMEX',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: false,
  annualFee: 0,
  isBusiness: true,
  creditNeeded: 'good',
  baseRewardRate: 2.0,
  termsCheckedOn: '2026-10-11',
  note: '2% applies to the first $50,000 in purchases each calendar year, then 1%.',
  rewardTiers: []
};
