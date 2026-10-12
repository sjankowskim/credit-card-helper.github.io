import type { Card } from '../../../models/card.model';

export const FLAGSHIP_PREMIER: Card = {
  id: 'navy-federal-flagship-premier',
  name: 'Navy Federal Flagship Premier Visa Signature',
  issuer: 'Navy Federal',
  rewardsProgram: 'Navy Federal Rewards',
  rewardsCurrency: 'Navy Federal Points',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 95,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: 'Global Entry/TSA PreCheck credit up to $120.',
  defaultSignUpBonus: { amount: 50000, currency: 'Navy Federal Points', spendRequired: 4000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'flagship-premier-dining',
      name: 'Dining',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining']
    },
    {
      id: 'flagship-premier-travel',
      name: 'Travel',
      rewardRate: 4.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['travel', 'transit', 'rideshare'],
      note: 'No booking portal required.'
    }
  ],
  benefits: [
    {
      id: 'flagship-premier-airline-credit',
      name: 'Airline credit',
      amount: 100,
      period: 'ANNUAL',
      resetBasis: 'CARDMEMBER_YEAR',
      note: 'After $100 in airline purchases'
    }
  ]
};
