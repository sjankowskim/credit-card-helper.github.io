import type { Card } from '../../../models/card.model';

export const DIAMOND_PREFERRED: Card = {
  id: 'citi-diamond-preferred',
  name: 'Citi Diamond Preferred',
  issuer: 'Citi',
  rewardsProgram: 'Citi ThankYou',
  rewardsCurrency: 'Cashback',
  network: 'MASTERCARD',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'good',
  baseRewardRate: 0.0,
  termsCheckedOn: '2026-10-11',
  note: 'No rewards; a low intro APR card for balance transfers and purchases.',
  rewardTiers: []
};
