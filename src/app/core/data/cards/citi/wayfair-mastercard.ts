import type { Card } from '../../../models/card.model';

// The welcome offer is a discount on approval with no spend requirement, so no default sign-up bonus is listed
export const WAYFAIR_MASTERCARD: Card = {
  id: 'citi-wayfair-mastercard',
  name: 'Wayfair Mastercard',
  issuer: 'Citi',
  rewardsProgram: 'Store Rewards',
  rewardsCurrency: 'Cashback',
  network: 'MASTERCARD',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: 'Rewards are Wayfair rewards. On qualifying Wayfair items you can take special financing with 5% back instead.',
  rewardTiers: [
    {
      id: 'wayfair-mastercard-online',
      name: 'Online Purchases',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['online-retail'],
      note: 'Qualifying online purchases.'
    },
    {
      id: 'wayfair-mastercard-grocery',
      name: 'Grocery Stores',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['grocery-stores']
    },
    {
      id: 'wayfair-mastercard-wayfair',
      name: 'Wayfair',
      rewardRate: 7.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['furniture-stores'],
      onlyWhen: 'Qualifying items from the Wayfair family of brands'
    }
  ]
};
