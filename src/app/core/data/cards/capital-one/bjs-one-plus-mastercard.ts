import type { Card } from '../../../models/card.model';

export const BJS_ONE_PLUS_MASTERCARD: Card = {
  id: 'capital-one-bjs-one-plus-mastercard',
  name: "BJ's One+ Mastercard",
  issuer: 'Capital One',
  rewardsProgram: 'Store Rewards',
  rewardsCurrency: 'Cashback',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 2.0,
  termsCheckedOn: '2026-10-11',
  note: "Rewards are store credit at BJ's. Also 15¢ off per gallon at BJ's Gas.",
  rewardTiers: [
    {
      id: 'bjs-one-plus-bjs',
      name: "BJ's",
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['grocery-stores'],
      onlyWhen: "BJ's purchases"
    }
  ]
};
