import type { Card } from '../../../models/card.model';

// The welcome offer is a discount on approval with no spend requirement, so no default sign-up bonus is listed
export const BEST_BUY_VISA: Card = {
  id: 'citi-best-buy-visa',
  name: 'My Best Buy Visa',
  issuer: 'Citi',
  rewardsProgram: 'Store Rewards',
  rewardsCurrency: 'Cashback',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: 'Rewards are Best Buy reward certificates. At Best Buy you can take special financing instead of rewards. 10% back on your first day of Best Buy purchases. Annual fee is $0 or $59 depending on creditworthiness.',
  rewardTiers: [
    {
      id: 'best-buy-visa-grocery-dining',
      name: 'Grocery & Dining',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['grocery-stores', 'dining']
    },
    {
      id: 'best-buy-visa-gas',
      name: 'Gas',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['gas-stations']
    },
    {
      id: 'best-buy-visa-best-buy',
      name: 'Best Buy',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['electronics-stores'],
      onlyWhen: 'Best Buy purchases'
    }
  ]
};
