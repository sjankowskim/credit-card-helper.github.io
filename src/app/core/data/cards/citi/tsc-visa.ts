import type { Card } from '../../../models/card.model';

export const TSC_VISA: Card = {
  id: 'citi-tsc-visa',
  name: 'TSC Visa Card',
  issuer: 'Citi',
  rewardsProgram: 'Store Rewards',
  rewardsCurrency: 'Cashback',
  network: 'VISA',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'good',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: 'Rewards are Tractor Supply rewards. Cardmembers get Preferred Plus Neighbor status. At Tractor Supply you can take special financing on $199+ instead of rewards.',
  rewardTiers: [
    {
      id: 'tsc-visa-3pct',
      name: 'Gas & Grocery Stores',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['gas-stations', 'grocery-stores'],
      note: 'Veterinary services also earn 3%.'
    },
    {
      id: 'tsc-visa-tractor-supply',
      name: 'Tractor Supply',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['home-improvement'],
      onlyWhen: 'Tractor Supply and Petsense purchases'
    }
  ]
};
