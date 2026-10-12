import type { Card } from '../../../models/card.model';

// Closed to new applicants. Terms come from older sources; Barclays no longer publishes them.
export const AVIATOR_SILVER: Card = {
  id: 'barclays-aadvantage-aviator-silver',
  name: 'AAdvantage Aviator Silver World Elite Mastercard',
  issuer: 'Barclays',
  rewardsProgram: 'American Airlines AAdvantage',
  rewardsCurrency: 'AAdvantage Miles',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 199,
  isBusiness: false,
  creditNeeded: 'good',
  networkTier: 'World Elite Mastercard',
  baseRewardRate: 1.0,
  discontinued: true,
  transitionedTo: { cardId: 'citi-aadvantage-globe', startedOn: '2026-04-24' },
  termsCheckedOn: '2026-10-11',
  rewardTiers: [
    {
      id: 'aviator-silver-hotels-cars',
      name: 'Hotels & Car Rentals',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels', 'car-rentals']
    },
    {
      id: 'aviator-silver-aa',
      name: 'American Airlines',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'Eligible American Airlines purchases'
    }
  ]
};
