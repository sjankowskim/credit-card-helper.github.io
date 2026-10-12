import type { Card } from '../../../models/card.model';

// The welcome offer is a discount on approval with no spend requirement, so no default sign-up bonus is listed
export const BLOOMINGDALES_AMEX: Card = {
  id: 'citi-bloomingdales-amex',
  name: "Bloomingdale's American Express Card",
  issuer: 'Citi',
  rewardsProgram: 'Store Rewards',
  rewardsCurrency: 'Cashback',
  network: 'AMEX',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 1.5,
  termsCheckedOn: '2026-10-11',
  note: "Rates are cash value at the Loyallist level (3 points per $1; 5,000 points = $25 Bloomingdale's reward). Top of the List members earn 4 points per $1.",
  rewardTiers: []
};
