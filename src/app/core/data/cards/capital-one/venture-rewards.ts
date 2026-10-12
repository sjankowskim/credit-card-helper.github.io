import type { Card } from '../../../models/card.model';

export const VENTURE_REWARDS: Card = {
  id: 'capital-one-venture-rewards',
  name: 'Capital One Venture Rewards',
  issuer: 'Capital One',
  rewardsProgram: 'Capital One Rewards',
  rewardsCurrency: 'Capital One Miles',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 95,
  isBusiness: false,
  creditNeeded: 'excellent',
  baseRewardRate: 2.0,
  termsCheckedOn: '2026-10-11',
  defaultSignUpBonus: { amount: 75000, currency: 'Capital One Miles', spendRequired: 4000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'venture-travel-portal',
      name: 'Hotels & Rental Cars',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels', 'car-rentals'],
      onlyWhen: 'Booked through Capital One Travel'
    }
  ],
  benefits: [
    {
      id: 'venture-travel-stays-credit',
      name: 'Capital One Travel Stays credit',
      amount: 300,
      period: 'ONE_TIME',
      resetBasis: 'CARDMEMBER_YEAR',
      note: 'One time: hotels and vacation rentals through Capital One Travel, within a year of opening'
    }
  ]
};
