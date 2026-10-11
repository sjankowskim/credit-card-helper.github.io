import type { Card } from '../../../models/card.model';

// Amex welcome offers vary by applicant, so no default sign-up bonus is listed.
export const MARRIOTT_BONVOY_BRILLIANT: Card = {
  id: 'amex-marriott-bonvoy-brilliant',
  name: 'Marriott Bonvoy Brilliant',
  issuer: 'American Express',
  rewardsProgram: 'Marriott Bonvoy',
  rewardsCurrency: 'Marriott Bonvoy Points',
  network: 'AMEX',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 650,
  isBusiness: false,
  baseRewardRate: 2.0,
  termsCheckedOn: '2026-10-11',
  rewardTiers: [
    {
      id: 'brilliant-3x',
      name: 'Restaurants & Flights',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining', 'airfare'],
      note: 'Flights booked directly with airlines.'
    },
    {
      id: 'brilliant-marriott',
      name: 'Marriott',
      rewardRate: 6.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels'],
      onlyWhen: 'Hotels participating in Marriott Bonvoy'
    }
  ],
  benefits: [
    {
      id: 'brilliant-dining-credit',
      name: 'Dining credit',
      amount: 25,
      period: 'MONTHLY',
      resetBasis: 'CALENDAR',
      note: 'Restaurants worldwide'
    }
  ]
};
