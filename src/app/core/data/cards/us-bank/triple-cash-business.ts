import type { Card } from '../../../models/card.model';

export const TRIPLE_CASH_BUSINESS: Card = {
  id: 'us-bank-triple-cash-business',
  name: 'U.S. Bank Triple Cash Rewards Business',
  issuer: 'US Bank',
  rewardsProgram: 'U.S. Bank Rewards',
  rewardsCurrency: 'Cashback',
  network: 'VISA',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: false,
  annualFee: 0,
  isBusiness: true,
  creditNeeded: 'good',
  networkTier: 'Visa Business',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  defaultSignUpBonus: { amount: 750, currency: 'Cashback', spendRequired: 6000, windowMonths: 6 },
  rewardTiers: [
    {
      id: 'triple-cash-3pct',
      name: 'Gas & EV, Office Supply, Phone & Restaurants',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['gas-stations', 'ev-charging', 'office-supply-stores', 'phone', 'dining'],
      note: 'Gas and EV purchases of $200 or less.'
    },
    {
      id: 'triple-cash-travel-portal',
      name: 'Prepaid Hotels & Car Rentals',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels', 'car-rentals'],
      onlyWhen: 'Booked through the U.S. Bank Travel Center'
    }
  ],
  benefits: [
    {
      id: 'triple-cash-software',
      name: 'Software credit',
      amount: 100,
      period: 'ANNUAL',
      resetBasis: 'CARDMEMBER_YEAR',
      note: 'Recurring software subscriptions like QuickBooks or FreshBooks'
    }
  ]
};
