import type { Card } from '../../../models/card.model';

// The welcome offer is a $50 Instacart credit on approval with no spend requirement, so no default sign-up bonus is listed
export const INSTACART: Card = {
  id: 'chase-instacart',
  name: 'Instacart Mastercard',
  issuer: 'Chase',
  rewardsProgram: 'Chase Cash Back',
  rewardsCurrency: 'Cashback',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  rewardTiers: [
    {
      id: 'instacart-2pct',
      name: 'Restaurants, Gas & Streaming',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining', 'gas-stations', 'streaming'],
      note: 'Select streaming services only.'
    },
    {
      id: 'instacart-instacart',
      name: 'Instacart',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['grocery-stores'],
      onlyWhen: 'Instacart purchases',
      spendingCap: { amount: 6000, period: 'ANNUAL' }
    },
    {
      id: 'instacart-travel-portal',
      name: 'Chase Travel',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['travel'],
      onlyWhen: 'Booked through Chase Travel'
    }
  ]
};
