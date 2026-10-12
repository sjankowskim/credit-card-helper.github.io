import type { Card } from '../../../models/card.model';

// Amex welcome offers vary by applicant, so no default sign-up bonus is listed.
export const BLUE_BUSINESS_PLUS: Card = {
  id: 'amex-blue-business-plus',
  name: 'The Blue Business Plus Card from American Express',
  issuer: 'American Express',
  rewardsProgram: 'Amex Membership Rewards',
  rewardsCurrency: 'Membership Rewards',
  network: 'AMEX',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: true,
  affectsChase524: false,
  annualFee: 0,
  isBusiness: true,
  creditNeeded: 'good',
  baseRewardRate: 2.0,
  termsCheckedOn: '2026-10-11',
  note: '2x applies to the first $50,000 in purchases each calendar year, then 1x.',
  rewardTiers: []
};
