import type { Card } from '../../../models/card.model';

export const UNLIMITED_CASH_REWARDS: Card = {
  id: 'bofa-unlimited-cash-rewards',
  name: 'Bank of America Unlimited Cash Rewards',
  issuer: 'Bank of America',
  rewardsProgram: 'Bank of America Rewards',
  rewardsCurrency: 'Cashback',
  network: 'VISA',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 1.5,
  termsCheckedOn: '2026-10-11',
  note: 'Bank of America Preferred Rewards members earn 25%-75% more.',
  defaultSignUpBonus: { amount: 250, currency: 'Cashback', spendRequired: 1000, windowMonths: 3 },
  rewardTiers: []
};
