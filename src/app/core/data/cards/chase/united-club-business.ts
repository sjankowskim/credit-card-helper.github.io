import type { Card } from '../../../models/card.model';

export const UNITED_CLUB_BUSINESS: Card = {
  id: 'chase-united-club-business',
  name: 'United Club Business Card',
  issuer: 'Chase',
  rewardsProgram: 'United MileagePlus',
  rewardsCurrency: 'MileagePlus Miles',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: false,
  annualFee: 695,
  isBusiness: true,
  creditNeeded: 'excellent',
  networkTier: 'Visa Signature Business',
  baseRewardRate: 1.5,
  termsCheckedOn: '2026-10-11',
  note: 'United Club membership. Free first and second checked bags and Premier Access. 1 PQP per $15 spent, up to 28,000 a year.',
  defaultSignUpBonus: { amount: 90000, currency: 'MileagePlus Miles', spendRequired: 5000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'united-club-business-united',
      name: 'United',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'United purchases',
      note: 'United flights also earn 6x as a MileagePlus member (8x total).'
    },
    {
      id: 'united-club-business-renowned-hotels',
      name: 'Renowned Hotels and Resorts',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels'],
      onlyWhen: 'Prepaid through Renowned Hotels and Resorts for United Cardmembers'
    }
  ],
  benefits: [
    {
      id: 'united-club-business-renowned-hotels-credit',
      name: 'Renowned Hotels and Resorts credit',
      amount: 200,
      period: 'ANNUAL',
      resetBasis: 'CARDMEMBER_YEAR',
      note: 'Prepaid stays'
    },
    {
      id: 'united-club-business-rideshare',
      name: 'Rideshare credit',
      amount: 150,
      period: 'ANNUAL',
      resetBasis: 'CALENDAR',
      note: '$12 a month ($18 in December); enrollment required each year'
    },
    {
      id: 'united-club-business-avis-budget',
      name: 'Avis or Budget credit',
      amount: 100,
      period: 'ANNUAL',
      resetBasis: 'CARDMEMBER_YEAR',
      note: 'United TravelBank cash; $50 on each of your first 2 rentals booked through mileageplustravel.united.com'
    },
    {
      id: 'united-club-business-instacart',
      name: 'Instacart credit',
      amount: 20,
      period: 'MONTHLY',
      resetBasis: 'CALENDAR',
      note: 'Two $10 credits a month, through 12/31/2027'
    },
    {
      id: 'united-club-business-jsx',
      name: 'JSX credit',
      amount: 200,
      period: 'ANNUAL',
      resetBasis: 'CARDMEMBER_YEAR',
      note: 'Flights booked directly with JSX'
    },
    {
      id: 'united-club-business-farelock',
      name: 'FareLock credit',
      amount: 50,
      period: 'ANNUAL',
      resetBasis: 'CARDMEMBER_YEAR'
    }
  ]
};
