import type { Card } from '../../../models/card.model';

export const KOHLS_REWARDS: Card = {
  id: 'capital-one-kohls-rewards-visa',
  name: "Kohl's Rewards Visa",
  issuer: 'Capital One',
  rewardsProgram: 'Store Rewards',
  rewardsCurrency: 'Cashback',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: "Rewards are store credit at Kohl's.",
  rewardTiers: [
    {
      id: 'kohls-gas',
      name: 'Gas',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['gas-stations']
    },
    {
      id: 'kohls-grocery',
      name: 'Grocery Stores',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['grocery-stores'],
      note: '1% at superstores, warehouse clubs, and convenience stores.'
    },
    {
      id: 'kohls-kohls',
      name: "Kohl's",
      rewardRate: 7.5,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['department-stores'],
      onlyWhen: "Kohl's purchases"
    }
  ]
};
