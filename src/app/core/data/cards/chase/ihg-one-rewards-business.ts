import type { Card } from '../../../models/card.model';

export const IHG_ONE_REWARDS_BUSINESS: Card = {
  id: 'chase-ihg-one-rewards-business',
  name: 'IHG One Rewards Business',
  issuer: 'Chase',
  rewardsProgram: 'IHG One Rewards',
  rewardsCurrency: 'IHG Points',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: false,
  annualFee: 200,
  isBusiness: true,
  baseRewardRate: 3.0,
  termsCheckedOn: '2026-10-11',
  note: 'Free night each anniversary. Platinum Elite status. 20,000 bonus points and 5 Elite Night Credits after $25,000 spend in a calendar year. Global Entry, TSA PreCheck, or NEXUS credit up to $120 every 4 years.',
  defaultSignUpBonus: { amount: 190000, currency: 'IHG Points', spendRequired: 5000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'ihg-business-5x',
      name: 'Airfare, Car Rentals, Dining, Advertising & Gas',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare', 'car-rentals', 'dining', 'advertising', 'gas-stations'],
      note: 'Flights must be booked directly with the airline; select advertising only.'
    },
    {
      id: 'ihg-business-ihg',
      name: 'IHG Hotels',
      rewardRate: 10.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels'],
      onlyWhen: 'IHG Hotels & Resorts'
    }
  ],
  benefits: [
    {
      id: 'ihg-business-food-beverage',
      name: 'IHG food and beverage reward',
      amount: 25,
      period: 'QUARTERLY',
      resetBasis: 'CALENDAR',
      note: 'Voucher for food and drinks at IHG hotels'
    },
    {
      id: 'ihg-business-airline-credit',
      name: 'Airline credit',
      amount: 100,
      period: 'ANNUAL',
      resetBasis: 'CALENDAR',
      note: 'After $250 on flights bought directly from airlines; through 12/31/2027'
    },
    {
      id: 'ihg-business-expensify',
      name: 'Expensify credit',
      amount: 100,
      period: 'ANNUAL',
      resetBasis: 'CALENDAR'
    },
    {
      id: 'ihg-business-instacart',
      name: 'Instacart credit',
      amount: 10,
      period: 'MONTHLY',
      resetBasis: 'CALENDAR',
      note: 'Through 12/31/2027'
    }
  ]
};
