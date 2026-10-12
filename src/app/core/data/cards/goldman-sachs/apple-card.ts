import type { Card } from '../../../models/card.model';

// Goldman Sachs issues Apple Card today; JPMorgan Chase is taking over as issuer
export const APPLE_CARD: Card = {
  id: 'goldman-sachs-apple-card',
  name: 'Apple Card',
  issuer: 'Goldman Sachs',
  rewardsProgram: 'Apple Daily Cash',
  rewardsCurrency: 'Cashback',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: 'Earns 2% on any purchase made with Apple Pay; 1% is the rate for the physical card. No fees of any kind.',
  rewardTiers: [
    {
      id: 'apple-card-apple',
      name: 'Apple',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['electronics-stores'],
      onlyWhen: 'Apple purchases, and select merchants with Apple Pay'
    }
  ]
};
