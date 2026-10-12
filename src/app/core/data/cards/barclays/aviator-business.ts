import type { Card } from '../../../models/card.model';

// Closed to new applicants. Terms come from older sources; Barclays no longer publishes them.
export const AVIATOR_BUSINESS: Card = {
  id: 'barclays-aadvantage-aviator-business',
  name: 'AAdvantage Aviator World Elite Business Mastercard',
  issuer: 'Barclays',
  rewardsProgram: 'American Airlines AAdvantage',
  rewardsCurrency: 'AAdvantage Miles',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: false,
  annualFee: 95,
  isBusiness: true,
  creditNeeded: 'good',
  networkTier: 'World Elite Mastercard',
  baseRewardRate: 1.0,
  discontinued: true,
  transitionedTo: { cardId: 'citi-aadvantage-business', startedOn: '2026-04-24' },
  termsCheckedOn: '2026-10-11',
  note: 'Companion certificate after $30,000 in annual spend.',
  rewardTiers: [
    {
      id: 'aviator-business-2x',
      name: 'Office Supply, Telecom & Car Rentals',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['office-supply-stores', 'phone', 'internet-cable', 'car-rentals']
    },
    {
      id: 'aviator-business-aa',
      name: 'American Airlines',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'Eligible American Airlines purchases'
    }
  ]
};
