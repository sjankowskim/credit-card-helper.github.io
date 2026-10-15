import type { Card } from '../../../models/card.model';

/** The original Bilt card, issued by Wells Fargo until Bilt moved to Cardless in February 2026 */
export const BILT_MASTERCARD: Card = {
  id: 'wells-fargo-bilt-mastercard',
  name: 'Bilt Mastercard',
  issuer: 'Wells Fargo',
  rewardsProgram: 'BILT',
  rewardsCurrency: 'Bilt Points',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'good',
  baseRewardRate: 1.0,
  // Wells Fargo converted these accounts to the Autograph on Feb 7, 2026, keeping the credit line and
  // account history (a new card number). Choosing a Bilt 2.0 card from Cardless instead opened a new account.
  discontinued: 'retired',
  transitionedTo: { cardId: 'wells-fargo-autograph', startedOn: '2026-02-07' },
  termsCheckedOn: '2026-10-11',
  rewardTiers: [
    {
      id: 'bilt-mastercard-dining',
      name: 'Dining',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining']
    },
    {
      id: 'bilt-mastercard-travel',
      name: 'Travel',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['travel']
    },
    {
      id: 'bilt-mastercard-rent',
      name: 'Rent',
      rewardRate: 1.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['rent'],
      note: 'Up to 100,000 points a year. Points required 5 transactions each statement.'
    }
  ]
};
