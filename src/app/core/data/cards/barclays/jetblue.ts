import type { Card } from '../../../models/card.model';

export const JETBLUE: Card = {
  id: 'barclays-jetblue',
  name: 'JetBlue Card',
  issuer: 'Barclays',
  rewardsProgram: 'JetBlue TrueBlue',
  rewardsCurrency: 'TrueBlue Points',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  defaultSignUpBonus: { amount: 10000, currency: 'TrueBlue Points', spendRequired: 1000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'jetblue-2x',
      name: 'Restaurants & Grocery',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining', 'grocery-stores']
    },
    {
      id: 'jetblue-jetblue',
      name: 'JetBlue',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'JetBlue purchases'
    }
  ]
};
