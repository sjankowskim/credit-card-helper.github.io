import type { Card } from '../../../models/card.model';

// Amex welcome offers vary by applicant, so no default sign-up bonus is listed.
export const BUSINESS_CASH_UNLIMITED: Card = {
  id: 'amex-graphite-business-cash-unlimited',
  name: 'American Express Graphite Business Cash Unlimited Card',
  issuer: 'American Express',
  rewardsProgram: 'Amex Cash Back',
  rewardsCurrency: 'Cashback',
  network: 'AMEX',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: false,
  annualFee: 295,
  isBusiness: true,
  baseRewardRate: 2.0,
  termsCheckedOn: '2026-10-11',
  rewardTiers: [
    {
      id: 'graphite-amex-travel',
      name: 'Flights & Prepaid Hotels',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare', 'hotels'],
      onlyWhen: 'Booked through Amex Travel'
    }
  ]
};
