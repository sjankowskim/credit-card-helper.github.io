import type { Card } from '../../../models/card.model';

export const ALTITUDE_CONNECT: Card = {
  id: 'us-bank-altitude-connect',
  name: 'U.S. Bank Altitude Connect',
  issuer: 'US Bank',
  rewardsProgram: 'U.S. Bank Rewards',
  rewardsCurrency: 'Altitude Points',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'good',
  networkTier: 'Visa Signature',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  defaultSignUpBonus: { amount: 20000, currency: 'Altitude Points', spendRequired: 1000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'altitude-connect-2x',
      name: 'Dining, Streaming & Grocery',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining', 'streaming', 'grocery-stores']
    },
    {
      id: 'altitude-connect-gas',
      name: 'Gas & EV Charging',
      rewardRate: 4.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['gas-stations', 'ev-charging'],
      spendingCap: { amount: 1000, period: 'QUARTERLY' }
    },
    {
      id: 'altitude-connect-travel',
      name: 'Travel',
      rewardRate: 4.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['travel']
    },
    {
      id: 'altitude-connect-travel-portal',
      name: 'Prepaid Hotels & Car Rentals',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels', 'car-rentals'],
      onlyWhen: 'Booked through the U.S. Bank Travel Center'
    }
  ]
};
