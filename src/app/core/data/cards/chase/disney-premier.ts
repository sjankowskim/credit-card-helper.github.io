import type { Card } from '../../../models/card.model';

// The offer also includes a $200 Disney gift card on approval, with no spend requirement
export const DISNEY_PREMIER: Card = {
  id: 'chase-disney-premier',
  name: 'Disney Premier Visa',
  issuer: 'Chase',
  rewardsProgram: 'Store Rewards',
  rewardsCurrency: 'Cashback',
  network: 'VISA',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 49,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: 'Rewards are Disney Rewards Dollars, redeemable at most U.S. Disney locations or toward airline purchases. 10% off select merchandise and dining at Disney parks.',
  defaultSignUpBonus: { amount: 100, currency: 'Cashback', spendRequired: 500, windowMonths: 3 },
  referralCapPerYear: 500,
  rewardTiers: [
    {
      id: 'disney-premier-2x',
      name: 'Gas, Grocery Stores & Restaurants',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['gas-stations', 'grocery-stores', 'dining'],
      note: 'Most U.S. Disney locations also earn 2%.'
    },
    {
      id: 'disney-premier-streaming',
      name: 'Disney Streaming',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['streaming'],
      onlyWhen: 'Directly at DisneyPlus.com, Hulu.com, or Stream.ESPN.com'
    }
  ]
};
