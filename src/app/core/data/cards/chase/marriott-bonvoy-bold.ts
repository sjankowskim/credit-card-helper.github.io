import type { Card } from '../../../models/card.model';

export const MARRIOTT_BONVOY_BOLD: Card = {
  id: 'chase-marriott-bonvoy-bold',
  name: 'Marriott Bonvoy Bold',
  issuer: 'Chase',
  rewardsProgram: 'Marriott Bonvoy',
  rewardsCurrency: 'Marriott Bonvoy Points',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: 'Silver Elite status and 5 Elite Night Credits each year.',
  defaultSignUpBonus: { amount: 45000, currency: 'Marriott Bonvoy Points', spendRequired: 1000, windowMonths: 3 },
  referralCapPerYear: 200000,
  rewardTiers: [
    {
      id: 'bold-2x',
      name: 'Grocery, Rideshare, Food Delivery, Streaming & Internet/Cable/Phone',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['grocery-stores', 'rideshare', 'food-delivery', 'streaming', 'internet-cable', 'phone'],
      note: 'Select food delivery and streaming services only.'
    },
    {
      id: 'bold-marriott',
      name: 'Marriott',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels'],
      onlyWhen: 'Hotels participating in Marriott Bonvoy'
    }
  ]
};
