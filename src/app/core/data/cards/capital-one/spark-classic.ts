import type { Card } from '../../../models/card.model';

export const SPARK_CLASSIC: Card = {
  id: 'capital-one-spark-classic',
  name: 'Capital One Spark 1% Classic',
  issuer: 'Capital One',
  rewardsProgram: 'Capital One Rewards',
  rewardsCurrency: 'Cashback',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: false,
  annualFee: 0,
  isBusiness: true,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  rewardTiers: [
    {
      id: 'spark-classic-travel-portal',
      name: 'Hotels & Rental Cars',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels', 'car-rentals'],
      onlyWhen: 'Booked through Capital One Business Travel'
    }
  ]
};
