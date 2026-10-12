import type { Card } from '../../../models/card.model';

export const VENTURE_X_BUSINESS: Card = {
  id: 'capital-one-venture-x-business',
  name: 'Capital One Venture X Business',
  issuer: 'Capital One',
  rewardsProgram: 'Capital One Rewards',
  rewardsCurrency: 'Capital One Miles',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: false,
  annualFee: 395,
  isBusiness: true,
  creditNeeded: 'excellent',
  baseRewardRate: 2.0,
  termsCheckedOn: '2026-10-11',
  note: 'Charge card: the balance is due in full each month.',
  defaultSignUpBonus: { amount: 150000, currency: 'Capital One Miles', spendRequired: 30000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'venture-x-business-hotels-cars',
      name: 'Hotels & Rental Cars',
      rewardRate: 10.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels', 'car-rentals'],
      onlyWhen: 'Booked through Capital One Business Travel'
    },
    {
      id: 'venture-x-business-flights',
      name: 'Flights',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'Booked through Capital One Business Travel'
    }
  ],
  benefits: [
    {
      id: 'venture-x-business-travel-credit',
      name: 'Capital One Business Travel credit',
      amount: 300,
      period: 'ANNUAL',
      resetBasis: 'CARDMEMBER_YEAR',
      note: 'Bookings through Capital One Business Travel'
    },
    {
      id: 'venture-x-business-anniversary-bonus',
      name: 'Anniversary bonus',
      amount: 100,
      period: 'ANNUAL',
      resetBasis: 'CARDMEMBER_YEAR',
      note: 'Paid as 10,000 bonus miles each account anniversary'
    }
  ]
};
