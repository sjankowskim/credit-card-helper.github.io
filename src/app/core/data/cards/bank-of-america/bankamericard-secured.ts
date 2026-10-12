import type { Card } from '../../../models/card.model';

export const BANKAMERICARD_SECURED: Card = {
  id: 'bofa-bankamericard-secured',
  name: 'BankAmericard Secured',
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
  baseRewardRate: 0.0,
  termsCheckedOn: '2026-10-11',
  note: 'No rewards. Secured card: $200 to $5,000 refundable deposit.',
  rewardTiers: []
};
