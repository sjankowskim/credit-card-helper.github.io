import type { Card } from '../../../models/card.model';

export const QUICKSILVER_SECURED_REWARDS: Card = {
  id: 'capital-one-quicksilver-secured-rewards',
  name: 'Capital One Quicksilver Secured Rewards',
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
  imageOf: 'capital-one-quicksilver-rewards',
  note: 'Secured card: $200 minimum refundable deposit.',
  rewardTiers: [
    {
      id: 'quicksilver-secured-travel-portal',
      name: 'Hotels & Rental Cars',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels', 'car-rentals'],
      onlyWhen: 'Booked through Capital One Travel'
    }
  ]
};
