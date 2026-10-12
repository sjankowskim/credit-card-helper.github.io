import type { Card } from '../../../models/card.model';

// The 100,000-point offer is split (45,000 after $1,000 in 90 days + 55,000 after $500 at Wyndham in 180 days); the default bonus is the first part.
export const WYNDHAM_REWARDS_EARNER_PLUS: Card = {
  id: 'barclays-wyndham-rewards-earner-plus',
  name: 'Wyndham Rewards Earner Plus Card',
  issuer: 'Barclays',
  rewardsProgram: 'Wyndham Rewards',
  rewardsCurrency: 'Wyndham Rewards Points',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 95,
  isBusiness: false,
  creditNeeded: 'good',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: '15,000 bonus points each anniversary year after paying the annual fee. Diamond status the first year, then Platinum.',
  defaultSignUpBonus: { amount: 45000, currency: 'Wyndham Rewards Points', spendRequired: 1000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'wyndham-plus-4x',
      name: 'Dining, Grocery & Travel',
      rewardRate: 4.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining', 'grocery-stores', 'travel'],
      note: 'Grocery excludes Target and Walmart.'
    },
    {
      id: 'wyndham-plus-wyndham',
      name: 'Hotels by Wyndham',
      rewardRate: 6.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels'],
      onlyWhen: 'Hotels by Wyndham'
    }
  ]
};
