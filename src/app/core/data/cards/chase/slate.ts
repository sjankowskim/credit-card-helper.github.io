import type { Card } from '../../../models/card.model';

export const SLATE: Card = {
  id: 'chase-slate',
  name: 'Chase Slate',
  issuer: 'Chase',
  rewardsProgram: 'Chase Cash Back',
  rewardsCurrency: 'Cashback',
  network: 'VISA',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'good',
  baseRewardRate: 0.0,
  termsCheckedOn: '2026-10-11',
  note: 'No rewards; a 0% intro APR card for purchases and balance transfers (21 months).',
  rewardTiers: []
};
