import type { Card } from '../../../models/card.model';

// Amex welcome offers vary by applicant, so no default sign-up bonus is listed.
export const DELTA_SKYMILES_PLATINUM: Card = {
  id: 'amex-delta-skymiles-platinum',
  name: 'Delta SkyMiles Platinum American Express Card',
  issuer: 'American Express',
  rewardsProgram: 'Delta SkyMiles',
  rewardsCurrency: 'SkyMiles',
  network: 'AMEX',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 350,
  isBusiness: false,
  creditNeeded: 'good',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  rewardTiers: [
    {
      id: 'delta-platinum-hotels',
      name: 'Hotels',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels'],
      note: 'Booked directly with the hotel.'
    },
    {
      id: 'delta-platinum-2x',
      name: 'Restaurants & U.S. Supermarkets',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining', 'grocery-stores']
    },
    {
      id: 'delta-platinum-delta',
      name: 'Delta',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'Delta purchases'
    }
  ],
  benefits: [
    {
      id: 'delta-platinum-delta-stays',
      name: 'Delta Stays credit',
      amount: 150,
      period: 'ANNUAL',
      resetBasis: 'CALENDAR',
      note: 'Prepaid hotels and vacation rentals through Delta Stays'
    },
    {
      id: 'delta-platinum-resy',
      name: 'Resy credit',
      amount: 10,
      period: 'MONTHLY',
      resetBasis: 'CALENDAR',
      note: 'U.S. Resy restaurants; enrollment required'
    },
    {
      id: 'delta-platinum-rideshare',
      name: 'Rideshare credit',
      amount: 10,
      period: 'MONTHLY',
      resetBasis: 'CALENDAR',
      note: 'U.S. rideshare with select providers; enrollment required'
    }
  ]
};
