import type { Card } from '../../../models/card.model';

export const MORE_REWARDS_AMEX: Card = {
  id: 'navy-federal-more-rewards-amex',
  name: 'Navy Federal More Rewards American Express',
  issuer: 'Navy Federal',
  rewardsProgram: 'Navy Federal Rewards',
  rewardsCurrency: 'Navy Federal Points',
  network: 'AMEX',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'good',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  defaultSignUpBonus: { amount: 20000, currency: 'Navy Federal Points', spendRequired: 2000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'more-rewards-3x',
      name: 'Dining, Supermarkets, Gas & Transit',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining', 'grocery-stores', 'gas-stations', 'transit'],
      note: 'Dining includes food delivery.'
    }
  ]
};
