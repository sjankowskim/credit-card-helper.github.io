import type { Card } from '../../../models/card.model';

export const AADVANTAGE_EXECUTIVE: Card = {
  id: 'citi-aadvantage-executive',
  name: 'Citi / AAdvantage Executive World Legend Mastercard',
  issuer: 'Citi',
  rewardsProgram: 'American Airlines AAdvantage',
  rewardsCurrency: 'AAdvantage Miles',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 695,
  isBusiness: false,
  creditNeeded: 'excellent',
  networkTier: 'World Legend Mastercard',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: 'Admirals Club membership. First checked bag free on domestic American Airlines itineraries. Global Entry/TSA PreCheck credit up to $120 every 4 years.',
  defaultSignUpBonus: { amount: 125000, currency: 'AAdvantage Miles', spendRequired: 15000, windowMonths: 5 },
  rewardTiers: [
    {
      id: 'executive-aa',
      name: 'American Airlines',
      rewardRate: 4.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'Eligible American Airlines purchases',
      note: '5x for the rest of the calendar year after $150,000 in purchases.'
    },
    {
      id: 'executive-hotels-cars',
      name: 'AAdvantage Hotels & Cars',
      rewardRate: 12.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels', 'car-rentals'],
      onlyWhen: 'Booked through AAdvantage Hotels or AAdvantage Cars'
    }
  ],
  benefits: [
    {
      id: 'executive-aa-vacations',
      name: 'American Airlines Vacations credit',
      amount: 250,
      period: 'SEMIANNUAL',
      resetBasis: 'CALENDAR'
    },
    {
      id: 'executive-lyft',
      name: 'Lyft credit',
      amount: 15,
      period: 'MONTHLY',
      resetBasis: 'CALENDAR',
      note: 'After 3 eligible rides in the month'
    },
    {
      id: 'executive-avis-budget',
      name: 'Avis or Budget credit',
      amount: 120,
      period: 'ANNUAL',
      resetBasis: 'CALENDAR',
      note: 'Prepaid rentals booked on avis.com or budget.com'
    },
    {
      id: 'executive-inflight',
      name: 'Inflight and Admirals Club credit',
      amount: 100,
      period: 'ANNUAL',
      resetBasis: 'CALENDAR'
    }
  ]
};
