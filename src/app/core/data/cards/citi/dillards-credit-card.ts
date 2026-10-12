import type { Card } from '../../../models/card.model';

// The welcome offer is a discount on approval with no spend requirement, so no default sign-up bonus is listed
export const DILLARDS_CREDIT_CARD: Card = {
  id: 'citi-dillards-credit-card',
  name: 'Dillard\'s Credit Card',
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
  note: 'Only works at Dillard\'s. Rates are cash value: 2 points per $1, and 1,500 points earn a $10 Reward Certificate or a 10% off One-Day Shopping Pass.',
  rewardTiers: [
    {
      id: 'dillards-store-dillards',
      name: 'Dillard\'s',
      rewardRate: 1.33,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['department-stores'],
      onlyWhen: 'Dillard\'s purchases'
    }
  ]
};
