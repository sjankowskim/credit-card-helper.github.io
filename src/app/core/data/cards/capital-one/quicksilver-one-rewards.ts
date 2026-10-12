import type { Card } from '../../../models/card.model';

export const QUICKSILVER_ONE_REWARDS: Card = {
  id: 'capital-one-quicksilverone-rewards',
  name: 'Capital One QuicksilverOne Rewards',
  issuer: 'Capital One',
  rewardsProgram: 'Capital One Rewards',
  rewardsCurrency: 'Cashback',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 39,
  isBusiness: false,
  creditNeeded: 'fair',
  baseRewardRate: 1.5,
  termsCheckedOn: '2026-10-11',
  rewardTiers: [
    {
      id: 'quicksilverone-travel-portal',
      name: 'Hotels & Rental Cars',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels', 'car-rentals'],
      onlyWhen: 'Booked through Capital One Travel'
    }
  ]
};
