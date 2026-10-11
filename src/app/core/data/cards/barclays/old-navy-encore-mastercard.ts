import type { Card } from '../../../models/card.model';

export const OLD_NAVY_ENCORE_MASTERCARD: Card = {
  id: 'barclays-old-navy-encore-mastercard',
  name: 'Old Navy Encore Mastercard',
  issuer: 'Barclays',
  rewardsProgram: 'Gap Inc. Rewards',
  rewardsCurrency: 'Encore Points',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: '500 points = $1, so 5X is 1% and 3X is 0.6%. Free shipping on $35+ online orders. The page does not state a foreign transaction fee.',
  rewardTiers: [
    {
      id: 'old-navy-gap-brands',
      name: 'Gap Inc. Brands',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['clothing-stores'],
      onlyWhen: 'Gap, Old Navy, Banana Republic, and Athleta'
    },
    {
      id: 'old-navy-apparel',
      name: 'Eligible Apparel Brands',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['clothing-stores'],
      onlyWhen: 'Eligible retail apparel brands'
    }
  ]
};
