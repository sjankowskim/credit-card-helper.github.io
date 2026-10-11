import type { Card } from '../../../models/card.model';

export const JETBLUE_BUSINESS: Card = {
  id: 'barclays-jetblue-business',
  name: 'JetBlue Business Card',
  issuer: 'Barclays',
  rewardsProgram: 'JetBlue TrueBlue',
  rewardsCurrency: 'TrueBlue Points',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: false,
  annualFee: 99,
  isBusiness: true,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: '5,000 bonus points each anniversary. Free first checked bag for you and 3 companions.',
  defaultSignUpBonus: { amount: 50000, currency: 'TrueBlue Points', spendRequired: 4000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'jetblue-business-2x',
      name: 'Restaurants & Office Supply',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining', 'office-supply-stores']
    },
    {
      id: 'jetblue-business-jetblue',
      name: 'JetBlue',
      rewardRate: 6.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'JetBlue purchases'
    }
  ],
  benefits: [
    {
      id: 'jetblue-business-vacations-credit',
      name: 'JetBlue Vacations credit',
      amount: 100,
      period: 'ANNUAL',
      resetBasis: 'CALENDAR',
      note: 'A JetBlue Vacations package of $100 or more'
    }
  ]
};
