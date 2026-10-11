import type { Card } from '../../../models/card.model';

export const SAPPHIRE_PREFERRED: Card = {
  id: 'chase-sapphire-preferred',
  name: 'Chase Sapphire Preferred',
  issuer: 'Chase',
  rewardsProgram: 'Chase Ultimate Rewards',
  rewardsCurrency: 'Ultimate Rewards',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 95,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  defaultSignUpBonus: { amount: 100000, currency: 'Ultimate Rewards', spendRequired: 5000, windowMonths: 3 },
  referralCapPerYear: 100000,
  rewardTiers: [
    {
      id: 'sapphire-preferred-3x',
      name: 'Dining, Streaming, Gas & EV Charging',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining', 'streaming', 'gas-stations', 'ev-charging']
    },
    {
      id: 'sapphire-preferred-travel',
      name: 'Other Travel',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['travel']
    },
    {
      id: 'sapphire-preferred-online-grocery',
      name: 'Online Grocery',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['grocery-stores'],
      onlyWhen: 'Online grocery orders (excludes Walmart, Target, and wholesale clubs)'
    },
    {
      id: 'sapphire-preferred-vacation-homes',
      name: 'Vacation Homes',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels'],
      onlyWhen: 'Vacation homes from top brands like Airbnb and Vrbo'
    },
    {
      id: 'sapphire-preferred-travel-portal',
      name: 'Chase Travel',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['travel'],
      onlyWhen: 'Booked through Chase Travel'
    }
  ],
  benefits: [
    {
      id: 'sapphire-preferred-hotel-credit',
      name: 'Chase Travel hotel credit',
      amount: 100,
      period: 'ANNUAL',
      resetBasis: 'CARDMEMBER_YEAR',
      note: 'Hotel stays booked through Chase Travel'
    }
  ]
};
