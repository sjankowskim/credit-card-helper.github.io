import type { Card } from '../../../models/card.model';

export const BUSINESS_ALTITUDE_CONNECT: Card = {
  id: 'us-bank-business-altitude-connect',
  name: 'U.S. Bank Business Altitude Connect',
  issuer: 'US Bank',
  rewardsProgram: 'U.S. Bank Rewards',
  rewardsCurrency: 'Altitude Points',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: false,
  annualFee: 95,
  isBusiness: true,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: '$0 annual fee the first year. $25 credit after three straight months of taxi or rideshare purchases.',
  defaultSignUpBonus: { amount: 75000, currency: 'Altitude Points', spendRequired: 6000, windowMonths: 6 },
  rewardTiers: [
    {
      id: 'business-connect-2x',
      name: 'Dining & Phone',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining', 'phone']
    },
    {
      id: 'business-connect-4x',
      name: 'Travel, Gas & EV',
      rewardRate: 4.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['travel', 'gas-stations', 'ev-charging'],
      spendingCap: { amount: 150000, period: 'ANNUAL' },
      note: 'The $150,000 cap is combined across these categories each year.'
    },
    {
      id: 'business-connect-travel-portal',
      name: 'Prepaid Hotels & Car Rentals',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels', 'car-rentals'],
      onlyWhen: 'Booked through the U.S. Bank Travel Center'
    }
  ]
};
