import type { Card } from '../../../models/card.model';

/** Closed to new applicants in October 2025; Citi began moving cardholders to its AAdvantage cards in April 2026 */
export const AVIATOR_RED: Card = {
  id: 'barclays-aadvantage-aviator-red',
  name: 'AAdvantage Aviator Red',
  issuer: 'Barclays',
  rewardsProgram: 'American Airlines AAdvantage',
  rewardsCurrency: 'AAdvantage Miles',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 99,
  isBusiness: false,
  creditNeeded: 'good',
  baseRewardRate: 1.0,
  discontinued: true,
  transitionedTo: { cardId: 'citi-aadvantage-platinum-select', startedOn: '2026-04-24' },
  termsCheckedOn: '2026-10-11',
  rewardTiers: [
    {
      id: 'aviator-red-aa',
      name: 'American Airlines',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'Eligible American Airlines purchases'
    }
  ]
};
