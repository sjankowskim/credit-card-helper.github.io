import type { Card } from '../../../models/card.model';

// Amex welcome offers vary by applicant, so no default sign-up bonus is listed.
export const DELTA_SKYMILES_RESERVE: Card = {
  id: 'amex-delta-skymiles-reserve',
  name: 'Delta SkyMiles Reserve American Express Card',
  issuer: 'American Express',
  rewardsProgram: 'Delta SkyMiles',
  rewardsCurrency: 'SkyMiles',
  network: 'AMEX',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 650,
  isBusiness: false,
  creditNeeded: 'excellent',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  rewardTiers: [
    {
      id: 'delta-reserve-delta',
      name: 'Delta',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'Delta purchases'
    }
  ],
  benefits: [
    {
      id: 'delta-reserve-delta-stays',
      name: 'Delta Stays credit',
      amount: 200,
      period: 'ANNUAL',
      resetBasis: 'CALENDAR',
      note: 'Prepaid hotels and vacation rentals through Delta Stays'
    },
    {
      id: 'delta-reserve-resy',
      name: 'Resy credit',
      amount: 20,
      period: 'MONTHLY',
      resetBasis: 'CALENDAR',
      note: 'U.S. Resy restaurants; enrollment required'
    },
    {
      id: 'delta-reserve-rideshare',
      name: 'Rideshare credit',
      amount: 10,
      period: 'MONTHLY',
      resetBasis: 'CALENDAR',
      note: 'U.S. rideshare with select providers; enrollment required'
    }
  ]
};
