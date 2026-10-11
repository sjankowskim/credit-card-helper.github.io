import type { Card } from '../../../models/card.model';

// Amex welcome offers vary by applicant, so no default sign-up bonus is listed.
export const HILTON_HONORS_ASPIRE: Card = {
  id: 'amex-hilton-honors-aspire',
  name: 'Hilton Honors Aspire',
  issuer: 'American Express',
  rewardsProgram: 'Hilton Honors',
  rewardsCurrency: 'Hilton Honors Points',
  network: 'AMEX',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 550,
  isBusiness: false,
  baseRewardRate: 3.0,
  termsCheckedOn: '2026-10-11',
  rewardTiers: [
    {
      id: 'aspire-7x',
      name: 'Flights, Car Rentals & U.S. Restaurants',
      rewardRate: 7.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare', 'car-rentals', 'dining'],
      note: 'Flights booked directly with airlines or through Amex Travel.'
    },
    {
      id: 'aspire-hilton',
      name: 'Hilton',
      rewardRate: 14.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels'],
      onlyWhen: 'Hilton hotels and resorts'
    }
  ],
  benefits: [
    {
      id: 'aspire-resort-credit',
      name: 'Hilton resort credit',
      amount: 200,
      period: 'SEMIANNUAL',
      resetBasis: 'CALENDAR',
      note: 'Participating Hilton resorts'
    },
    {
      id: 'aspire-flight-credit',
      name: 'Flight credit',
      amount: 50,
      period: 'QUARTERLY',
      resetBasis: 'CALENDAR',
      note: 'Flights booked directly with airlines or through Amex Travel'
    },
    {
      id: 'aspire-clear',
      name: 'CLEAR+ credit',
      amount: 209,
      period: 'ANNUAL',
      resetBasis: 'CALENDAR',
      note: 'CLEAR+ membership'
    }
  ]
};
