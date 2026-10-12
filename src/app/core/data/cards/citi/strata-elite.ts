import type { Card } from '../../../models/card.model';

export const STRATA_ELITE: Card = {
  id: 'citi-strata-elite',
  name: 'Citi Strata Elite',
  issuer: 'Citi',
  rewardsProgram: 'Citi ThankYou',
  rewardsCurrency: 'ThankYou Points',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 595,
  isBusiness: false,
  baseRewardRate: 1.5,
  termsCheckedOn: '2026-10-11',
  note: 'Priority Pass Select and 4 Admirals Club passes a year. Global Entry/TSA PreCheck credit up to $120 every 4 years.',
  defaultSignUpBonus: { amount: 75000, currency: 'ThankYou Points', spendRequired: 6000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'strata-elite-dining',
      name: 'Restaurants',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining'],
      note: 'Citi Nights (Friday and Saturday, 6 PM to 6 AM ET) earn 6x.'
    },
    {
      id: 'strata-elite-air-portal',
      name: 'Air Travel',
      rewardRate: 6.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'Booked through Citi Travel'
    },
    {
      id: 'strata-elite-travel-portal',
      name: 'Hotels, Car Rentals & Attractions',
      rewardRate: 12.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels', 'car-rentals'],
      onlyWhen: 'Booked through Citi Travel'
    }
  ],
  benefits: [
    {
      id: 'strata-elite-hotel-benefit',
      name: 'Hotel benefit',
      amount: 300,
      period: 'ANNUAL',
      resetBasis: 'CALENDAR',
      note: '$300 off one hotel stay of 2+ nights booked through Citi Travel'
    },
    {
      id: 'strata-elite-splurge',
      name: 'Splurge Credit',
      amount: 200,
      period: 'ANNUAL',
      resetBasis: 'CALENDAR',
      note: 'Up to 2 of: 1stDibs, American Airlines, Best Buy, Future Personal Training, Live Nation'
    },
    {
      id: 'strata-elite-blacklane',
      name: 'Blacklane credit',
      amount: 100,
      period: 'SEMIANNUAL',
      resetBasis: 'CALENDAR'
    }
  ]
};
