import type { Card } from '../../../models/card.model';

export const STRATA_PREMIER: Card = {
  id: 'citi-strata-premier',
  name: 'Citi Strata Premier',
  issuer: 'Citi',
  rewardsProgram: 'Citi ThankYou',
  rewardsCurrency: 'ThankYou Points',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 95,
  isBusiness: false,
  creditNeeded: 'excellent',
  networkTier: 'World Elite Mastercard',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  defaultSignUpBonus: { amount: 60000, currency: 'ThankYou Points', spendRequired: 4000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'strata-premier-3x',
      name: 'Air Travel, Hotels, Restaurants, Supermarkets, Gas & EV',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare', 'hotels', 'dining', 'grocery-stores', 'gas-stations', 'ev-charging']
    },
    {
      id: 'strata-premier-travel-portal',
      name: 'Hotels, Car Rentals & Attractions',
      rewardRate: 10.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels', 'car-rentals'],
      onlyWhen: 'Booked through Citi Travel'
    }
  ],
  benefits: [
    {
      id: 'strata-premier-hotel-benefit',
      name: 'Hotel benefit',
      amount: 100,
      period: 'ANNUAL',
      resetBasis: 'CALENDAR',
      note: '$100 off one hotel stay of $500+ (before taxes and fees) booked through Citi Travel'
    }
  ]
};
