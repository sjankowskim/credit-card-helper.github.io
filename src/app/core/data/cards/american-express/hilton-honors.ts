import type { Card } from '../../../models/card.model';

// Amex welcome offers vary by applicant, so no default sign-up bonus is listed.
export const HILTON_HONORS: Card = {
  id: 'amex-hilton-honors',
  name: 'Hilton Honors American Express Card',
  issuer: 'American Express',
  rewardsProgram: 'Hilton Honors',
  rewardsCurrency: 'Hilton Honors Points',
  network: 'AMEX',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'good',
  baseRewardRate: 3.0,
  termsCheckedOn: '2026-10-11',
  rewardTiers: [
    {
      id: 'hilton-honors-5x',
      name: 'U.S. Restaurants, Supermarkets & Gas',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining', 'grocery-stores', 'gas-stations']
    },
    {
      id: 'hilton-honors-hilton',
      name: 'Hilton',
      rewardRate: 7.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels'],
      onlyWhen: 'Hilton hotels and resorts'
    }
  ]
};
