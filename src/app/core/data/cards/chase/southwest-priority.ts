import type { Card } from '../../../models/card.model';

export const SOUTHWEST_PRIORITY: Card = {
  id: 'chase-southwest-priority',
  name: 'Southwest Rapid Rewards Priority',
  issuer: 'Chase',
  rewardsProgram: 'Southwest Rapid Rewards',
  rewardsCurrency: 'Rapid Rewards Points',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 229,
  isBusiness: false,
  creditNeeded: 'good',
  networkTier: 'Visa Signature',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: '7,500 points each anniversary. Preferred seat at booking, Extra Legroom upgrades, first checked bag free, and 2,500 A-List qualifying points per $5,000 spent.',
  defaultSignUpBonus: { amount: 60000, currency: 'Rapid Rewards Points', spendRequired: 2000, windowMonths: 3 },
  referralCapPerYear: 100000,
  rewardTiers: [
    {
      id: 'southwest-priority-gas-dining',
      name: 'Gas Stations & Restaurants',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['gas-stations', 'dining']
    },
    {
      id: 'southwest-priority-southwest',
      name: 'Southwest Airlines',
      rewardRate: 4.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'Southwest Airlines purchases'
    }
  ]
};
