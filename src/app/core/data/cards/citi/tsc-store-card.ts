import type { Card } from '../../../models/card.model';

export const TSC_STORE_CARD: Card = {
  id: 'citi-tsc-store-card',
  name: 'TSC Store Card',
  issuer: 'Citi',
  rewardsProgram: 'Store Rewards',
  rewardsCurrency: 'Cashback',
  network: 'STORE',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'fair',
  baseRewardRate: 0.0,
  termsCheckedOn: '2026-10-11',
  note: 'Only works at Tractor Supply and Petsense. Rewards are Tractor Supply rewards. Cardmembers get Preferred Plus Neighbor status. At Tractor Supply you can take special financing on $199+ instead of rewards.',
  rewardTiers: [
    {
      id: 'tsc-store-tractor-supply',
      name: 'Tractor Supply',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['home-improvement'],
      onlyWhen: 'Tractor Supply and Petsense purchases'
    }
  ]
};
