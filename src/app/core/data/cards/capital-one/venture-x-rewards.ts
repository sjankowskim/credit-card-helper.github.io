import type { Card } from '../../../models/card.model';

export const VENTURE_X_REWARDS: Card = {
  id: 'capital-one-venture-x-rewards',
  name: 'Capital One Venture X Rewards',
  issuer: 'Capital One',
  rewardsProgram: 'Capital One Rewards',
  rewardsCurrency: 'Capital One Miles',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 395,
  isBusiness: false,
  creditNeeded: 'excellent',
  baseRewardRate: 2.0,
  termsCheckedOn: '2026-10-11',
  defaultSignUpBonus: { amount: 75000, currency: 'Capital One Miles', spendRequired: 4000, windowMonths: 3 },
  referralCapPerYear: 100000,
  rewardTiers: [
    {
      id: 'venture-x-hotels-cars-portal',
      name: 'Hotels & Rental Cars',
      rewardRate: 10.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels', 'car-rentals'],
      onlyWhen: 'Booked through Capital One Travel'
    },
    {
      id: 'venture-x-flights-portal',
      name: 'Flights & Vacation Rentals',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'Booked through Capital One Travel'
    }
  ],
  benefits: [
    {
      id: 'venture-x-travel-credit',
      name: 'Capital One Travel credit',
      amount: 300,
      period: 'ANNUAL',
      resetBasis: 'CARDMEMBER_YEAR',
      note: 'Bookings made through Capital One Travel'
    },
    {
      id: 'venture-x-anniversary-bonus',
      name: 'Anniversary bonus',
      amount: 100,
      period: 'ANNUAL',
      resetBasis: 'CARDMEMBER_YEAR',
      note: 'Paid as 10,000 bonus miles each account anniversary'
    }
  ]
};
