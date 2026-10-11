import type { Card } from '../../../models/card.model';

export const QUICKSILVER_REWARDS: Card = {
  id: 'capital-one-quicksilver-rewards',
  name: 'Capital One Quicksilver Rewards',
  issuer: 'Capital One',
  rewardsProgram: 'Capital One Rewards',
  rewardsCurrency: 'Cashback',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 1.5,
  termsCheckedOn: '2026-10-11',
  rewardTiers: [
    {
      id: 'quicksilver-travel-portal',
      name: 'Hotels & Rental Cars',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels', 'car-rentals'],
      onlyWhen: 'Booked through Capital One Travel'
    }
  ]
};
