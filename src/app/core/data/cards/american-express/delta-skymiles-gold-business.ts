import type { Card } from '../../../models/card.model';

// Amex welcome offers vary by applicant, so no default sign-up bonus is listed.
export const DELTA_SKYMILES_GOLD_BUSINESS: Card = {
  id: 'amex-delta-skymiles-gold-business',
  name: 'Delta SkyMiles Gold Business American Express Card',
  issuer: 'American Express',
  rewardsProgram: 'Delta SkyMiles',
  rewardsCurrency: 'SkyMiles',
  network: 'AMEX',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: false,
  // $0 the first year
  annualFee: 150,
  isBusiness: true,
  creditNeeded: 'good',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  rewardTiers: [
    {
      id: 'delta-gold-business-2x',
      name: 'Restaurants, U.S. Advertising & U.S. Shipping',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining', 'advertising', 'shipping']
    },
    {
      id: 'delta-gold-business-delta',
      name: 'Delta',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'Delta purchases'
    }
  ]
};
