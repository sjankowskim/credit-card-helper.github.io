import type { Card } from '../../../models/card.model';

export const AADVANTAGE_MILEUP: Card = {
  id: 'citi-aadvantage-mileup',
  name: 'American Airlines AAdvantage MileUp Mastercard',
  issuer: 'Citi',
  rewardsProgram: 'American Airlines AAdvantage',
  rewardsCurrency: 'AAdvantage Miles',
  network: 'MASTERCARD',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  rewardTiers: [
    {
      id: 'mileup-grocery',
      name: 'Grocery Stores',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['grocery-stores'],
      note: 'Includes grocery delivery.'
    },
    {
      id: 'mileup-aa',
      name: 'American Airlines',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'Eligible American Airlines purchases'
    }
  ]
};
