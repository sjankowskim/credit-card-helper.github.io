import type { Card } from '../../../models/card.model';

export const SAPPHIRE_RESERVE_BUSINESS: Card = {
  id: 'chase-sapphire-reserve-business',
  name: 'Chase Sapphire Reserve for Business',
  issuer: 'Chase',
  rewardsProgram: 'Chase Ultimate Rewards',
  rewardsCurrency: 'Ultimate Rewards',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: false,
  annualFee: 795,
  isBusiness: true,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: 'Priority Pass and Chase Sapphire Lounge access. IHG Platinum Elite status through 2027. Global Entry, TSA PreCheck, or NEXUS credit up to $120 every 4 years.',
  defaultSignUpBonus: { amount: 200000, currency: 'Ultimate Rewards', spendRequired: 30000, windowMonths: 6 },
  rewardTiers: [
    {
      id: 'sapphire-reserve-business-advertising',
      name: 'Social Media & Search Advertising',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['advertising'],
      spendingCap: { amount: 1000000, period: 'ANNUAL' },
      note: 'The $1 million cap applies each account anniversary year starting 11/15/2026.'
    },
    {
      id: 'sapphire-reserve-business-flights-hotels',
      name: 'Flights & Hotels Booked Direct',
      rewardRate: 4.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare', 'hotels'],
      note: 'Booked directly with the airline or hotel, not through an online travel agency.'
    },
    {
      id: 'sapphire-reserve-business-travel-portal',
      name: 'Chase Travel',
      rewardRate: 8.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['travel'],
      onlyWhen: 'Booked through Chase Travel, including The Edit'
    }
  ],
  benefits: [
    {
      id: 'sapphire-reserve-business-travel-credit',
      name: 'Travel credit',
      amount: 300,
      period: 'ANNUAL',
      resetBasis: 'CARDMEMBER_YEAR',
      note: 'Applies automatically to travel purchases'
    },
    {
      id: 'sapphire-reserve-business-the-edit',
      name: 'The Edit hotel credit',
      amount: 500,
      period: 'ANNUAL',
      resetBasis: 'CALENDAR',
      note: 'Prepaid stays from The Edit by Chase Travel, up to $250 per booking, 2-night minimum'
    },
    {
      id: 'sapphire-reserve-business-ziprecruiter',
      name: 'ZipRecruiter credit',
      amount: 200,
      period: 'SEMIANNUAL',
      resetBasis: 'CALENDAR'
    },
    {
      id: 'sapphire-reserve-business-google-workspace',
      name: 'Google Workspace credit',
      amount: 200,
      period: 'ANNUAL',
      resetBasis: 'CALENDAR'
    },
    {
      id: 'sapphire-reserve-business-gift-cards',
      name: 'Gift card credit',
      amount: 50,
      period: 'SEMIANNUAL',
      resetBasis: 'CALENDAR',
      note: 'Gift cards from giftcards.com/reservebusiness'
    },
    {
      id: 'sapphire-reserve-business-lyft',
      name: 'Lyft credit',
      amount: 10,
      period: 'MONTHLY',
      resetBasis: 'CALENDAR',
      note: 'Through 9/30/2027'
    }
  ]
};
