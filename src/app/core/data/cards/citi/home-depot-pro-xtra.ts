import type { Card } from '../../../models/card.model';

// The welcome offer is a discount on approval with no spend requirement, so no default sign-up bonus is listed
export const HOME_DEPOT_PRO_XTRA: Card = {
  id: 'citi-home-depot-pro-xtra',
  name: 'Pro Xtra Credit Card',
  issuer: 'Citi',
  rewardsProgram: 'Store Rewards',
  rewardsCurrency: 'Cashback',
  network: 'STORE',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: false,
  annualFee: 0,
  isBusiness: true,
  creditNeeded: 'fair',
  baseRewardRate: 0.0,
  termsCheckedOn: '2026-10-11',
  note: 'No rewards. Only works at The Home Depot; purchases count 4x toward Pro Xtra Perks.',
  rewardTiers: []
};
