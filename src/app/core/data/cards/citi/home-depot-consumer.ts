import type { Card } from '../../../models/card.model';

// The welcome offer is a discount on approval with no spend requirement, so no default sign-up bonus is listed
export const HOME_DEPOT_CONSUMER: Card = {
  id: 'citi-home-depot-consumer',
  name: 'The Home Depot Consumer Credit Card',
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
  note: 'No rewards. Only works at The Home Depot; offers special financing and 1-year returns.',
  rewardTiers: []
};
