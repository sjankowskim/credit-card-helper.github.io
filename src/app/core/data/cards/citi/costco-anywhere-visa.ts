import type { Card } from '../../../models/card.model';

export const COSTCO_ANYWHERE_VISA: Card = {
  id: 'citi-costco-anywhere-visa',
  name: 'Costco Anywhere Visa',
  issuer: 'Citi',
  rewardsProgram: 'Store Rewards',
  rewardsCurrency: 'Cashback',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'good',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: 'Requires a paid Costco membership. Cash back comes once a year as a reward certificate, redeemable for cash or merchandise at U.S. Costco warehouses.',
  rewardTiers: [
    {
      id: 'costco-anywhere-visa-costco',
      name: 'Costco',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['grocery-stores'],
      onlyWhen: 'Costco and Costco.com purchases'
    },
    {
      id: 'costco-anywhere-visa-dining-travel',
      name: 'Restaurants & Travel',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining', 'travel'],
      note: 'Includes Costco Travel.'
    },
    {
      id: 'costco-anywhere-visa-gas',
      name: 'Gas & EV Charging',
      rewardRate: 4.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['gas-stations', 'ev-charging'],
      spendingCap: { amount: 7000, period: 'ANNUAL' },
      note: 'The $7,000 cap is combined with Costco gas; 1% after that.'
    },
    {
      id: 'costco-anywhere-visa-costco-gas',
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
