import type { Card } from '../../../models/card.model';

export const JETBLUE_PREMIER: Card = {
  id: 'barclays-jetblue-premier',
  name: 'JetBlue Premier Card',
  issuer: 'Barclays',
  rewardsProgram: 'JetBlue TrueBlue',
  rewardsCurrency: 'TrueBlue Points',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 499,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: '5,000 bonus points each anniversary. Up to $2,000 a year in companion pass credits with high spend. Priority Pass. Global Entry/TSA PreCheck credit up to $120 every 4 years.',
  defaultSignUpBonus: { amount: 90000, currency: 'TrueBlue Points', spendRequired: 5000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'jetblue-premier-2x',
      name: 'Restaurants & Grocery',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining', 'grocery-stores']
    },
    {
      id: 'jetblue-premier-jetblue',
      name: 'JetBlue',
      rewardRate: 6.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'JetBlue purchases'
    }
  ],
  benefits: [
    {
      id: 'jetblue-premier-travel-credit',
      name: 'TrueBlue Travel credit',
      amount: 300,
      period: 'ANNUAL',
      resetBasis: 'CALENDAR',
      note: 'TrueBlue Travel bookings'
    }
  ]
};
