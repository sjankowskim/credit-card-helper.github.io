import type { Card } from '../../../models/card.model';

export const AADVANTAGE_PLATINUM_SELECT: Card = {
  id: 'citi-aadvantage-platinum-select',
  name: 'Citi AAdvantage Platinum Select',
  issuer: 'Citi',
  rewardsProgram: 'American Airlines AAdvantage',
  rewardsCurrency: 'AAdvantage Miles',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  // Waived the first year
  annualFee: 99,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  defaultSignUpBonus: { amount: 80000, currency: 'AAdvantage Miles', spendRequired: 3500, windowMonths: 4 },
  rewardTiers: [
    {
      id: 'aa-platinum-dining-gas',
      name: 'Restaurants & Gas Stations',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining', 'gas-stations']
    },
    {
      id: 'aa-platinum-aa',
      name: 'American Airlines',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'Eligible American Airlines purchases'
    }
  ]
};
