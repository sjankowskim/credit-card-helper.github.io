import type { Card } from '../../../models/card.model';

export const VERIZON_VISA: Card = {
  id: 'synchrony-verizon-visa',
  name: 'Verizon Visa Card',
  issuer: 'Synchrony',
  rewardsProgram: 'Store Rewards',
  rewardsCurrency: 'Cashback',
  network: 'VISA',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: 'Rewards are Verizon Dollars for Verizon purchases and bills. $10 a month off each line with AutoPay. The bonus is $50 after a first purchase plus $100 after $1,500.',
  defaultSignUpBonus: { amount: 150, currency: 'Cashback', spendRequired: 1500, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'verizon-visa-4pct',
      name: 'Gas & EV, Grocery & Dining',
      rewardRate: 4.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['gas-stations', 'ev-charging', 'grocery-stores', 'dining'],
      note: 'Dining includes takeout.'
    },
    {
      id: 'verizon-visa-verizon',
      name: 'Verizon Purchases',
      rewardRate: 4.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['phone'],
      onlyWhen: 'Verizon purchases, not bill payments'
    }
  ]
};
