import type { Card } from '../../../models/card.model';

// Amex welcome offers vary by applicant, so no default sign-up bonus is listed.
export const HILTON_HONORS_SURPASS: Card = {
  id: 'amex-hilton-honors-surpass',
  name: 'Hilton Honors American Express Surpass Card',
  issuer: 'American Express',
  rewardsProgram: 'Hilton Honors',
  rewardsCurrency: 'Hilton Honors Points',
  network: 'AMEX',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 150,
  isBusiness: false,
  creditNeeded: 'good',
  baseRewardRate: 3.0,
  termsCheckedOn: '2026-10-11',
  rewardTiers: [
    {
      id: 'surpass-6x',
      name: 'U.S. Restaurants, Supermarkets & Gas',
      rewardRate: 6.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining', 'grocery-stores', 'gas-stations']
    },
    {
      id: 'surpass-online-retail',
      name: 'U.S. Online Retail',
      rewardRate: 4.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['online-retail']
    },
    {
      id: 'surpass-hilton',
      name: 'Hilton',
      rewardRate: 12.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels'],
      onlyWhen: 'Hilton hotels and resorts'
    }
  ],
  benefits: [
    {
      id: 'surpass-hilton-credit',
      name: 'Hilton credit',
      amount: 50,
      period: 'QUARTERLY',
      resetBasis: 'CALENDAR',
      note: 'Purchases made directly with Hilton properties'
    }
  ]
};
