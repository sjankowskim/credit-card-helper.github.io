import type { Card } from '../../../models/card.model';

// Amex welcome offers vary by applicant, so no default sign-up bonus is listed.
export const MARRIOTT_BONVOY_BUSINESS: Card = {
  id: 'amex-marriott-bonvoy-business',
  name: 'Marriott Bonvoy Business',
  issuer: 'American Express',
  rewardsProgram: 'Marriott Bonvoy',
  rewardsCurrency: 'Marriott Bonvoy Points',
  network: 'AMEX',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: false,
  // Sources list $125 or $150
  annualFee: 125,
  isBusiness: true,
  baseRewardRate: 2.0,
  termsCheckedOn: '2026-10-11',
  rewardTiers: [
    {
      id: 'marriott-business-4x',
      name: 'Restaurants, U.S. Gas, Wireless & Shipping',
      rewardRate: 4.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining', 'gas-stations', 'phone', 'shipping']
    },
    {
      id: 'marriott-business-marriott',
      name: 'Marriott',
      rewardRate: 6.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels'],
      onlyWhen: 'Hotels participating in Marriott Bonvoy'
    }
  ]
};
