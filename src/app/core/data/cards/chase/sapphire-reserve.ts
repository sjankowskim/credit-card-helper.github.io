import type { Card } from '../../../models/card.model';

export const SAPPHIRE_RESERVE: Card = {
  id: 'chase-sapphire-reserve',
  name: 'Chase Sapphire Reserve',
  issuer: 'Chase',
  rewardsProgram: 'Chase Ultimate Rewards',
  rewardsCurrency: 'Ultimate Rewards',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 795,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  referralCapPerYear: 100000,
  rewardTiers: [
    {
      id: 'sapphire-reserve-flights-hotels',
      name: 'Flights & Hotels Booked Direct',
      rewardRate: 4.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare', 'hotels'],
      note: 'Booked directly with the airline or hotel, not through an online travel agency.'
    },
    {
      id: 'sapphire-reserve-dining',
      name: 'Dining',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining']
    },
    {
      id: 'sapphire-reserve-travel-portal',
      name: 'Chase Travel',
      rewardRate: 8.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['travel'],
      onlyWhen: 'Booked through Chase Travel, including The Edit'
    }
  ],
  benefits: [
    {
      id: 'sapphire-reserve-travel-credit',
      name: 'Travel credit',
      amount: 300,
      period: 'ANNUAL',
      resetBasis: 'CARDMEMBER_YEAR',
      note: 'Applies automatically to travel purchases'
    },
    {
      id: 'sapphire-reserve-the-edit',
      name: 'The Edit hotel credit',
      amount: 250,
      period: 'SEMIANNUAL',
      resetBasis: 'CALENDAR',
      note: 'Prepaid stays from The Edit by Chase Travel, 2-night minimum'
    },
    {
      id: 'sapphire-reserve-dining-credit',
      name: 'Exclusive Tables dining credit',
      amount: 150,
      period: 'SEMIANNUAL',
      resetBasis: 'CALENDAR',
      note: 'Sapphire Reserve Exclusive Tables restaurants on OpenTable'
    },
    {
      id: 'sapphire-reserve-stubhub',
      name: 'StubHub credit',
      amount: 150,
      period: 'SEMIANNUAL',
      resetBasis: 'CALENDAR',
      note: 'StubHub and viagogo; activation required'
    },
    {
      id: 'sapphire-reserve-lyft',
      name: 'Lyft credit',
      amount: 10,
      period: 'MONTHLY',
      resetBasis: 'CALENDAR'
    },
    {
      id: 'sapphire-reserve-peloton',
      name: 'Peloton credit',
      amount: 10,
      period: 'MONTHLY',
      resetBasis: 'CALENDAR'
    }
  ]
};
