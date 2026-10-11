import type { Card } from '../../../models/card.model';

export const REI_CO_OP_MASTERCARD: Card = {
  id: 'capital-one-rei-co-op-mastercard',
  name: 'REI Co-op Mastercard',
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
  note: 'Rewards are store credit at REI.',
  rewardTiers: [
    {
      id: 'rei-rei',
      name: 'REI Co-op',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['sporting-goods-stores'],
      onlyWhen: 'REI Co-op purchases'
    }
  ]
};
