import type { Card } from '../../../models/card.model';

// Amex welcome offers vary by applicant, so no default sign-up bonus is listed.
export const BLUE_CASH_EVERYDAY: Card = {
  id: 'amex-blue-cash-everyday',
  name: 'Blue Cash Everyday',
  issuer: 'American Express',
  rewardsProgram: 'Amex Cash Back',
  rewardsCurrency: 'Cashback',
  network: 'AMEX',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  rewardTiers: [
    {
      id: 'bce-3pct',
      name: 'U.S. Supermarkets, Online Retail & Gas',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['grocery-stores', 'online-retail', 'gas-stations'],
      spendingCap: { amount: 6000, period: 'ANNUAL' },
      note: 'The $6,000 cap applies to each category separately.'
    }
  ],
  benefits: [
    {
      id: 'bce-disney-bundle',
      name: 'Disney Bundle credit',
      amount: 7,
      period: 'MONTHLY',
      resetBasis: 'CALENDAR',
      note: 'Disney Bundle subscription; enrollment required'
    },
    {
      id: 'bce-home-chef',
      name: 'Home Chef credit',
      amount: 15,
      period: 'MONTHLY',
      resetBasis: 'CALENDAR',
      note: 'Home Chef meal kits; enrollment required'
    }
  ]
};
