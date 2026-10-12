import type { Card } from '../../../models/card.model';

export const BUSINESS_ESSENTIALS: Card = {
  id: 'us-bank-business-essentials',
  name: 'U.S. Bank Business Essentials',
  issuer: 'US Bank',
  rewardsProgram: 'U.S. Bank Rewards',
  rewardsCurrency: 'Cashback',
  network: 'VISA',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: false,
  annualFee: 0,
  isBusiness: true,
  creditNeeded: 'good',
  networkTier: 'Visa Business',
  baseRewardRate: 2.0,
  termsCheckedOn: '2026-10-11',
  note: '2.5% on the first $10,000 each billing cycle with $10,000+ in a qualifying U.S. Bank business checking account.',
  defaultSignUpBonus: { amount: 500, currency: 'Cashback', spendRequired: 5000, windowMonths: 5 },
  rewardTiers: []
};
