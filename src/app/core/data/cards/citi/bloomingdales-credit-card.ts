import type { Card } from '../../../models/card.model';

// The welcome offer is a discount on approval with no spend requirement, so no default sign-up bonus is listed
export const BLOOMINGDALES_CREDIT_CARD: Card = {
  id: 'citi-bloomingdales-credit-card',
  name: "Bloomingdale's Credit Card",
  issuer: 'Citi',
  rewardsProgram: 'Store Rewards',
  rewardsCurrency: 'Cashback',
  network: 'STORE',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 0.0,
  termsCheckedOn: '2026-10-11',
  note: "Only works at Bloomingdale's. Rates are cash value at the Loyallist level (3 points per $1; 5,000 points = $25 Bloomingdale's reward). Top of the List members earn 4 points per $1. Top of the List Unlocked earns 10 points per $1 at Bloomingdale's.",
  rewardTiers: [
    {
      id: 'bloomingdales-store-bloomingdales',
      name: "Bloomingdale's",
      rewardRate: 1.5,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['department-stores'],
      onlyWhen: "Bloomingdale's stores, outlets, and bloomingdales.com"
    }
  ]
};
