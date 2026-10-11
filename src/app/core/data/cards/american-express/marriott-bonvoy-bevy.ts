import type { Card } from '../../../models/card.model';

// Amex welcome offers vary by applicant, so no default sign-up bonus is listed.
export const MARRIOTT_BONVOY_BEVY: Card = {
  id: 'amex-marriott-bonvoy-bevy',
  name: 'Marriott Bonvoy Bevy American Express Card',
  issuer: 'American Express',
  rewardsProgram: 'Marriott Bonvoy',
  rewardsCurrency: 'Marriott Bonvoy Points',
  network: 'AMEX',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 250,
  isBusiness: false,
  baseRewardRate: 2.0,
  termsCheckedOn: '2026-10-11',
  rewardTiers: [
    {
      id: 'bevy-4x',
      name: 'Restaurants & U.S. Supermarkets',
      rewardRate: 4.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining', 'grocery-stores'],
      spendingCap: { amount: 15000, period: 'ANNUAL' },
      note: 'The $15,000 cap is combined across both categories.'
    },
    {
      id: 'bevy-marriott',
      name: 'Marriott',
      rewardRate: 6.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels'],
      onlyWhen: 'Hotels participating in Marriott Bonvoy'
    }
  ]
};
