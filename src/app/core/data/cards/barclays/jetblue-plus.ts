import type { Card } from '../../../models/card.model';

export const JETBLUE_PLUS: Card = {
  id: 'barclays-jetblue-plus',
  name: 'JetBlue Plus Card',
  issuer: 'Barclays',
  rewardsProgram: 'JetBlue TrueBlue',
  rewardsCurrency: 'TrueBlue Points',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 99,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: '5,000 bonus points each anniversary. Free first checked bag for you and 3 companions.',
  defaultSignUpBonus: { amount: 70000, currency: 'TrueBlue Points', spendRequired: 1000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'jetblue-plus-2x',
      name: 'Restaurants & Grocery',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining', 'grocery-stores']
    },
    {
      id: 'jetblue-plus-jetblue',
      name: 'JetBlue',
      rewardRate: 6.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'JetBlue purchases'
    }
  ],
  benefits: [
    {
      id: 'jetblue-plus-vacations-credit',
      name: 'JetBlue Vacations credit',
      amount: 100,
      period: 'ANNUAL',
      resetBasis: 'CALENDAR',
      note: 'A JetBlue Vacations package of $100 or more'
    }
  ]
};
