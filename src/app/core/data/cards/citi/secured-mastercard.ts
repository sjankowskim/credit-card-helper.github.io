import type { Card } from '../../../models/card.model';

export const SECURED_MASTERCARD: Card = {
  id: 'citi-secured-mastercard',
  name: 'Citi Secured Mastercard',
  issuer: 'Citi',
  rewardsProgram: 'Citi ThankYou',
  rewardsCurrency: 'Cashback',
  network: 'MASTERCARD',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 0.0,
  termsCheckedOn: '2026-10-11',
  note: 'No rewards; a secured card for building credit.',
  rewardTiers: []
};
