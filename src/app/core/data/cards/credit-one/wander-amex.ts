import type { Card } from '../../../models/card.model';

export const WANDER_AMEX: Card = {
  id: 'credit-one-wander-amex',
  name: 'Credit One Bank Wander American Express',
  issuer: 'Credit One',
  rewardsProgram: 'Credit One Cash Back',
  rewardsCurrency: 'Cashback',
  network: 'AMEX',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 95,
  isBusiness: false,
  creditNeeded: 'fair',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: 'Rewards are points worth 1 cent each, redeemable for statement credits, gift cards, and travel.',
  rewardTiers: [
    {
      id: 'wander-5pct',
      name: 'Travel, Dining & Gas',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['travel', 'dining', 'gas-stations']
    },
    {
      id: 'wander-travel-portal',
      name: 'Hotels & Car Rentals',
      rewardRate: 10.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels', 'car-rentals'],
      onlyWhen: 'Booked through the Credit One Bank travel partner'
    }
  ]
};
