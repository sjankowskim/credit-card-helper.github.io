import type { Card } from '../../../models/card.model';

// The welcome offer is a $50 rebate on a first purchase of $250+, so no default sign-up bonus is listed
export const GOODYEAR: Card = {
  id: 'citi-goodyear',
  name: 'Goodyear Credit Card',
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
  note: 'No rewards. Works at Goodyear locations and Exxon and Mobil stations; cardmember rebates on select Goodyear tires.',
  rewardTiers: []
};
