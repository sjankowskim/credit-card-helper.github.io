import type { Card } from '../../../models/card.model';

// Closed to new applicants. Terms come from older sources; Barclays no longer publishes them.
export const AADVANTAGE_AVIATOR_BLUE: Card = {
  id: 'barclays-aadvantage-aviator-blue',
  name: 'AAdvantage Aviator Blue World Elite Mastercard',
  issuer: 'Barclays',
  rewardsProgram: 'American Airlines AAdvantage',
  rewardsCurrency: 'AAdvantage Miles',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 49,
  isBusiness: false,
  baseRewardRate: 1.0,
  discontinued: true,
  transitionedTo: { cardId: 'citi-aadvantage-gold', startedOn: '2026-04-24' },
  termsCheckedOn: '2026-10-11',
  rewardTiers: [
    {
      id: 'aviator-blue-aa',
      name: 'American Airlines',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'Eligible American Airlines purchases'
    }
  ]
};
