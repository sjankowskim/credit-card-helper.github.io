import type { Card } from '../../../models/card.model';

// The welcome offer is a discount on approval with no spend requirement, so no default sign-up bonus is listed
export const MACYS_CREDIT_CARD: Card = {
  id: 'citi-macys-credit-card',
  name: "Macy's Credit Card",
  issuer: 'Citi',
  rewardsProgram: 'Store Rewards',
  rewardsCurrency: 'Cashback',
  network: 'STORE',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'fair',
  baseRewardRate: 0.0,
  termsCheckedOn: '2026-10-11',
  note: "Only works at Macy's. Silver level shown; Gold ($500+ a year at Macy's) earns 3% at Macy's and Platinum ($1,200+) earns 5%. Rewards are Star Money (1,000 points = $10) for Macy's merchandise.",
  rewardTiers: [
    {
      id: 'macys-store-macys',
      name: "Macy's",
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['department-stores'],
      onlyWhen: "Macy's, Macy's Backstage, and macys.com"
    }
  ]
};
