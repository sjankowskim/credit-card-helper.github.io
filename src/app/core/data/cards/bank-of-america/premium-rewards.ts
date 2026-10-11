import type { Card } from '../../../models/card.model';

export const PREMIUM_REWARDS: Card = {
  id: 'bofa-premium-rewards',
  name: 'Bank of America Premium Rewards',
  issuer: 'Bank of America',
  rewardsProgram: 'Bank of America Rewards',
  rewardsCurrency: 'Bank of America Points',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 95,
  isBusiness: false,
  baseRewardRate: 1.5,
  termsCheckedOn: '2026-10-11',
  defaultSignUpBonus: { amount: 60000, currency: 'Bank of America Points', spendRequired: 4000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'premium-rewards-travel-dining',
      name: 'Travel & Dining',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['travel', 'dining'],
      note: 'Preferred Rewards members earn up to 3.5x.'
    }
  ],
  benefits: [
    {
      id: 'premium-rewards-airline-credit',
      name: 'Airline incidental credit',
      amount: 100,
      period: 'ANNUAL',
      resetBasis: 'CALENDAR',
      note: 'Seat upgrades, baggage fees, in-flight purchases, and similar'
    }
  ]
};
