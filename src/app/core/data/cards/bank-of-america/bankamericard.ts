import type { Card } from '../../../models/card.model';

export const BANKAMERICARD: Card = {
  id: 'bofa-bankamericard',
  name: 'BankAmericard',
  issuer: 'Bank of America',
  rewardsProgram: 'Bank of America Rewards',
  rewardsCurrency: 'Cashback',
  network: 'VISA',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'good',
  baseRewardRate: 0.0,
  termsCheckedOn: '2026-10-11',
  note: 'No rewards.',
  rewardTiers: []
};
