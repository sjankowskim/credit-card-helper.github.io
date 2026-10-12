import type { Card } from '../../../models/card.model';

// The page's summary says 2x on dining, grocery, and gas, but its detailed section says 3x on dining and grocery; this uses the detailed section.
export const WYNDHAM_REWARDS_EARNER: Card = {
  id: 'barclays-wyndham-rewards-earner',
  name: 'Wyndham Rewards Earner Card',
  issuer: 'Barclays',
  rewardsProgram: 'Wyndham Rewards',
  rewardsCurrency: 'Wyndham Rewards Points',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'good',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: '7,500 bonus points each anniversary year you spend $15,000. Gold status.',
  defaultSignUpBonus: { amount: 30000, currency: 'Wyndham Rewards Points', spendRequired: 1000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'wyndham-earner-3x',
      name: 'Dining & Grocery',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining', 'grocery-stores']
    },
    {
      id: 'wyndham-earner-wyndham',
      name: 'Hotels by Wyndham',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels'],
      onlyWhen: 'Hotels by Wyndham'
    }
  ]
};
