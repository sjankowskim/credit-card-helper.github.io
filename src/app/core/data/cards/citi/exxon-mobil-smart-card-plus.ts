import type { Card } from '../../../models/card.model';

export const EXXON_MOBIL_SMART_CARD_PLUS: Card = {
  id: 'citi-exxon-mobil-smart-card-plus',
  name: 'Exxon Mobil Smart Card+',
  issuer: 'Citi',
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
  note: 'Only works at Exxon and Mobil stations. Saves 10 cents a gallon (12 cents on Synergy Supreme+), plus 5% back on the first $1,200 of non-fuel purchases a year.',
  rewardTiers: []
};
