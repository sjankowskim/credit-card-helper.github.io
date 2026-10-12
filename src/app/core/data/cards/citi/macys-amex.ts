import type { Card } from '../../../models/card.model';

// The welcome offer is a discount on approval with no spend requirement, so no default sign-up bonus is listed
export const MACYS_AMEX: Card = {
  id: 'citi-macys-amex',
  name: "Macy's American Express Card",
  issuer: 'Citi',
  rewardsProgram: 'Store Rewards',
  rewardsCurrency: 'Cashback',
  network: 'AMEX',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: "Silver level shown; Gold ($500+ a year at Macy's) earns 3% at Macy's and Platinum ($1,200+) earns 5%. Rewards are Star Money (1,000 points = $10) for Macy's merchandise.",
  rewardTiers: [
    {
      id: 'macys-amex-gas-grocery',
      name: 'Gas & Supermarkets',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['gas-stations', 'grocery-stores']
    },
    {
      id: 'macys-amex-dining',
      name: 'Restaurants',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining'],
      note: 'Includes delivery.'
    },
    {
      id: 'macys-amex-macys',
      name: "Macy's",
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['department-stores'],
      onlyWhen: "Macy's, Macy's Backstage, and macys.com"
    }
  ]
};
