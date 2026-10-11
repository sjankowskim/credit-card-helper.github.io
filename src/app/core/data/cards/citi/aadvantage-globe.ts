import type { Card } from '../../../models/card.model';

export const AADVANTAGE_GLOBE: Card = {
  id: 'citi-aadvantage-globe',
  name: 'Citi / AAdvantage Globe Mastercard',
  issuer: 'Citi',
  rewardsProgram: 'American Airlines AAdvantage',
  rewardsCurrency: 'AAdvantage Miles',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 350,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: 'Four Admirals Club passes a year. Global Entry/TSA PreCheck credit up to $120 every 4 years.',
  defaultSignUpBonus: { amount: 60000, currency: 'AAdvantage Miles', spendRequired: 4000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'globe-dining',
      name: 'Restaurants',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining'],
      note: 'Includes takeout and delivery.'
    },
    {
      id: 'globe-aa',
      name: 'American Airlines',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'Eligible American Airlines purchases'
    },
    {
      id: 'globe-hotels',
      name: 'AAdvantage Hotels',
      rewardRate: 6.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels'],
      onlyWhen: 'Hotels booked through AAdvantage Hotels'
    }
  ],
  benefits: [
    {
      id: 'globe-splurge-credit',
      name: 'Splurge credit',
      amount: 100,
      period: 'ANNUAL',
      resetBasis: 'CALENDAR',
      note: 'Eligible partner purchases'
    },
    {
      id: 'globe-turo-credit',
      name: 'Turo credit',
      amount: 240,
      period: 'ANNUAL',
      resetBasis: 'CALENDAR',
      note: 'Up to $30 back on each eligible Turo trip'
    }
  ]
};
