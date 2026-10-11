import type { Card } from '../../../models/card.model';

export const QUICKSILVER_REWARDS_STUDENTS: Card = {
  id: 'capital-one-quicksilver-rewards-students',
  name: 'Capital One Quicksilver Rewards for Students',
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
  defaultSignUpBonus: { amount: 50, currency: 'Cashback', spendRequired: 100, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'quicksilver-students-travel-portal',
      name: 'Hotels & Rental Cars',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels', 'car-rentals'],
      onlyWhen: 'Booked through Capital One Travel'
    }
  ]
};
