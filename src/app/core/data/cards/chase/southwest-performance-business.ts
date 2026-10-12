import type { Card } from '../../../models/card.model';

export const SOUTHWEST_PERFORMANCE_BUSINESS: Card = {
  id: 'chase-southwest-performance-business',
  name: 'Southwest Rapid Rewards Performance Business',
  issuer: 'Chase',
  rewardsProgram: 'Southwest Rapid Rewards',
  rewardsCurrency: 'Rapid Rewards Points',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: false,
  annualFee: 299,
  isBusiness: true,
  creditNeeded: 'good',
  networkTier: 'Visa Signature Business',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: '9,000 points each anniversary. Preferred seat at booking, Extra Legroom upgrades, and first checked bag free. Global Entry, TSA PreCheck, or NEXUS credit up to $120 every 4 years.',
  defaultSignUpBonus: { amount: 80000, currency: 'Rapid Rewards Points', spendRequired: 5000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'southwest-performance-2x',
      name: 'Gas, Restaurants, Transit & Rideshare',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['gas-stations', 'dining', 'transit', 'rideshare']
    },
    {
      id: 'southwest-performance-hotels',
      name: 'Hotels Booked Direct',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels'],
      note: 'Booked directly with the hotel.'
    },
    {
      id: 'southwest-performance-southwest',
      name: 'Southwest Airlines',
      rewardRate: 4.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'Southwest Airlines purchases'
    }
  ]
};
