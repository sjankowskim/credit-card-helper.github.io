import type { Card } from '../../../models/card.model';

// Amex welcome offers vary by applicant, so no default sign-up bonus is listed.
export const BUSINESS_GOLD: Card = {
  id: 'amex-business-gold',
  name: 'American Express Business Gold Card',
  issuer: 'American Express',
  rewardsProgram: 'Amex Membership Rewards',
  rewardsCurrency: 'Membership Rewards',
  network: 'AMEX',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: false,
  annualFee: 375,
  isBusiness: true,
  creditNeeded: 'excellent',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  rewardTiers: [
    {
      id: 'business-gold-top-2',
      name: 'Your Top 2 Categories',
      rewardRate: 4.0,
      behavior: { type: 'AUTO_TOP_SPEND', maxCategories: 2 },
      eligibleCategories: ['airfare', 'advertising', 'gas-stations', 'dining', 'shipping', 'electronics-stores'],
      spendingCap: { amount: 150000, period: 'ANNUAL' },
      note: 'Your 2 highest-spend categories each billing cycle. Airfare must be bought from airlines; electronics include software and cloud providers.'
    },
    {
      id: 'business-gold-amex-travel',
      name: 'Flights & Prepaid Hotels',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare', 'hotels'],
      onlyWhen: 'Booked through Amex Travel'
    }
  ],
  benefits: [
    {
      id: 'business-gold-flex-credit',
      name: 'Business credit',
      amount: 20,
      period: 'MONTHLY',
      resetBasis: 'CALENDAR',
      note: 'FedEx, Grubhub, and office supply stores; enrollment required'
    },
    {
      id: 'business-gold-walmart-plus',
      name: 'Walmart+ credit',
      amount: 12.95,
      period: 'MONTHLY',
      resetBasis: 'CALENDAR',
      note: 'Monthly Walmart+ membership'
    }
  ]
};
