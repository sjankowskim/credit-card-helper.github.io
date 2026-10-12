import type { Card } from '../../../models/card.model';

export const CARECREDIT: Card = {
  id: 'synchrony-carecredit',
  name: 'CareCredit',
  issuer: 'Synchrony',
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
  note: 'No rewards. Promotional financing on health and wellness purchases of $200+ at providers in the CareCredit network.',
  rewardTiers: []
};
