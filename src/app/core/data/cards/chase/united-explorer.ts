import type { Card } from '../../../models/card.model';

export const UNITED_EXPLORER: Card = {
  id: 'chase-united-explorer',
  name: 'United Explorer Card',
  issuer: 'Chase',
  rewardsProgram: 'United MileagePlus',
  rewardsCurrency: 'MileagePlus Miles',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 150,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: '$0 annual fee the first year. Free first checked bag, 2 United Club passes a year, and 25% back on United inflight purchases. $100 United travel credit after $10,000 spend each calendar year.',
  defaultSignUpBonus: { amount: 70000, currency: 'MileagePlus Miles', spendRequired: 3000, windowMonths: 3 },
  referralCapPerYear: 100000,
  rewardTiers: [
    {
      id: 'united-explorer-dining',
      name: 'Dining',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining']
    },
    {
      id: 'united-explorer-hotels',
      name: 'Hotels Booked Direct',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels'],
      note: 'Booked directly with the hotel.'
    },
    {
      id: 'united-explorer-united',
      name: 'United',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'United purchases',
      note: 'United flights also earn 6x as a MileagePlus member (9x total).'
    }
  ],
  benefits: [
    {
      id: 'united-explorer-hotels-credit',
      name: 'United Hotels credit',
      amount: 100,
      period: 'ANNUAL',
      resetBasis: 'CARDMEMBER_YEAR',
      note: '$50 back on each of your first 2 prepaid United Hotels stays'
    },
    {
      id: 'united-explorer-rideshare',
      name: 'Rideshare credit',
      amount: 5,
      period: 'MONTHLY',
      resetBasis: 'CALENDAR',
      note: 'Enrollment required each year'
    },
    {
      id: 'united-explorer-avis-budget',
      name: 'Avis or Budget credit',
      amount: 50,
      period: 'ANNUAL',
      resetBasis: 'CARDMEMBER_YEAR',
      note: 'United TravelBank cash; $25 on each of your first 2 rentals booked through mileageplustravel.united.com'
    },
    {
      id: 'united-explorer-instacart',
      name: 'Instacart credit',
      amount: 10,
      period: 'MONTHLY',
      resetBasis: 'CALENDAR',
      note: 'Through 12/31/2027'
    },
    {
      id: 'united-explorer-jsx',
      name: 'JSX credit',
      amount: 100,
      period: 'ANNUAL',
      resetBasis: 'CARDMEMBER_YEAR',
      note: 'Flights booked directly with JSX'
    }
  ]
};
