import type { Card } from '../../../models/card.model';

// Amex welcome offers vary by applicant, so no default sign-up bonus is listed.
export const BUSINESS_GREEN_REWARDS: Card = {
  id: 'amex-business-green-rewards',
  name: 'American Express Business Green Rewards Card',
  issuer: 'American Express',
  rewardsProgram: 'Amex Membership Rewards',
  rewardsCurrency: 'Membership Rewards',
  network: 'AMEX',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: false,
  annualFee: 95,
  isBusiness: true,
  creditNeeded: 'excellent',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  rewardTiers: [
    {
      id: 'business-green-amex-travel',
      name: 'Amex Travel',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['travel'],
      onlyWhen: 'Booked through Amex Travel'
    }
  ]
};
