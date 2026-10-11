import type { Card } from '../../../models/card.model';

export const PREMIUM_REWARDS_ELITE: Card = {
  id: 'bofa-premium-rewards-elite',
  name: 'Bank of America Premium Rewards Elite',
  issuer: 'Bank of America',
  rewardsProgram: 'Bank of America Rewards',
  rewardsCurrency: 'Bank of America Points',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 550,
  isBusiness: false,
  baseRewardRate: 1.5,
  termsCheckedOn: '2026-10-11',
  note: 'Bank of America Preferred Rewards members earn 25%-75% more. Includes 20% off airfare paid with points.',
  defaultSignUpBonus: { amount: 75000, currency: 'Bank of America Points', spendRequired: 5000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'premium-rewards-elite-travel-dining',
      name: 'Travel & Dining',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['travel', 'dining']
    }
  ],
  benefits: [
    {
      id: 'premium-rewards-elite-airline-credit',
      name: 'Airline incidental credit',
      amount: 300,
      period: 'ANNUAL',
      resetBasis: 'CALENDAR',
      note: 'Seat upgrades, baggage fees, in-flight purchases, and similar'
    },
    {
      id: 'premium-rewards-elite-lifestyle-credit',
      name: 'Lifestyle credit',
      amount: 150,
      period: 'ANNUAL',
      resetBasis: 'CALENDAR',
      note: 'Streaming, food delivery, fitness, and rideshare'
    }
  ]
};
