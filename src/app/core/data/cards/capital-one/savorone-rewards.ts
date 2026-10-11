import type { Card } from '../../../models/card.model';

export const SAVORONE_REWARDS: Card = {
  id: 'capital-one-savorone-rewards',
  name: 'Capital One SavorOne Rewards',
  issuer: 'Capital One',
  rewardsProgram: 'Capital One Rewards',
  rewardsCurrency: 'Cashback',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 39,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  rewardTiers: [
    {
      id: 'savorone-3pct',
      name: 'Grocery, Dining, Entertainment & Streaming',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['grocery-stores', 'dining', 'entertainment', 'streaming'],
      note: 'Grocery excludes superstores like Walmart and Target.'
    },
    {
      id: 'savorone-entertainment-portal',
      name: 'Capital One Entertainment',
      rewardRate: 8.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['entertainment'],
      onlyWhen: 'Tickets bought through Capital One Entertainment'
    },
    {
      id: 'savorone-travel-portal',
      name: 'Hotels & Rental Cars',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels', 'car-rentals'],
      onlyWhen: 'Booked through Capital One Travel'
    }
  ]
};
