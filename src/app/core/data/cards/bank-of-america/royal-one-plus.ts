import type { Card } from '../../../models/card.model';

export const ROYAL_ONE_PLUS: Card = {
  id: 'bofa-royal-one-plus',
  name: 'Royal ONE Plus Visa Signature',
  issuer: 'Bank of America',
  rewardsProgram: 'Store Rewards',
  rewardsCurrency: 'Royal ONE Points',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 99,
  isBusiness: false,
  creditNeeded: 'good',
  networkTier: 'Visa Signature',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: 'Points are for Royal Caribbean, Celebrity, and Silversea cruises.',
  defaultSignUpBonus: { amount: 60000, currency: 'Royal ONE Points', spendRequired: 2500, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'royal-one-plus-2x',
      name: 'Airfare, Hotels, Dining, Grocery, Gas & EV',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: [
        'airfare',
        'hotels',
        'dining',
        'grocery-stores',
        'gas-stations',
        'ev-charging'
      ]
    },
    {
      id: 'royal-one-plus-cruises',
      name: 'Cruises',
      rewardRate: 4.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['travel'],
      onlyWhen: 'Royal Caribbean, Celebrity, and Silversea purchases'
    }
  ]
};
