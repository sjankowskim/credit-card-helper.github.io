import type { Card } from '../../../models/card.model';

export const UPROMISE_WORLD_MASTERCARD: Card = {
  id: 'barclays-upromise-world-mastercard',
  name: 'Upromise World Mastercard',
  issuer: 'Barclays',
  rewardsProgram: 'Barclays Cash Back',
  rewardsCurrency: 'Cashback',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'good',
  networkTier: 'World Mastercard',
  baseRewardRate: 1.25,
  termsCheckedOn: '2026-10-11',
  note: '1.529% if linked to an eligible College Savings Plan. Up to $250 cash back a year on eligible MyGiftCardsPlus gift cards.',
  defaultSignUpBonus: { amount: 200, currency: 'Cashback', spendRequired: 1000, windowMonths: 3 },
  rewardTiers: []
};
