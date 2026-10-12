import type { Card } from '../../../models/card.model';

export const BARNES_NOBLE_MASTERCARD: Card = {
  id: 'barclays-barnes-noble-mastercard',
  name: 'Barnes & Noble Mastercard',
  issuer: 'Barclays',
  rewardsProgram: 'Store Rewards',
  rewardsCurrency: 'B&N Points',
  network: 'MASTERCARD',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'good',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: 'Points are for Barnes & Noble gift cards ($25 per 2,500 points).',
  rewardTiers: [
    {
      id: 'bn-restaurants',
      name: 'Restaurants',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining'],
      note: 'Excludes the B&N Café.'
    },
    {
      id: 'bn-bn',
      name: 'Barnes & Noble & Paper Source',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['online-retail'],
      onlyWhen: 'Barnes & Noble and Paper Source purchases'
    }
  ]
};
