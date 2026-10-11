import type { Card } from '../../../models/card.model';

// Amex welcome offers vary by applicant, so no default sign-up bonus is listed.
export const PLATINUM: Card = {
  id: 'amex-platinum',
  name: 'Platinum',
  issuer: 'American Express',
  rewardsProgram: 'Amex Membership Rewards',
  rewardsCurrency: 'Membership Rewards',
  network: 'AMEX',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 895,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  rewardTiers: [
    {
      id: 'amex-platinum-flights',
      name: 'Flights',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      spendingCap: { amount: 500000, period: 'ANNUAL' },
      note: 'Booked directly with the airline or through Amex Travel.'
    },
    {
      id: 'amex-platinum-hotels-portal',
      name: 'Prepaid Hotels',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels'],
      onlyWhen: 'Prepaid hotels booked through Amex Travel'
    }
  ],
  benefits: [
    {
      id: 'amex-platinum-hotel-credit',
      name: 'Fine Hotels + Resorts / Hotel Collection credit',
      amount: 300,
      period: 'SEMIANNUAL',
      resetBasis: 'CALENDAR',
      note: 'Prepaid stays through Amex Travel; Hotel Collection needs 2+ nights'
    },
    {
      id: 'amex-platinum-resy',
      name: 'Resy credit',
      amount: 100,
      period: 'QUARTERLY',
      resetBasis: 'CALENDAR',
      note: 'U.S. Resy restaurants; enrollment required'
    },
    {
      id: 'amex-platinum-lululemon',
      name: 'lululemon credit',
      amount: 75,
      period: 'QUARTERLY',
      resetBasis: 'CALENDAR',
      note: 'U.S. stores and lululemon.com; enrollment required'
    },
    {
      id: 'amex-platinum-digital-entertainment',
      name: 'Digital entertainment credit',
      amount: 25,
      period: 'MONTHLY',
      resetBasis: 'CALENDAR',
      note: 'Eligible streaming and news subscriptions; enrollment required'
    },
    {
      id: 'amex-platinum-uber-cash',
      name: 'Uber Cash',
      amount: 15,
      period: 'MONTHLY',
      resetBasis: 'CALENDAR',
      note: 'U.S. Uber rides and Uber Eats; $35 in December'
    },
    {
      id: 'amex-platinum-walmart-plus',
      name: 'Walmart+ credit',
      amount: 12.95,
      period: 'MONTHLY',
      resetBasis: 'CALENDAR',
      note: 'Monthly Walmart+ membership'
    },
    {
      id: 'amex-platinum-airline-fee',
      name: 'Airline fee credit',
      amount: 200,
      period: 'ANNUAL',
      resetBasis: 'CALENDAR',
      note: 'Incidental fees on one selected airline'
    },
    {
      id: 'amex-platinum-clear',
      name: 'CLEAR+ credit',
      amount: 209,
      period: 'ANNUAL',
      resetBasis: 'CALENDAR',
      note: 'CLEAR+ membership'
    }
  ]
};
