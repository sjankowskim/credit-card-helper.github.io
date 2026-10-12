import type { Card } from '../../../models/card.model';

export const IHG_ONE_REWARDS_PREMIER: Card = {
  id: 'chase-ihg-one-rewards-premier',
  name: 'IHG One Rewards Premier',
  issuer: 'Chase',
  rewardsProgram: 'IHG One Rewards',
  rewardsCurrency: 'IHG Points',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 150,
  isBusiness: false,
  baseRewardRate: 3.0,
  termsCheckedOn: '2026-10-11',
  note: 'Free night (up to 50,000 points) each anniversary. Gold Elite status and 15 Elite Night Credits each year. Global Entry, TSA PreCheck, or NEXUS credit up to $120 every 4 years.',
  defaultSignUpBonus: { amount: 180000, currency: 'IHG Points', spendRequired: 3000, windowMonths: 3 },
  referralCapPerYear: 50000,
  rewardTiers: [
    {
      id: 'ihg-premier-5x',
      name: 'Airfare, Car Rentals, Dining, Gas & Grocery Stores',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare', 'car-rentals', 'dining', 'gas-stations', 'grocery-stores'],
      note: 'Flights must be booked directly with the airline.'
    },
    {
      id: 'ihg-premier-ihg',
      name: 'IHG Hotels',
      rewardRate: 10.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels'],
      onlyWhen: 'IHG Hotels & Resorts'
    }
  ],
  benefits: [
    {
      id: 'ihg-premier-airline-credit',
      name: 'Airline credit',
      amount: 100,
      period: 'ANNUAL',
      resetBasis: 'CALENDAR',
      note: 'After $250 on flights bought directly from airlines; through 12/31/2027'
    },
    {
      id: 'ihg-premier-instacart',
      name: 'Instacart credit',
      amount: 10,
      period: 'MONTHLY',
      resetBasis: 'CALENDAR',
      note: 'Requires Instacart+; through 12/31/2027'
    }
  ]
};
