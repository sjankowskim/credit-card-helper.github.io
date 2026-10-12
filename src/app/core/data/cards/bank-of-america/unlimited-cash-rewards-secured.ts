import type { Card } from '../../../models/card.model';

export const UNLIMITED_CASH_REWARDS_SECURED: Card = {
  id: 'bofa-unlimited-cash-rewards-secured',
  name: 'Bank of America Unlimited Cash Rewards Secured',
  issuer: 'Bank of America',
  rewardsProgram: 'Bank of America Rewards',
  rewardsCurrency: 'Cashback',
  network: 'VISA',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'rebuilding',
  baseRewardRate: 1.5,
  termsCheckedOn: '2026-10-11',
  note: 'Secured card: $200 to $5,000 refundable deposit.',
  rewardTiers: []
};
