import type { Card } from '../../../models/card.model';

// The welcome offer is a discount on approval with no spend requirement, so no default sign-up bonus is listed
export const WAYFAIR_CREDIT_CARD: Card = {
  id: 'citi-wayfair-credit-card',
  name: 'Wayfair Credit Card',
  issuer: 'Citi',
  rewardsProgram: 'Store Rewards',
  rewardsCurrency: 'Cashback',
  network: 'STORE',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'fair',
  baseRewardRate: 0.0,
  termsCheckedOn: '2026-10-11',
  note: 'Only works at the Wayfair family of brands (Wayfair, Joss & Main, AllModern, Birch Lane, Perigold). Rewards are Wayfair rewards. On qualifying Wayfair items you can take special financing with 5% back instead.',
  rewardTiers: [
    {
      id: 'wayfair-store-wayfair',
      name: 'Wayfair',
      rewardRate: 7.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['furniture-stores'],
      onlyWhen: 'Qualifying items from the Wayfair family of brands'
    }
  ]
};
