import type { Card } from '../../../models/card.model';

export const VENTUREONE_REWARDS_GOOD_CREDIT: Card = {
  id: 'capital-one-ventureone-rewards-good-credit',
  name: 'Capital One VentureOne Rewards for Good Credit',
  issuer: 'Capital One',
  rewardsProgram: 'Capital One Rewards',
  rewardsCurrency: 'Capital One Miles',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'good',
  baseRewardRate: 1.25,
  termsCheckedOn: '2026-10-11',
  imageOf: 'capital-one-ventureone-rewards',
  rewardTiers: [
    {
      id: 'ventureone-good-credit-travel-portal',
      name: 'Hotels & Rental Cars',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels', 'car-rentals'],
      onlyWhen: 'Booked through Capital One Travel'
    }
  ]
};
