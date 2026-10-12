import type { Card } from '../../../models/card.model';

export const AUTOGRAPH_JOURNEY: Card = {
  id: 'wells-fargo-autograph-journey',
  name: 'Wells Fargo Autograph Journey',
  issuer: 'Wells Fargo',
  rewardsProgram: 'Wells Fargo Rewards',
  rewardsCurrency: 'Wells Fargo Rewards',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 95,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  defaultSignUpBonus: { amount: 60000, currency: 'Wells Fargo Rewards', spendRequired: 4000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'autograph-journey-3x',
      name: 'Restaurants & Other Travel',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining', 'travel']
    },
    {
      id: 'autograph-journey-airlines',
      name: 'Airlines',
      rewardRate: 4.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare']
    },
    {
      id: 'autograph-journey-hotels',
      name: 'Hotels',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels']
    }
  ],
  benefits: [
    {
      id: 'autograph-journey-airline-credit',
      name: 'Airline credit',
      amount: 50,
      period: 'ANNUAL',
      resetBasis: 'CARDMEMBER_YEAR',
      note: 'With a minimum $50 airline purchase'
    }
  ]
};
