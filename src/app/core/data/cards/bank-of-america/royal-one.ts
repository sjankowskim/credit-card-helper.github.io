import type { Card } from '../../../models/card.model';

export const ROYAL_ONE: Card = {
  id: 'bofa-royal-one',
  name: 'Royal ONE Visa Signature',
  issuer: 'Bank of America',
  rewardsProgram: 'Store Rewards',
  rewardsCurrency: 'Royal ONE Points',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'good',
  networkTier: 'Visa Signature',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: 'Points are for Royal Caribbean, Celebrity, and Silversea cruises.',
  defaultSignUpBonus: { amount: 30000, currency: 'Royal ONE Points', spendRequired: 1500, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'royal-one-2x',
      name: 'Grocery, Gas & EV Charging',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['grocery-stores', 'gas-stations', 'ev-charging']
    },
    {
      id: 'royal-one-cruises',
      name: 'Cruises',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['travel'],
      onlyWhen: 'Royal Caribbean, Celebrity, and Silversea purchases'
    }
  ]
};
