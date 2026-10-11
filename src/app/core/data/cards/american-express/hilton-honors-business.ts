import type { Card } from '../../../models/card.model';

// Amex welcome offers vary by applicant, so no default sign-up bonus is listed.
export const HILTON_HONORS_BUSINESS: Card = {
  id: 'amex-hilton-honors-business',
  name: 'The Hilton Honors American Express Business Card',
  issuer: 'American Express',
  rewardsProgram: 'Hilton Honors',
  rewardsCurrency: 'Hilton Honors Points',
  network: 'AMEX',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: false,
  // $0 the first year
  annualFee: 195,
  isBusiness: true,
  baseRewardRate: 5.0,
  termsCheckedOn: '2026-10-11',
  note: '5x applies to the first $100,000 in purchases each calendar year, then 3x.',
  rewardTiers: [
    {
      id: 'hilton-business-hilton',
      name: 'Hilton',
      rewardRate: 12.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels'],
      onlyWhen: 'Hilton hotels and resorts'
    }
  ],
  benefits: [
    {
      id: 'hilton-business-hilton-credit',
      name: 'Hilton credit',
      amount: 60,
      period: 'QUARTERLY',
      resetBasis: 'CALENDAR',
      note: 'Purchases made directly with Hilton properties'
    }
  ]
};
