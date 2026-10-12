import type { Card } from '../../../models/card.model';

/** A starter card for people new to credit; the $25 autopay credit has no spend requirement, so no sign-up bonus is listed */
export const FREEDOM_RISE: Card = {
  id: 'chase-freedom-rise',
  name: 'Chase Freedom Rise',
  issuer: 'Chase',
  rewardsProgram: 'Chase Ultimate Rewards',
  rewardsCurrency: 'Ultimate Rewards',
  network: 'VISA',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 1.5,
  termsCheckedOn: '2026-10-11',
  referralCapPerYear: 25000,
  rewardTiers: []
};
