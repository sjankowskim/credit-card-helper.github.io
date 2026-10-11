import type { Card } from '../../../models/card.model';

// Amex welcome offers vary by applicant, so no default sign-up bonus is listed.
export const DELTA_SKYMILES_BLUE: Card = {
  id: 'amex-delta-skymiles-blue',
  name: 'Delta SkyMiles Blue',
  issuer: 'American Express',
  rewardsProgram: 'Delta SkyMiles',
  rewardsCurrency: 'SkyMiles',
  network: 'AMEX',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  rewardTiers: [
    {
      id: 'delta-blue-dining',
      name: 'Restaurants',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining']
    },
    {
      id: 'delta-blue-delta',
      name: 'Delta',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'Delta purchases'
    }
  ]
};
