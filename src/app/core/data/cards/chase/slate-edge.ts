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
  // Replaced by the relaunched Chase Slate around January 2026. Reports call it a rebrand, but none
  // confirm whether existing Slate Edge accounts became Slate cards, so there's no transitionedTo.
  discontinued: 'retired',
  termsCheckedOn: '2026-10-12',
  note: 'No rewards; a card for building fair credit.',
  rewardTiers: []
};
