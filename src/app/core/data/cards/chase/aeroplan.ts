import type { Card } from '../../../models/card.model';

// The offer adds another 40,000 points after $20,000 in the first 12 months; only the first part is listed
export const AEROPLAN: Card = {
  id: 'chase-aeroplan',
  name: 'Air Canada Aeroplan Card',
  issuer: 'Chase',
  rewardsProgram: 'Air Canada Aeroplan',
  rewardsCurrency: 'Aeroplan Points',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 195,
  isBusiness: false,
  creditNeeded: 'good',
  networkTier: 'World Elite Mastercard',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: 'Aeroplan 25K status. Free first checked bags on Air Canada for you and up to 8 companions. 15% off Air Canada award flights.',
  defaultSignUpBonus: { amount: 75000, currency: 'Aeroplan Points', spendRequired: 4000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'aeroplan-gas',
      name: 'Gas Stations',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['gas-stations']
    },
    {
      id: 'aeroplan-grocery-dining',
      name: 'Grocery Stores & Dining',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['grocery-stores', 'dining'],
      note: '3x through December 31, 2026, then 2x.'
    },
    {
      id: 'aeroplan-travel',
      name: 'Travel',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['travel']
    },
    {
      id: 'aeroplan-air-canada',
      name: 'Air Canada',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'Air Canada purchases',
      note: 'Aeroplan 25K members earn another 2x from Air Canada (5x total).'
    }
  ],
  benefits: [
    {
      id: 'aeroplan-air-canada-credit',
      name: 'Air Canada credit',
      amount: 50,
      period: 'SEMIANNUAL',
      resetBasis: 'CALENDAR',
      note: 'Eligible Air Canada purchases'
    }
  ]
};
