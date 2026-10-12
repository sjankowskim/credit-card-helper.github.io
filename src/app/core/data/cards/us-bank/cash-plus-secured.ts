import type { Card } from '../../../models/card.model';

export const CASH_PLUS_SECURED: Card = {
  id: 'us-bank-cash-plus-secured',
  name: 'U.S. Bank Cash+ Secured',
  issuer: 'US Bank',
  rewardsProgram: 'U.S. Bank Rewards',
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
  note: 'A secured card for building credit; requires a $300 to $5,000 refundable deposit.',
  rewardTiers: [
    {
      id: 'cash-plus-secured-5pct',
      name: '5% Choice Categories',
      rewardRate: 5.0,
      behavior: { type: 'USER_CHOICE', maxSelections: 2 },
      eligibleCategories: [
        'fast-food',
        'internet-cable',
        'streaming',
        'phone',
        'utilities',
        'department-stores',
        'clothing-stores',
        'electronics-stores',
        'sporting-goods-stores',
        'furniture-stores',
        'movie-theaters',
        'fitness',
        'transit'
      ],
      spendingCap: { amount: 2000, period: 'QUARTERLY' },
      note: 'Pick 2 each quarter in the U.S. Bank app before it starts. There, "TV, internet & streaming" is one choice and "ground transportation" covers transit and rideshare.'
    },
    {
      id: 'cash-plus-secured-2pct',
      name: '2% Everyday Category',
      rewardRate: 2.0,
      behavior: { type: 'USER_CHOICE', maxSelections: 1 },
      eligibleCategories: ['gas-stations', 'grocery-stores'],
      note: 'Gas includes EV charging. Grocery excludes wholesale clubs and supercenters.'
    }
  ]
};
