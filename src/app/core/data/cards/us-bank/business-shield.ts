import type { Card } from '../../../models/card.model';

export const BUSINESS_SHIELD: Card = {
  id: 'us-bank-business-shield',
  name: 'U.S. Bank Business Shield',
  issuer: 'US Bank',
  rewardsProgram: 'U.S. Bank Rewards',
  rewardsCurrency: 'Cashback',
  network: 'VISA',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: false,
  annualFee: 0,
  isBusiness: true,
  baseRewardRate: 0.0,
  termsCheckedOn: '2026-10-11',
  note: 'A low intro APR business card.',
  rewardTiers: [
    {
      id: 'business-shield-travel-portal',
      name: 'Prepaid Travel',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare', 'hotels', 'car-rentals'],
      onlyWhen: 'Booked through the U.S. Bank Travel Center'
    }
  ],
  benefits: [
    {
      id: 'business-shield-travel-credit',
      name: 'Travel Center credit',
      amount: 50,
      period: 'ANNUAL',
      resetBasis: 'CARDMEMBER_YEAR',
      note: 'After $5,000 in Travel Center bookings'
    }
  ]
};
