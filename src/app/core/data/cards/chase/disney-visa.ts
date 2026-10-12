import type { Card } from '../../../models/card.model';

// The offer also includes a $100 Disney gift card on approval, with no spend requirement
export const DISNEY_VISA: Card = {
  id: 'chase-disney-visa',
  name: 'Disney Visa',
  issuer: 'Chase',
  rewardsProgram: 'Store Rewards',
  rewardsCurrency: 'Cashback',
  network: 'VISA',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: 'Rewards are Disney Rewards Dollars, redeemable at most U.S. Disney locations. 10% off select merchandise and dining at Disney parks.',
  defaultSignUpBonus: { amount: 50, currency: 'Cashback', spendRequired: 500, windowMonths: 3 },
  referralCapPerYear: 500,
  rewardTiers: []
};
