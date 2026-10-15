import type { Card } from '../../../models/card.model';

export const SLATE_EDGE: Card = {
  id: 'chase-slate-edge',
  name: 'Chase Slate Edge',
  issuer: 'Chase',
  rewardsProgram: 'Chase Cash Back',
  rewardsCurrency: 'Cashback',
  network: 'VISA',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'fair',
  baseRewardRate: 0.0,
  // Still open to applicants alongside the relaunched Chase Slate (checked on Chase's site)
  termsCheckedOn: '2026-10-15',
  note: 'No rewards; a card for building fair credit.',
  rewardTiers: []
};
