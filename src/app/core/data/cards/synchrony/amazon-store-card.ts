import type { Card } from '../../../models/card.model';

// The welcome offer is an Amazon gift card on approval, so no default sign-up bonus is listed
export const AMAZON_STORE_CARD: Card = {
  id: 'synchrony-amazon-store-card',
  name: 'Amazon Store Card',
  issuer: 'Synchrony',
  rewardsProgram: 'Store Rewards',
  rewardsCurrency: 'Cashback',
  network: 'STORE',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 0.0,
  termsCheckedOn: '2026-10-11',
  note: 'Only works at Amazon. The 5% needs Prime; you can take 0% APR equal monthly payments instead of rewards.',
  rewardTiers: [
    {
      id: 'amazon-store-card-amazon',
      name: 'Amazon & Whole Foods',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['online-retail', 'grocery-stores'],
      onlyWhen: 'Amazon.com and Whole Foods Market, with a Prime membership'
    }
  ]
};
