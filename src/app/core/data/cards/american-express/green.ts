import type { Card } from '../../../models/card.model';

// Amex welcome offers vary by applicant, so no default sign-up bonus is listed.
export const GREEN: Card = {
  id: 'amex-green',
  name: 'American Express Green Card',
  issuer: 'American Express',
  rewardsProgram: 'Amex Membership Rewards',
  rewardsCurrency: 'Membership Rewards',
  network: 'AMEX',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 150,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  rewardTiers: [
    {
      id: 'amex-green-3x',
      name: 'Dining, Travel & Transit',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining', 'travel', 'transit'],
      note: 'Restaurants worldwide, including U.S. takeout and delivery.'
    }
  ],
  benefits: [
    {
      id: 'amex-green-clear',
      name: 'CLEAR+ credit',
      amount: 199,
      period: 'ANNUAL',
      resetBasis: 'CALENDAR',
      note: 'CLEAR+ membership (sources list $189 to $199)'
    }
  ]
};
