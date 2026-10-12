import type { Card } from '../../../models/card.model';

export const IHG_ONE_REWARDS_PREMIER_SELECT: Card = {
  id: 'chase-ihg-one-rewards-premier-select',
  name: 'IHG One Rewards Premier Select',
  issuer: 'Chase',
  rewardsProgram: 'IHG One Rewards',
  rewardsCurrency: 'IHG Points',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 350,
  isBusiness: false,
  baseRewardRate: 3.0,
  termsCheckedOn: '2026-10-11',
  note: 'Free night (up to 60,000 points) each anniversary, plus another after $40,000 spend in a calendar year. Platinum Elite status and 20 Elite Night Credits each year. Global Entry, TSA PreCheck, or NEXUS credit up to $120 every 4 years.',
  defaultSignUpBonus: { amount: 200000, currency: 'IHG Points', spendRequired: 5000, windowMonths: 3 },
  referralCapPerYear: 50000,
  rewardTiers: [
    {
      id: 'ihg-premier-select-6x',
      name: 'Dining & Travel',
      rewardRate: 6.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining', 'travel', 'rideshare']
    },
    {
      id: 'ihg-premier-select-ihg',
      name: 'IHG Hotels',
      rewardRate: 12.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels'],
      onlyWhen: 'IHG Hotels & Resorts'
    }
  ],
  benefits: [
    {
      id: 'ihg-premier-select-food-beverage',
      name: 'IHG food and beverage reward',
      amount: 75,
      period: 'QUARTERLY',
      resetBasis: 'CALENDAR',
      note: 'Voucher for food and drinks at IHG hotels'
    },
    {
      id: 'ihg-premier-select-airline-credit',
      name: 'Airline credit',
      amount: 200,
      period: 'ANNUAL',
      resetBasis: 'CALENDAR',
      note: 'After $250 on flights bought directly from airlines; through 12/31/2027'
    },
    {
      id: 'ihg-premier-select-united-travelbank',
      name: 'United TravelBank cash',
      amount: 50,
      period: 'ANNUAL',
      resetBasis: 'CALENDAR',
      note: 'After linking the card to your MileagePlus account'
    },
    {
      id: 'ihg-premier-select-instacart',
      name: 'Instacart credit',
      amount: 10,
      period: 'MONTHLY',
      resetBasis: 'CALENDAR',
      note: 'Through 12/31/2027'
    }
  ]
};
