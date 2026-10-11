import type { Card } from '../../../models/card.model';

// The $500 welcome offer is listed without a confirmed spend requirement, so no default sign-up bonus is set.
export const CUSTOMIZED_CASH_REWARDS_BUSINESS: Card = {
  id: 'bofa-business-advantage-customized-cash-rewards',
  name: 'Bank of America Business Advantage Customized Cash Rewards',
  issuer: 'Bank of America',
  rewardsProgram: 'Bank of America Rewards',
  rewardsCurrency: 'Cashback',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: false,
  annualFee: 0,
  isBusiness: true,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: 'Preferred Rewards for Business boosts the rates by 25% to 75%.',
  rewardTiers: [
    {
      id: 'business-customized-cash-3pct',
      name: '3% Choice Category',
      rewardRate: 3.0,
      behavior: { type: 'USER_CHOICE', maxSelections: 1 },
      eligibleCategories: [
        'gas-stations',
        'ev-charging',
        'office-supply-stores',
        'travel',
        'internet-cable',
        'phone'
      ],
      spendingCap: { amount: 50000, period: 'ANNUAL' },
      note: 'Choices also include computer services and business consulting. The $50,000 cap is shared with the 2% dining tier.'
    },
    {
      id: 'business-customized-cash-dining',
      name: 'Dining',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining'],
      spendingCap: { amount: 50000, period: 'ANNUAL' }
    }
  ]
};
