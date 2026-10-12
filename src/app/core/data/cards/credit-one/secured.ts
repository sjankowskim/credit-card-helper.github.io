import type { Card } from '../../../models/card.model';

export const SECURED: Card = {
  id: 'credit-one-secured',
  name: 'Credit One Bank Secured Card',
  issuer: 'Credit One',
  rewardsProgram: 'Credit One Cash Back',
  rewardsCurrency: 'Cashback',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'rebuilding',
  baseRewardRate: 0.0,
  termsCheckedOn: '2026-10-11',
  note: 'A secured card for building credit; the security deposit earns interest.',
  rewardTiers: [
    {
      id: 'secured-everyday',
      name: 'Gas, Grocery, Internet/Cable & Phone',
      rewardRate: 1.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['gas-stations', 'grocery-stores', 'internet-cable', 'phone'],
      note: 'Includes satellite TV.'
    }
  ]
};
