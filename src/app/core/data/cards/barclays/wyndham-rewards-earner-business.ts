import type { Card } from '../../../models/card.model';

// The 100,000-point offer is split (45,000 after $3,000 in 90 days + 55,000 after $500 at Wyndham in 180 days); the default bonus is the first part.
export const WYNDHAM_REWARDS_EARNER_BUSINESS: Card = {
  id: 'barclays-wyndham-rewards-earner-business',
  name: 'Wyndham Rewards Earner Business Card',
  issuer: 'Barclays',
  rewardsProgram: 'Wyndham Rewards',
  rewardsCurrency: 'Wyndham Rewards Points',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: false,
  annualFee: 149,
  isBusiness: true,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: '15,000 bonus points each anniversary year after paying the annual fee. Diamond status.',
  defaultSignUpBonus: { amount: 45000, currency: 'Wyndham Rewards Points', spendRequired: 3000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'wyndham-business-5x',
      name: 'Gas, EV, Marketing, Advertising, Office Supply & Shipping',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['gas-stations', 'ev-charging', 'advertising', 'office-supply-stores', 'shipping']
    },
    {
      id: 'wyndham-business-wyndham',
      name: 'Hotels by Wyndham',
      rewardRate: 8.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels'],
      onlyWhen: 'Hotels by Wyndham'
    }
  ],
  benefits: [
    {
      id: 'wyndham-business-wholesale-club',
      name: 'Wholesale club membership credit',
      amount: 65,
      period: 'ANNUAL',
      resetBasis: 'CALENDAR'
    }
  ]
};
