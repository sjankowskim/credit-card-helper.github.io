import type { Card } from '../../../models/card.model';

export const ALTITUDE_GO: Card = {
  id: 'us-bank-altitude-go',
  name: 'U.S. Bank Altitude Go',
  issuer: 'US Bank',
  rewardsProgram: 'U.S. Bank Rewards',
  rewardsCurrency: 'Altitude Points',
  network: 'VISA',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  defaultSignUpBonus: { amount: 20000, currency: 'Altitude Points', spendRequired: 1000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'altitude-go-2x',
      name: 'Streaming, Grocery, Gas & EV',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['streaming', 'grocery-stores', 'gas-stations', 'ev-charging']
    },
    {
      id: 'altitude-go-dining',
      name: 'Dining',
      rewardRate: 4.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining'],
      spendingCap: { amount: 2000, period: 'QUARTERLY' },
      note: 'Includes takeout and restaurant delivery.'
    }
  ],
  benefits: [
    {
      id: 'altitude-go-streaming',
      name: 'Streaming credit',
      amount: 15,
      period: 'ANNUAL',
      resetBasis: 'CARDMEMBER_YEAR',
      note: 'After 11 consecutive months of streaming purchases like Netflix or Spotify'
    }
  ]
};
