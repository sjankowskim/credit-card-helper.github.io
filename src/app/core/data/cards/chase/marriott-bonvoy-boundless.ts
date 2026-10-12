import type { Card } from '../../../models/card.model';

// The sign-up bonus is 3 Free Night Awards (up to 50,000 points each) after $3,000 in 3 months,
// which isn't a points amount, so no default sign-up bonus is listed.
export const MARRIOTT_BONVOY_BOUNDLESS: Card = {
  id: 'chase-marriott-bonvoy-boundless',
  name: 'Marriott Bonvoy Boundless',
  issuer: 'Chase',
  rewardsProgram: 'Marriott Bonvoy',
  rewardsCurrency: 'Marriott Bonvoy Points',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 95,
  isBusiness: false,
  creditNeeded: 'good',
  networkTier: 'Visa Signature',
  baseRewardRate: 2.0,
  termsCheckedOn: '2026-10-11',
  note: 'Free Night Award (up to 35,000 points) each anniversary. Silver Elite status and 15 Elite Night Credits each year.',
  referralCapPerYear: 200000,
  rewardTiers: [
    {
      id: 'boundless-3x',
      name: 'Grocery Stores, Gas & Dining',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['grocery-stores', 'gas-stations', 'dining'],
      spendingCap: { amount: 6000, period: 'ANNUAL' },
      note: 'The $6,000 cap is combined across these categories.'
    },
    {
      id: 'boundless-marriott',
      name: 'Marriott',
      rewardRate: 6.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels'],
      onlyWhen: 'Hotels participating in Marriott Bonvoy'
    }
  ],
  benefits: [
    {
      id: 'boundless-airline-credit',
      name: 'Airline credit',
      amount: 50,
      period: 'SEMIANNUAL',
      resetBasis: 'CALENDAR',
      note: 'After $250 on airline purchases each half year; offer runs through 6/30/2027'
    }
  ]
};
