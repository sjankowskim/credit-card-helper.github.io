import type { Card } from '../../../models/card.model';

// Amex welcome offers vary by applicant, so no default sign-up bonus is listed.
export const BUSINESS_PLATINUM: Card = {
  id: 'amex-business-platinum',
  name: 'The Business Platinum Card from American Express',
  issuer: 'American Express',
  rewardsProgram: 'Amex Membership Rewards',
  rewardsCurrency: 'Membership Rewards',
  network: 'AMEX',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: false,
  annualFee: 895,
  isBusiness: true,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: 'Earns 2x on single purchases of $5,000 or more, up to $2 million a year.',
  rewardTiers: [
    {
      id: 'business-platinum-amex-travel',
      name: 'Flights & Prepaid Hotels',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare', 'hotels'],
      onlyWhen: 'Booked through Amex Travel'
    }
  ],
  benefits: [
    {
      id: 'business-platinum-hotel-credit',
      name: 'Fine Hotels + Resorts / Hotel Collection credit',
      amount: 300,
      period: 'SEMIANNUAL',
      resetBasis: 'CALENDAR',
      note: 'Prepaid stays through Amex Travel'
    },
    {
      id: 'business-platinum-airline-fee',
      name: 'Airline fee credit',
      amount: 200,
      period: 'ANNUAL',
      resetBasis: 'CALENDAR',
      note: 'Incidental fees on one selected airline'
    },
    {
      id: 'business-platinum-adobe',
      name: 'Adobe credit',
      amount: 150,
      period: 'ANNUAL',
      resetBasis: 'CALENDAR',
      note: 'Select Adobe purchases; enrollment required'
    }
  ]
};
