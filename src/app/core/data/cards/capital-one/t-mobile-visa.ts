import type { Card } from '../../../models/card.model';

export const T_MOBILE_VISA: Card = {
  id: 'capital-one-t-mobile-visa',
  name: 'T-Mobile Visa',
  issuer: 'Capital One',
  rewardsProgram: 'Store Rewards',
  rewardsCurrency: 'Cashback',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 2.0,
  termsCheckedOn: '2026-10-11',
  note: 'Rewards are store credit at T-Mobile.',
  rewardTiers: [
    {
      id: 't-mobile-devices',
      name: 'T-Mobile Devices',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['phone'],
      onlyWhen: 'Phones, devices, and accessories from T-Mobile (not service or EIP payments)'
    }
  ]
};
