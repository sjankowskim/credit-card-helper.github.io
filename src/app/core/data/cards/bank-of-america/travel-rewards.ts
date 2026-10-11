import type { Card } from '../../../models/card.model';

export const TRAVEL_REWARDS: Card = {
  id: 'bofa-travel-rewards',
  name: 'Bank of America Travel Rewards',
  issuer: 'Bank of America',
  rewardsProgram: 'Bank of America Rewards',
  rewardsCurrency: 'Bank of America Points',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 1.5,
  termsCheckedOn: '2026-10-11',
  note: 'Bank of America Preferred Rewards members earn 25%-75% more.',
  defaultSignUpBonus: { amount: 25000, currency: 'Bank of America Points', spendRequired: 1000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'travel-rewards-travel-center',
      name: 'Travel',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['travel'],
      onlyWhen: 'Booked through the Bank of America Travel Center'
    }
  ]
};
