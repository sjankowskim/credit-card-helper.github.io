import type { Card } from '../../../models/card.model';

export const BUSINESS_ESSENTIALS_PLUS: Card = {
  id: 'us-bank-business-essentials-plus',
  name: 'U.S. Bank Business Essentials Plus',
  issuer: 'US Bank',
  rewardsProgram: 'U.S. Bank Rewards',
  rewardsCurrency: 'Cashback',
  network: 'VISA',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: false,
  annualFee: 295,
  isBusiness: true,
  baseRewardRate: 2.0,
  termsCheckedOn: '2026-10-11',
  note: 'Metal card. Up to 3.5% on $200,000 a year with large balances in a qualifying U.S. Bank business checking account.',
  defaultSignUpBonus: { amount: 1000, currency: 'Cashback', spendRequired: 15000, windowMonths: 5 },
  rewardTiers: [
    {
      id: 'business-essentials-plus-top',
      name: 'Top Category',
      rewardRate: 5.0,
      behavior: { type: 'AUTO_TOP_SPEND', maxCategories: 1 },
      eligibleCategories: ['airfare', 'phone', 'dining', 'entertainment', 'office-supply-stores', 'shipping', 'utilities'],
      spendingCap: { amount: 200000, period: 'ANNUAL' },
      note: 'Your top category each month. Also offered: accounting and tax services.'
    }
  ]
};
