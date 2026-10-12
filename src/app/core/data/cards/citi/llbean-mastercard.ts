import type { Card } from '../../../models/card.model';

// The welcome offer is 20% off at L.L.Bean on approval, so no default sign-up bonus is listed
export const LLBEAN_MASTERCARD: Card = {
  id: 'citi-llbean-mastercard',
  name: 'L.L.Bean Mastercard',
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
  note: 'Rewards are Bean Bucks ($1 each) for L.L.Bean purchases. Free shipping and returns at L.L.Bean.',
  rewardTiers: [
    {
      id: 'llbean-dining',
      name: 'Restaurants',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining']
    },
    {
      id: 'llbean-llbean',
      name: 'L.L.Bean',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['clothing-stores', 'sporting-goods-stores'],
      onlyWhen: 'L.L.Bean purchases'
    }
  ]
};
