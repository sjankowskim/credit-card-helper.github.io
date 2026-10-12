import type { Card } from '../../../models/card.model';

export const PREMIER_WORLD_MASTERCARD: Card = {
  id: 'synchrony-premier-world-mastercard',
  name: 'Synchrony Premier World Mastercard',
  issuer: 'Synchrony',
  rewardsProgram: 'Synchrony Cash Back',
  rewardsCurrency: 'Cashback',
  network: 'MASTERCARD',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'good',
  networkTier: 'World Mastercard',
  baseRewardRate: 2.0,
  termsCheckedOn: '2026-10-11',
  rewardTiers: []
};
