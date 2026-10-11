import type { Card } from '../../../models/card.model';

export const VENTURE_BUSINESS: Card = {
  id: 'capital-one-venture-business',
  name: 'Capital One Venture Business',
  issuer: 'Capital One',
  rewardsProgram: 'Capital One Rewards',
  rewardsCurrency: 'Capital One Miles',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: false,
  annualFee: 95,
  isBusiness: true,
  baseRewardRate: 2.0,
  termsCheckedOn: '2026-10-11',
  defaultSignUpBonus: { amount: 100000, currency: 'Capital One Miles', spendRequired: 10000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'venture-business-travel-portal',
      name: 'Hotels & Rental Cars',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels', 'car-rentals'],
      onlyWhen: 'Booked through Capital One Business Travel'
    }
  ],
  benefits: [
    {
      id: 'venture-business-travel-credit',
      name: 'Capital One Business Travel credit',
      amount: 50,
      period: 'ANNUAL',
      resetBasis: 'CARDMEMBER_YEAR',
      note: 'Bookings through Capital One Business Travel'
    },
    {
      id: 'venture-business-software-credit',
      name: 'Advertising & software credit',
      amount: 50,
      period: 'ANNUAL',
      resetBasis: 'CARDMEMBER_YEAR',
      note: 'Qualifying advertising or software merchants'
    }
  ]
};
