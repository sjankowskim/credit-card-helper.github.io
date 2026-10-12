import type { Card } from '../../../models/card.model';

// The welcome offer is a discount on approval with no spend requirement, so no default sign-up bonus is listed
export const BEST_BUY_CREDIT_CARD: Card = {
  id: 'citi-best-buy-credit-card',
  name: 'My Best Buy Credit Card',
  issuer: 'Citi',
  rewardsProgram: 'Store Rewards',
  rewardsCurrency: 'Cashback',
  network: 'STORE',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'fair',
  baseRewardRate: 0.0,
  termsCheckedOn: '2026-10-11',
  note: 'Only works at Best Buy. Rewards are Best Buy reward certificates. At Best Buy you can take special financing instead of rewards. 10% back on your first day of Best Buy purchases.',
  rewardTiers: [
    {
      id: 'best-buy-store-best-buy',
      name: 'Best Buy',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['electronics-stores'],
      onlyWhen: 'Best Buy purchases'
    }
  ]
};
