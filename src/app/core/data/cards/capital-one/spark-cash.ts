import type { Card } from '../../../models/card.model';

export const SPARK_CASH: Card = {
  id: 'capital-one-spark-cash',
  name: 'Capital One Spark 2% Cash',
  issuer: 'Capital One',
  rewardsProgram: 'Capital One Rewards',
  rewardsCurrency: 'Cashback',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: false,
  // $0 the first year
  annualFee: 95,
  isBusiness: true,
  creditNeeded: 'good',
  baseRewardRate: 2.0,
  termsCheckedOn: '2026-10-11',
  defaultSignUpBonus: { amount: 1000, currency: 'Cashback', spendRequired: 10000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'spark-cash-travel-portal',
      name: 'Hotels & Rental Cars',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels', 'car-rentals'],
      onlyWhen: 'Booked through Capital One Business Travel'
    }
  ]
};
