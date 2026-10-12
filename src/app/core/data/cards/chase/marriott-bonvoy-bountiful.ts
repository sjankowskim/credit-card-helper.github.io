import type { Card } from '../../../models/card.model';

export const MARRIOTT_BONVOY_BOUNTIFUL: Card = {
  id: 'chase-marriott-bonvoy-bountiful',
  name: 'Marriott Bonvoy Bountiful',
  issuer: 'Chase',
  rewardsProgram: 'Marriott Bonvoy',
  rewardsCurrency: 'Marriott Bonvoy Points',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 250,
  isBusiness: false,
  baseRewardRate: 2.0,
  termsCheckedOn: '2026-10-11',
  note: 'Free Night Award (up to 50,000 points) after $15,000 spend in a calendar year. Gold Elite status and 15 Elite Night Credits each year.',
  defaultSignUpBonus: { amount: 85000, currency: 'Marriott Bonvoy Points', spendRequired: 4000, windowMonths: 3 },
  referralCapPerYear: 200000,
  rewardTiers: [
    {
      id: 'bountiful-4x',
      name: 'Grocery Stores & Dining',
      rewardRate: 4.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['grocery-stores', 'dining'],
      spendingCap: { amount: 15000, period: 'ANNUAL' },
      note: 'The $15,000 cap is combined across both categories.'
    },
    {
      id: 'bountiful-marriott',
      name: 'Marriott',
      rewardRate: 6.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels'],
      onlyWhen: 'Hotels participating in Marriott Bonvoy'
    }
  ]
};
