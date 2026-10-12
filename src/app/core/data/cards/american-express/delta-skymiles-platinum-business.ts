import type { Card } from '../../../models/card.model';

// Amex welcome offers vary by applicant, so no default sign-up bonus is listed.
export const DELTA_SKYMILES_PLATINUM_BUSINESS: Card = {
  id: 'amex-delta-skymiles-platinum-business',
  name: 'Delta SkyMiles Platinum Business American Express Card',
  issuer: 'American Express',
  rewardsProgram: 'Delta SkyMiles',
  rewardsCurrency: 'SkyMiles',
  network: 'AMEX',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: false,
  annualFee: 350,
  isBusiness: true,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  rewardTiers: [
    {
      id: 'delta-platinum-business-hotels',
      name: 'Hotels',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels'],
      note: 'Booked directly with the hotel.'
    },
    {
      id: 'delta-platinum-business-delta',
      name: 'Delta',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'Delta purchases'
    }
  ]
};
