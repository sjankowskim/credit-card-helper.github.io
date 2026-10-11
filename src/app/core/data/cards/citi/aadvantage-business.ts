import type { Card } from '../../../models/card.model';

export const AADVANTAGE_BUSINESS: Card = {
  id: 'citi-aadvantage-business',
  name: 'Citi / AAdvantage Business World Elite Mastercard',
  issuer: 'Citi',
  rewardsProgram: 'American Airlines AAdvantage',
  rewardsCurrency: 'AAdvantage Miles',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: false,
  // Waived the first year
  annualFee: 99,
  isBusiness: true,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  defaultSignUpBonus: { amount: 65000, currency: 'AAdvantage Miles', spendRequired: 4000, windowMonths: 4 },
  rewardTiers: [
    {
      id: 'aa-business-2x',
      name: 'Telecom, Cable, Car Rentals & Gas',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['phone', 'internet-cable', 'car-rentals', 'gas-stations']
    },
    {
      id: 'aa-business-aa',
      name: 'American Airlines',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'Eligible American Airlines purchases'
    }
  ]
};
