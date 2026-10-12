import type { Card } from '../../../models/card.model';

// The welcome offer is a discount on approval with no spend requirement, so no default sign-up bonus is listed
export const DILLARDS_MASTERCARD: Card = {
  id: 'citi-dillards-mastercard',
  name: "Dillard's Mastercard",
  issuer: 'Citi',
  rewardsProgram: 'Store Rewards',
  rewardsCurrency: 'Cashback',
  network: 'MASTERCARD',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'good',
  baseRewardRate: 0.67,
  termsCheckedOn: '2026-10-11',
  note: 'Rates are cash value: 2 points per $1, and 1,500 points earn a $10 Reward Certificate or a 10% off One-Day Shopping Pass. Other purchases earn 1 point per $1.',
  rewardTiers: [
    {
      id: 'dillards-mastercard-gas-grocery',
      name: 'Gas & Supermarkets',
      rewardRate: 1.33,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['gas-stations', 'grocery-stores']
    },
    {
      id: 'dillards-mastercard-dillards',
      name: "Dillard's",
      rewardRate: 1.33,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['department-stores'],
      onlyWhen: "Dillard's purchases"
    }
  ]
};
