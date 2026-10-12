import type { Card } from '../../../models/card.model';

export const ATMOS_REWARDS_SUMMIT: Card = {
  id: 'bofa-atmos-rewards-summit',
  name: 'Atmos Rewards Summit Visa Infinite',
  issuer: 'Bank of America',
  rewardsProgram: 'Atmos Rewards',
  rewardsCurrency: 'Atmos Points',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 395,
  isBusiness: false,
  creditNeeded: 'excellent',
  networkTier: 'Visa Infinite',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: '10% more points with an eligible Bank of America account. Yearly 25,000-point Global Companion Award, 10,000 status points, and 8 Alaska Lounge passes.',
  rewardTiers: [
    {
      id: 'atmos-summit-dining',
      name: 'Dining',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining']
    },
    {
      id: 'atmos-summit-airlines',
      name: 'Alaska & Hawaiian Airlines',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'Alaska Airlines and Hawaiian Airlines purchases'
    },
    {
      id: 'atmos-summit-foreign',
      name: 'Foreign Purchases',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['travel'],
      onlyWhen: 'Purchases in a foreign currency'
    }
  ]
};
