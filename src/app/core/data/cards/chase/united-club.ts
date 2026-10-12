import type { Card } from '../../../models/card.model';

export const UNITED_CLUB: Card = {
  id: 'chase-united-club',
  name: 'United Club Card',
  issuer: 'Chase',
  rewardsProgram: 'United MileagePlus',
  rewardsCurrency: 'MileagePlus Miles',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 695,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: 'United Club membership. Free first and second checked bags and Premier Access. 1,500 PQP each year, plus 1 PQP per $15 spent.',
  defaultSignUpBonus: { amount: 90000, currency: 'MileagePlus Miles', spendRequired: 5000, windowMonths: 3 },
  referralCapPerYear: 100000,
  rewardTiers: [
    {
      id: 'united-club-travel',
      name: 'Other Travel',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['travel', 'transit', 'rideshare']
    },
    {
      id: 'united-club-dining',
      name: 'Dining',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining']
    },
    {
      id: 'united-club-united',
      name: 'United',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'United purchases',
      note: 'United flights also earn 6x as a MileagePlus member (11x total).'
    },
    {
      id: 'united-club-renowned-hotels',
      name: 'Renowned Hotels and Resorts',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels'],
      onlyWhen: 'Prepaid through Renowned Hotels and Resorts for United Cardmembers'
    }
  ],
  benefits: [
    {
      id: 'united-club-renowned-hotels-credit',
      name: 'Renowned Hotels and Resorts credit',
      amount: 200,
      period: 'ANNUAL',
      resetBasis: 'CARDMEMBER_YEAR',
      note: 'Prepaid stays'
    },
    {
      id: 'united-club-rideshare',
      name: 'Rideshare credit',
      amount: 150,
      period: 'ANNUAL',
      resetBasis: 'CALENDAR',
      note: 'Paid out monthly; enrollment required each year'
    },
    {
      id: 'united-club-avis-budget',
      name: 'Avis or Budget credit',
      amount: 100,
      period: 'ANNUAL',
      resetBasis: 'CARDMEMBER_YEAR',
      note: 'United TravelBank cash; $50 on each of your first 2 rentals booked through mileageplustravel.united.com'
    },
    {
      id: 'united-club-instacart',
      name: 'Instacart credit',
      amount: 240,
      period: 'ANNUAL',
      resetBasis: 'CALENDAR',
      note: 'Paid out monthly, through 12/31/2027'
    },
    {
      id: 'united-club-jsx',
      name: 'JSX credit',
      amount: 200,
      period: 'ANNUAL',
      resetBasis: 'CARDMEMBER_YEAR',
      note: 'Flights booked directly with JSX'
    }
  ]
};
