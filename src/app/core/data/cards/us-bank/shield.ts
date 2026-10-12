import type { Card } from '../../../models/card.model';

export const SHIELD: Card = {
  id: 'us-bank-shield',
  name: 'U.S. Bank Shield',
  issuer: 'US Bank',
  rewardsProgram: 'U.S. Bank Rewards',
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
  note: 'A low intro APR card. Cell phone protection up to $600 when you pay your phone bill with the card.',
  rewardTiers: [
    {
      id: 'shield-travel-portal',
      name: 'Prepaid Travel',
      rewardRate: 4.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare', 'hotels', 'car-rentals'],
      onlyWhen: 'Prepaid through the U.S. Bank Travel Center'
    }
  ],
  benefits: [
    {
      id: 'shield-annual-credit',
      name: 'Annual statement credit',
      amount: 20,
      period: 'ANNUAL',
      resetBasis: 'CARDMEMBER_YEAR',
      note: 'After 11 consecutive months of purchases'
    }
  ]
};
