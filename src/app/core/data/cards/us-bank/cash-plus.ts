import type { Card } from '../../../models/card.model';

export const CASH_PLUS: Card = {
  id: 'us-bank-cash-plus',
  name: 'U.S. Bank Cash+',
  issuer: 'US Bank',
  rewardsProgram: 'U.S. Bank Rewards',
  rewardsCurrency: 'Cashback',
  network: 'VISA',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'good',
  networkTier: 'Visa Signature',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  defaultSignUpBonus: { amount: 200, currency: 'Cashback', spendRequired: 1000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'cash-plus-5pct',
      name: '5% Choice Categories',
      rewardRate: 5.0,
      behavior: { type: 'USER_CHOICE', maxSelections: 2 },
      eligibleCategories: [
        'fast-food',
        'internet-cable',
        'streaming',
        'phone',
        'utilities',
        'department-stores',
        'clothing-stores',
        'electronics-stores',
        'sporting-goods-stores',
        'furniture-stores',
        'movie-theaters',
        'fitness',
        'transit'
      ],
      spendingCap: { amount: 2000, period: 'QUARTERLY' },
      note: 'Pick 2 each quarter in the U.S. Bank app before it starts. There, "TV, internet & streaming" is one choice and "ground transportation" covers transit and rideshare.'
    },
    {
      id: 'cash-plus-2pct',
      name: '2% Everyday Category',
      rewardRate: 2.0,
      behavior: { type: 'USER_CHOICE', maxSelections: 1 },
      eligibleCategories: ['gas-stations', 'grocery-stores'],
      note: 'Gas includes EV charging. Grocery excludes wholesale clubs and supercenters.'
    },
    {
      id: 'cash-plus-travel-portal',
      name: 'Prepaid Hotels & Car Rentals',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels', 'car-rentals'],
      onlyWhen: 'Booked through the U.S. Bank Rewards Center'
    }
  ]
};
