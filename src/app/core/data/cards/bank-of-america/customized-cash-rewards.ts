import type { Card } from '../../../models/card.model';

export const CUSTOMIZED_CASH_REWARDS: Card = {
  id: 'bofa-customized-cash-rewards',
  name: 'Bank of America Customized Cash Rewards',
  issuer: 'Bank of America',
  rewardsProgram: 'Bank of America Rewards',
  rewardsCurrency: 'Cashback',
  network: 'VISA',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: 'Also offered as the Susan G. Komen Customized Cash Rewards card (pink ribbon design, design 2) with the same rewards; Bank of America donates to Komen for each account.',
  defaultSignUpBonus: { amount: 200, currency: 'Cashback', spendRequired: 1000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'customized-cash-3pct',
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
      note: '6% the first year. Change it once a month. The $2,500 cap is shared with the 2% grocery tier. Preferred Rewards members earn 25%-75% more.'
    },
    {
      id: 'customized-cash-grocery',
      name: 'Grocery Stores & Wholesale Clubs',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['grocery-stores'],
      spendingCap: { amount: 2500, period: 'QUARTERLY' }
    }
  ]
};
