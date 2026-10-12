import type { Card } from '../../../models/card.model';

export const UNITED_BUSINESS: Card = {
  id: 'chase-united-business',
  name: 'United Business Card',
  issuer: 'Chase',
  rewardsProgram: 'United MileagePlus',
  rewardsCurrency: 'MileagePlus Miles',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: false,
  annualFee: 150,
  isBusiness: true,
  creditNeeded: 'good',
  networkTier: 'Visa Signature Business',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: 'Free first checked bag and 2 United Club passes a year. 5,000-mile anniversary bonus if you also have a personal United card. $125 United travel credit after 5 United flight purchases of $100+ each calendar year.',
  defaultSignUpBonus: { amount: 90000, currency: 'MileagePlus Miles', spendRequired: 5000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'united-business-2x',
      name: 'Gas, Dining, Office Supply & Transit',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['gas-stations', 'dining', 'office-supply-stores', 'transit', 'rideshare']
    },
    {
      id: 'united-business-united',
      name: 'United',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'United purchases',
      note: 'United flights also earn 6x as a MileagePlus member (8x total).'
    }
  ],
  benefits: [
    {
      id: 'united-business-hotels-credit',
      name: 'United Hotels credit',
      amount: 100,
      period: 'ANNUAL',
      resetBasis: 'CARDMEMBER_YEAR',
      note: 'Prepaid United Hotels stays'
    },
    {
      id: 'united-business-rideshare',
      name: 'Rideshare credit',
      amount: 100,
      period: 'ANNUAL',
      resetBasis: 'CALENDAR',
      note: 'Paid out monthly; enrollment required each year'
    },
    {
      id: 'united-business-avis-budget',
      name: 'Avis or Budget credit',
      amount: 50,
      period: 'ANNUAL',
      resetBasis: 'CARDMEMBER_YEAR',
      note: 'United TravelBank cash for rentals booked through mileageplustravel.united.com'
    },
    {
      id: 'united-business-instacart',
      name: 'Instacart credit',
      amount: 10,
      period: 'MONTHLY',
      resetBasis: 'CALENDAR',
      note: 'Through 12/31/2027'
    },
    {
      id: 'united-business-jsx',
      name: 'JSX credit',
      amount: 100,
      period: 'ANNUAL',
      resetBasis: 'CARDMEMBER_YEAR',
      note: 'Flights booked directly with JSX'
    },
    {
      id: 'united-business-farelock',
      name: 'FareLock credit',
      amount: 25,
      period: 'ANNUAL',
      resetBasis: 'CARDMEMBER_YEAR'
    }
  ]
};
