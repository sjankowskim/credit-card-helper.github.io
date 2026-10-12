import type { Card } from '../../../models/card.model';

// Closed to new applicants. Terms come from older sources; Barclays no longer publishes them.
export const AVIATOR_MASTERCARD: Card = {
  id: 'barclays-aadvantage-aviator',
  name: 'AAdvantage Aviator World Elite Mastercard',
  issuer: 'Barclays',
  rewardsProgram: 'American Airlines AAdvantage',
  rewardsCurrency: 'AAdvantage Miles',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'good',
  networkTier: 'World Elite Mastercard',
  baseRewardRate: 1.0,
  discontinued: 'retired',
  transitionedTo: { cardId: 'citi-aadvantage-mileup', startedOn: '2026-04-24' },
  termsCheckedOn: '2026-10-11',
  rewardTiers: []
};
