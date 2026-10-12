import type { Card } from '../../../models/card.model';

export const ATT_POINTS_PLUS: Card = {
  id: 'citi-att-points-plus',
  name: 'AT&T Points Plus Card',
  issuer: 'Citi',
  rewardsProgram: 'Citi ThankYou',
  rewardsCurrency: 'ThankYou Points',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'good',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: '$10 off per line on your AT&T wireless bill and $10 off eligible AT&T internet, with AutoPay and paperless billing.',
  defaultSignUpBonus: { amount: 200, currency: 'Cashback', spendRequired: 1000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'att-points-plus-grocery',
      name: 'Grocery Stores',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['grocery-stores']
    },
    {
      id: 'att-points-plus-gas',
      name: 'Gas & EV Charging',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['gas-stations', 'ev-charging']
    },
    {
      id: 'att-points-plus-att',
      name: 'AT&T',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['phone', 'internet-cable'],
      onlyWhen: 'AT&T products and services'
    }
  ],
  benefits: [
    {
      id: 'att-points-plus-statement-credit',
      name: 'Spend credit',
      amount: 20,
      period: 'MONTHLY',
      resetBasis: 'CALENDAR',
      note: 'Each billing cycle you spend $1,000 or more'
    }
  ]
};
