import type { Card } from '../../../models/card.model';

// The 120,000-point offer is split (90,000 after $6,000 and paying the fee in 120 days + 30,000 after $750 at Wyndham in 180 days); the default bonus is the first part.
export const WYNDHAM_REWARDS_EARNER_PREMIER: Card = {
  id: 'barclays-wyndham-rewards-earner-premier',
  name: 'Wyndham Rewards Earner Premier Card',
  issuer: 'Barclays',
  rewardsProgram: 'Wyndham Rewards',
  rewardsCurrency: 'Wyndham Rewards Points',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 395,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: '30,000 bonus points each anniversary year after paying the annual fee. Diamond status. Global Entry/TSA PreCheck credit up to $120 every 4 years.',
  defaultSignUpBonus: { amount: 90000, currency: 'Wyndham Rewards Points', spendRequired: 6000, windowMonths: 4 },
  rewardTiers: [
    {
      id: 'wyndham-premier-4x',
      name: 'Dining, Grocery & Travel',
      rewardRate: 4.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining', 'grocery-stores', 'travel'],
      note: 'Grocery excludes Target and Walmart.'
    },
    {
      id: 'wyndham-premier-wyndham',
      name: 'Hotels by Wyndham',
      rewardRate: 8.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels'],
      onlyWhen: 'Hotels by Wyndham'
    }
  ],
  benefits: [
    {
      id: 'wyndham-premier-hotel-credit',
      name: 'Wyndham hotel credit',
      amount: 100,
      period: 'ANNUAL',
      resetBasis: 'CALENDAR',
      note: 'After $100+ at Wyndham, Wyndham Grand, Dolce, Trademark, or Registry'
    },
    {
      id: 'wyndham-premier-meal-delivery',
      name: 'Meal delivery credit',
      amount: 10,
      period: 'MONTHLY',
      resetBasis: 'CALENDAR'
    },
    {
      id: 'wyndham-premier-streaming',
      name: 'Streaming credit',
      amount: 100,
      period: 'ANNUAL',
      resetBasis: 'CALENDAR'
    },
    {
      id: 'wyndham-premier-wholesale-club',
      name: 'Wholesale club membership credit',
      amount: 65,
      period: 'ANNUAL',
      resetBasis: 'CALENDAR'
    }
  ]
};
