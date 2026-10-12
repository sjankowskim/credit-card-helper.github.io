import type { Card } from '../../../models/card.model';

export const STRATA: Card = {
  id: 'citi-strata',
  name: 'Citi Strata',
  issuer: 'Citi',
  rewardsProgram: 'Citi ThankYou',
  rewardsCurrency: 'ThankYou Points',
  network: 'MASTERCARD',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  defaultSignUpBonus: { amount: 20000, currency: 'ThankYou Points', spendRequired: 1000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'strata-dining',
      name: 'Restaurants',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining']
    },
    {
      id: 'strata-3x',
      name: 'Supermarkets, Gas & EV, Transit',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['grocery-stores', 'gas-stations', 'ev-charging', 'transit'],
      note: 'Select transit only.'
    },
    {
      id: 'strata-self-select',
      name: 'Self-Select Category',
      rewardRate: 3.0,
      behavior: { type: 'USER_CHOICE', maxSelections: 1 },
      eligibleCategories: ['fitness', 'streaming', 'live-entertainment'],
      note: 'Also offered: cosmetic stores, barber shops, and hair salons, or pet supply stores. Select streaming services only.'
    },
    {
      id: 'strata-travel-portal',
      name: 'Hotels, Car Rentals & Attractions',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels', 'car-rentals'],
      onlyWhen: 'Booked through Citi Travel'
    }
  ]
};
