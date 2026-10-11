import type { Card } from '../../../models/card.model';

// Amex welcome offers vary by applicant, so no default sign-up bonus is listed.
export const GOLD: Card = {
  id: 'amex-gold',
  name: 'Gold',
  issuer: 'American Express',
  rewardsProgram: 'Amex Membership Rewards',
  rewardsCurrency: 'Membership Rewards',
  network: 'AMEX',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 325,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  rewardTiers: [
    {
      id: 'amex-gold-dining',
      name: 'Restaurants',
      rewardRate: 4.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining'],
      spendingCap: { amount: 50000, period: 'ANNUAL' },
      note: 'Worldwide, including takeout and delivery.'
    },
    {
      id: 'amex-gold-supermarkets',
      name: 'U.S. Supermarkets',
      rewardRate: 4.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['grocery-stores'],
      spendingCap: { amount: 25000, period: 'ANNUAL' }
    },
    {
      id: 'amex-gold-flights',
      name: 'Flights',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      note: 'Booked directly with the airline or on AmexTravel.com.'
    }
  ],
  benefits: [
    {
      id: 'amex-gold-dining-credit',
      name: 'Dining credit',
      amount: 10,
      period: 'MONTHLY',
      resetBasis: 'CALENDAR',
      note: 'Grubhub, Five Guys, The Cheesecake Factory, and other partners; enrollment required'
    },
    {
      id: 'amex-gold-uber-cash',
      name: 'Uber Cash',
      amount: 10,
      period: 'MONTHLY',
      resetBasis: 'CALENDAR',
      note: 'U.S. Uber rides and Uber Eats'
    },
    {
      id: 'amex-gold-resy',
      name: 'Resy credit',
      amount: 50,
      period: 'SEMIANNUAL',
      resetBasis: 'CALENDAR',
      note: 'U.S. Resy restaurants; enrollment required'
    },
    {
      id: 'amex-gold-dunkin',
      name: "Dunkin' credit",
      amount: 7,
      period: 'MONTHLY',
      resetBasis: 'CALENDAR',
      note: "U.S. Dunkin' locations; enrollment required"
    }
  ]
};
