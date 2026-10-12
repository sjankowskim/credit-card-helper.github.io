import type { Card } from '../../../models/card.model';

export const ONE_KEY_PLUS: Card = {
  id: 'wells-fargo-one-key-plus',
  name: 'One Key+ Card',
  issuer: 'Wells Fargo',
  rewardsProgram: 'Store Rewards',
  rewardsCurrency: 'Cashback',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 99,
  isBusiness: false,
  creditNeeded: 'good',
  baseRewardRate: 2.0,
  termsCheckedOn: '2026-10-11',
  note: 'Rewards are OneKeyCash for Expedia, Hotels.com, and Vrbo. Automatic One Key Gold status.',
  defaultSignUpBonus: { amount: 350, currency: 'Cashback', spendRequired: 3000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'one-key-plus-3pct',
      name: 'Gas, Grocery & Dining',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['gas-stations', 'grocery-stores', 'dining']
    },
    {
      id: 'one-key-plus-expedia',
      name: 'Expedia, Hotels.com & Vrbo',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['travel'],
      onlyWhen: 'Expedia, Hotels.com, and Vrbo bookings'
    }
  ]
};
