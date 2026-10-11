import type { Card } from '../../../models/card.model';

export const SPARK_CASH_PLUS: Card = {
  id: 'capital-one-spark-cash-plus',
  name: 'Capital One Spark 2% Cash Plus',
  issuer: 'Capital One',
  rewardsProgram: 'Capital One Rewards',
  rewardsCurrency: 'Cashback',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: false,
  annualFee: 150,
  isBusiness: true,
  baseRewardRate: 2.0,
  termsCheckedOn: '2026-10-11',
  note: 'Charge card: the balance is due in full each month. The $150 fee is refunded each year you spend $150,000.',
  defaultSignUpBonus: { amount: 2000, currency: 'Cashback', spendRequired: 30000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'spark-cash-plus-travel-portal',
      name: 'Hotels & Rental Cars',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels', 'car-rentals'],
      onlyWhen: 'Booked through Capital One Business Travel'
    }
  ]
};
