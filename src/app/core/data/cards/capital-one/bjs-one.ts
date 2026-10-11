import type { Card } from '../../../models/card.model';

export const BJS_ONE: Card = {
  id: 'capital-one-bjs-one-mastercard',
  name: "BJ's One Mastercard",
  issuer: 'Capital One',
  rewardsProgram: 'Store Rewards',
  rewardsCurrency: 'Cashback',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 1.5,
  termsCheckedOn: '2026-10-11',
  note: "Rewards are store credit at BJ's. Also 10¢ off per gallon at BJ's Gas.",
  rewardTiers: [
    {
      id: 'bjs-one-bjs',
      name: "BJ's",
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['grocery-stores'],
      onlyWhen: "Most BJ's purchases"
    }
  ]
};
