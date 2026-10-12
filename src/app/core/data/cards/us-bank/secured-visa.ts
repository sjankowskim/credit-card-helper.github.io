import type { Card } from '../../../models/card.model';

export const SECURED_VISA: Card = {
  id: 'us-bank-secured-visa',
  name: 'U.S. Bank Secured Visa',
  issuer: 'US Bank',
  rewardsProgram: 'U.S. Bank Rewards',
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
  note: 'No rewards; a secured card for building credit with a $300 to $5,000 refundable deposit.',
  rewardTiers: []
};
