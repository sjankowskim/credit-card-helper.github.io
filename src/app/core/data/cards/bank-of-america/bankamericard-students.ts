import type { Card } from '../../../models/card.model';

export const BANKAMERICARD_STUDENTS: Card = {
  id: 'bofa-bankamericard-students',
  name: 'BankAmericard for Students',
  issuer: 'Bank of America',
  rewardsProgram: 'Bank of America Rewards',
  rewardsCurrency: 'Cashback',
  network: 'VISA',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 0.0,
  termsCheckedOn: '2026-10-11',
  imageOf: 'bofa-bankamericard',
  note: 'No rewards.',
  rewardTiers: []
};
