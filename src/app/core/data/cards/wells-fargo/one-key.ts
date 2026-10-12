import type { Card } from '../../../models/card.model';

export const ONE_KEY: Card = {
  id: 'wells-fargo-one-key',
  name: 'One Key Card',
  issuer: 'Wells Fargo',
  rewardsProgram: 'Store Rewards',
  rewardsCurrency: 'Cashback',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 1.5,
  termsCheckedOn: '2026-10-11',
  note: 'Rewards are OneKeyCash for Expedia, Hotels.com, and Vrbo. Automatic One Key Silver status.',
  defaultSignUpBonus: { amount: 250, currency: 'Cashback', spendRequired: 2000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'one-key-3pct',
      name: 'Gas, Grocery & Dining',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['gas-stations', 'grocery-stores', 'dining']
    },
    {
      id: 'one-key-expedia',
      name: 'Expedia, Hotels.com & Vrbo',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['travel'],
      onlyWhen: 'Expedia, Hotels.com, and Vrbo bookings'
    }
  ]
};
