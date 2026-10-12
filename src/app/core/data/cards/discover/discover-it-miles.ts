import type { Card } from '../../../models/card.model';

// Welcome offer is a first-year Discover Match (all miles doubled), not a fixed bonus.
export const DISCOVER_IT_MILES: Card = {
  id: 'discover-it-miles',
  name: 'Discover it Miles',
  issuer: 'Discover',
  rewardsProgram: 'Discover Cashback Bonus',
  rewardsCurrency: 'Discover Miles',
  network: 'DISCOVER',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 1.5,
  termsCheckedOn: '2026-10-11',
  note: 'Miles are worth 1 cent each, as a statement credit for travel or as cash.',
  rewardTiers: []
};
