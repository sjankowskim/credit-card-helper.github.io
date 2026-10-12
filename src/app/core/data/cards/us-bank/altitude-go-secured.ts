import type { Card } from '../../../models/card.model';

export const ALTITUDE_GO_SECURED: Card = {
  id: 'us-bank-altitude-go-secured',
  name: 'U.S. Bank Altitude Go Secured',
  issuer: 'US Bank',
  rewardsProgram: 'U.S. Bank Rewards',
  rewardsCurrency: 'Altitude Points',
  network: 'VISA',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'rebuilding',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: 'A secured card for building credit; requires a $300 to $5,000 refundable deposit.',
  rewardTiers: [
    {
      id: 'altitude-go-secured-2x',
      name: 'Streaming, Grocery, Gas & EV',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['streaming', 'grocery-stores', 'gas-stations', 'ev-charging']
    },
    {
      id: 'altitude-go-secured-dining',
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
      id: 'altitude-go-secured-streaming',
      name: 'Streaming credit',
      amount: 15,
      period: 'ANNUAL',
      resetBasis: 'CARDMEMBER_YEAR',
      note: 'After 11 consecutive months of streaming purchases like Netflix or Spotify'
    }
  ]
};
