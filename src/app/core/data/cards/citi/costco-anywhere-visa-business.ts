import type { Card } from '../../../models/card.model';

export const COSTCO_ANYWHERE_VISA_BUSINESS: Card = {
  id: 'citi-costco-anywhere-visa-business',
  name: 'Costco Anywhere Visa Business',
  issuer: 'Citi',
  rewardsProgram: 'Store Rewards',
  rewardsCurrency: 'Cashback',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: false,
  annualFee: 0,
  isBusiness: true,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: 'Requires a paid Costco membership. Cash back comes once a year as a reward certificate, redeemable for cash or merchandise at U.S. Costco warehouses.',
  rewardTiers: [
    {
      id: 'costco-anywhere-visa-business-costco',
      name: 'Costco',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['grocery-stores'],
      onlyWhen: 'Costco and Costco.com purchases'
    },
    {
      id: 'costco-anywhere-visa-business-dining-travel',
      name: 'Restaurants & Travel',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining', 'travel'],
      note: 'Includes Costco Travel.'
    },
    {
      id: 'costco-anywhere-visa-business-gas',
      name: 'Gas & EV Charging',
      rewardRate: 4.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['gas-stations', 'ev-charging'],
      spendingCap: { amount: 7000, period: 'ANNUAL' },
      note: 'The $7,000 cap is combined with Costco gas; 1% after that.'
    },
    {
      id: 'costco-anywhere-visa-business-costco-gas',
      name: 'Gas at Costco',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['gas-stations'],
      onlyWhen: 'Gas at Costco',
      spendingCap: { amount: 7000, period: 'ANNUAL' },
      note: 'The $7,000 cap is combined with other gas and EV charging; 1% after that.'
    }
  ]
};
