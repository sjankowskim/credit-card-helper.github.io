import type { Card } from '../../../models/card.model';

export const PLATINUM_MASTERCARD: Card = {
  id: 'capital-one-platinum',
  name: 'Capital One Platinum',
  issuer: 'Capital One',
  rewardsProgram: 'Capital One Rewards',
  rewardsCurrency: 'Cashback',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 0.0,
  termsCheckedOn: '2026-10-11',
  note: 'No rewards; a card for building credit.',
  rewardTiers: []
};
