import type { Card } from '../../../models/card.model';

export const CUSTOMIZED_CASH_REWARDS_SECURED: Card = {
  id: 'bofa-customized-cash-rewards-secured',
  name: 'Bank of America Customized Cash Rewards Secured',
  issuer: 'Bank of America',
  rewardsProgram: 'Bank of America Rewards',
  rewardsCurrency: 'Cashback',
  network: 'VISA',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'rebuilding',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: 'Secured card: $200 to $5,000 refundable deposit.',
  rewardTiers: [
    {
      id: 'customized-cash-secured-3pct',
      name: '3% Choice Category',
      rewardRate: 3.0,
      behavior: { type: 'USER_CHOICE', maxSelections: 1 },
      eligibleCategories: [
        'gas-stations',
        'ev-charging',
        'online-retail',
        'dining',
        'travel',
        'drugstores',
        'home-improvement',
        'furniture-stores'
      ],
      spendingCap: { amount: 2500, period: 'QUARTERLY' },
      note: '6% the first year. Change it once a month. Online shopping includes cable, internet, phone, and streaming. The $2,500 cap is shared with the 2% grocery tier.'
    },
    {
      id: 'customized-cash-secured-grocery',
      name: 'Grocery Stores & Wholesale Clubs',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['grocery-stores'],
      spendingCap: { amount: 2500, period: 'QUARTERLY' }
    }
  ]
};
