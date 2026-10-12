import type { Card } from '../../../models/card.model';

// Amex welcome offers vary by applicant, so no default sign-up bonus is listed.
export const DELTA_SKYMILES_RESERVE_BUSINESS: Card = {
  id: 'amex-delta-skymiles-reserve-business',
  name: 'Delta SkyMiles Reserve Business American Express Card',
  issuer: 'American Express',
  rewardsProgram: 'Delta SkyMiles',
  rewardsCurrency: 'SkyMiles',
  network: 'AMEX',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: false,
  annualFee: 650,
  isBusiness: true,
  creditNeeded: 'excellent',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  rewardTiers: [
    {
      id: 'delta-reserve-business-1-5x',
      name: 'Transit, U.S. Shipping & Office Supply',
      rewardRate: 1.5,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['transit', 'shipping', 'office-supply-stores']
    },
    {
      id: 'delta-reserve-business-delta',
      name: 'Delta',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'Delta purchases'
    }
  ]
};
