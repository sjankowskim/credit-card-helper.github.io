import type { Card } from '../../../models/card.model';

// Issued by Elan Financial Services, part of U.S. Bank
export const FIDELITY_REWARDS: Card = {
  id: 'us-bank-fidelity-rewards',
  name: 'Fidelity Rewards Visa Signature',
  issuer: 'US Bank',
  rewardsProgram: 'U.S. Bank Rewards',
  rewardsCurrency: 'Cashback',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'good',
  networkTier: 'Visa Signature',
  baseRewardRate: 2.0,
  termsCheckedOn: '2026-10-11',
  note: '2% when rewards are deposited into an eligible Fidelity account. Up to $100 in points for Global Entry or TSA PreCheck.',
  rewardTiers: []
};
