import type { Card } from '../../../models/card.model';

export const BLUE_CASH_PREFERRED: Card = {
  id: 'amex-blue-cash-preferred',
  name: 'Blue Cash Preferred Card from American Express',
  issuer: 'American Express',
  rewardsProgram: 'Amex Cash Back',
  rewardsCurrency: 'Cashback',
  network: 'AMEX',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  // $0 the first year
  annualFee: 95,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  defaultSignUpBonus: { amount: 250, currency: 'Cashback', spendRequired: 3000, windowMonths: 6 },
  rewardTiers: [
    {
      id: 'bcp-supermarkets',
      name: 'U.S. Supermarkets',
      rewardRate: 6.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['grocery-stores'],
      spendingCap: { amount: 6000, period: 'ANNUAL' }
    },
    {
      id: 'bcp-streaming',
      name: 'Select U.S. Streaming',
      rewardRate: 6.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['streaming']
    },
    {
      id: 'bcp-gas-transit',
      name: 'U.S. Gas Stations & Transit',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['gas-stations', 'transit']
    }
  ],
  benefits: [
    {
      id: 'bcp-disney-bundle',
      name: 'Disney streaming credit',
      amount: 10,
      period: 'MONTHLY',
      resetBasis: 'CALENDAR',
      note: 'Disney+, Hulu, or ESPN+ subscriptions; enrollment required'
    }
  ]
};
