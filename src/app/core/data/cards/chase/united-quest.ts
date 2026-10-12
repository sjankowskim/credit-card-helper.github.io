import type { Card } from '../../../models/card.model';

export const UNITED_QUEST: Card = {
  id: 'chase-united-quest',
  name: 'United Quest Card',
  issuer: 'Chase',
  rewardsProgram: 'United MileagePlus',
  rewardsCurrency: 'MileagePlus Miles',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 350,
  isBusiness: false,
  creditNeeded: 'good',
  networkTier: 'Visa Signature',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: '10,000-mile award flight discount each anniversary. Free first and second checked bags. 1,000 PQP each year, plus 1 PQP per $20 spent.',
  defaultSignUpBonus: { amount: 80000, currency: 'MileagePlus Miles', spendRequired: 4000, windowMonths: 3 },
  referralCapPerYear: 100000,
  rewardTiers: [
    {
      id: 'united-quest-travel',
      name: 'Other Travel',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['travel', 'transit', 'rideshare']
    },
    {
      id: 'united-quest-dining-streaming',
      name: 'Dining & Streaming',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining', 'streaming']
    },
    {
      id: 'united-quest-united',
      name: 'United',
      rewardRate: 4.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'United purchases',
      note: 'United flights also earn 6x as a MileagePlus member (10x total).'
    },
    {
      id: 'united-quest-renowned-hotels',
      name: 'Renowned Hotels and Resorts',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels'],
      onlyWhen: 'Prepaid through Renowned Hotels and Resorts for United Cardmembers'
    }
  ],
  benefits: [
    {
      id: 'united-quest-travel-credit',
      name: 'United travel credit',
      amount: 200,
      period: 'ANNUAL',
      resetBasis: 'CARDMEMBER_YEAR',
      note: 'United TravelBank cash for United or United Express flights'
    },
    {
      id: 'united-quest-renowned-hotels-credit',
      name: 'Renowned Hotels and Resorts credit',
      amount: 150,
      period: 'ANNUAL',
      resetBasis: 'CARDMEMBER_YEAR',
      note: 'Prepaid stays'
    },
    {
      id: 'united-quest-rideshare',
      name: 'Rideshare credit',
      amount: 100,
      period: 'ANNUAL',
      resetBasis: 'CALENDAR',
      note: 'Paid out monthly; enrollment required each year'
    },
    {
      id: 'united-quest-avis-budget',
      name: 'Avis or Budget credit',
      amount: 80,
      period: 'ANNUAL',
      resetBasis: 'CARDMEMBER_YEAR',
      note: 'United TravelBank cash; $40 on each of your first 2 rentals booked through mileageplustravel.united.com'
    },
    {
      id: 'united-quest-instacart',
      name: 'Instacart credit',
      amount: 180,
      period: 'ANNUAL',
      resetBasis: 'CALENDAR',
      note: 'Paid out monthly, through 12/31/2027'
    },
    {
      id: 'united-quest-jsx',
      name: 'JSX credit',
      amount: 150,
      period: 'ANNUAL',
      resetBasis: 'CARDMEMBER_YEAR',
      note: 'Flights booked directly with JSX'
    }
  ]
};
