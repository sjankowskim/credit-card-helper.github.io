import type { Card } from '../../../models/card.model';

// The $500 welcome offer is listed without a confirmed spend requirement, so no default sign-up bonus is set.
export const UNLIMITED_CASH_REWARDS_BUSINESS: Card = {
  id: 'bofa-business-advantage-unlimited-cash-rewards',
  name: 'Bank of America Business Advantage Unlimited Cash Rewards',
  issuer: 'Bank of America',
  rewardsProgram: 'Bank of America Rewards',
  rewardsCurrency: 'Cashback',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: false,
  annualFee: 0,
  isBusiness: true,
  creditNeeded: 'good',
  baseRewardRate: 1.5,
  termsCheckedOn: '2026-10-11',
  note: 'Preferred Rewards for Business boosts this to 1.87% (Gold), 2.25% (Platinum), or 2.62% (Platinum Honors).',
  rewardTiers: []
};
