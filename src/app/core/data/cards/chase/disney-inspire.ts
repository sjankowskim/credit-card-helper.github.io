import type { Card } from '../../../models/card.model';

// The offer also includes a $300 Disney gift card on approval, with no spend requirement
export const DISNEY_INSPIRE: Card = {
  id: 'chase-disney-inspire',
  name: 'Disney Inspire Visa',
  issuer: 'Chase',
  rewardsProgram: 'Store Rewards',
  rewardsCurrency: 'Cashback',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 149,
  isBusiness: false,
  creditNeeded: 'good',
  networkTier: 'Visa Signature',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: 'Rewards are Disney Rewards Dollars, redeemable at most U.S. Disney locations or toward airline purchases. 10% off select merchandise and dining at Disney parks.',
  defaultSignUpBonus: { amount: 200, currency: 'Cashback', spendRequired: 1000, windowMonths: 3 },
  referralCapPerYear: 500,
  rewardTiers: [
    {
      id: 'disney-inspire-grocery-dining',
      name: 'Grocery Stores & Restaurants',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['grocery-stores', 'dining']
    },
    {
      id: 'disney-inspire-gas',
      name: 'Gas Stations',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['gas-stations'],
      note: 'Most U.S. Disney locations also earn 3%.'
    },
    {
      id: 'disney-inspire-streaming',
      name: 'Disney Streaming',
      rewardRate: 10.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['streaming'],
      onlyWhen: 'Directly at DisneyPlus.com, Hulu.com, or Stream.ESPN.com'
    }
  ],
  benefits: [
    {
      id: 'disney-inspire-streaming-credit',
      name: 'Disney streaming credit',
      amount: 10,
      period: 'MONTHLY',
      resetBasis: 'CALENDAR',
      note: 'After $10 or more on Disney+, Hulu, or ESPN subscriptions; activation required each year'
    },
    {
      id: 'disney-inspire-park-tickets',
      name: 'Disney theme park ticket credit',
      amount: 100,
      period: 'ANNUAL',
      resetBasis: 'CARDMEMBER_YEAR',
      note: 'After $200 on U.S. Disney theme park tickets'
    },
    {
      id: 'disney-inspire-resort-cruise',
      name: 'Disney resort and cruise reward',
      amount: 200,
      period: 'ANNUAL',
      resetBasis: 'CARDMEMBER_YEAR',
      note: 'Disney Rewards Dollars after $2,000 on U.S. Disney Resort stays and Disney Cruise Line'
    }
  ]
};
