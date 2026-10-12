import type { Card } from '../../../models/card.model';

export const SOUTHWEST_PREMIER_BUSINESS: Card = {
  id: 'chase-southwest-premier-business',
  name: 'Southwest Rapid Rewards Premier Business',
  issuer: 'Chase',
  rewardsProgram: 'Southwest Rapid Rewards',
  rewardsCurrency: 'Rapid Rewards Points',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: false,
  annualFee: 149,
  isBusiness: true,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: '6,000 points each anniversary. First checked bag free, 15% flight discount each anniversary, and 2,000 A-List qualifying points per $5,000 spent.',
  defaultSignUpBonus: { amount: 80000, currency: 'Rapid Rewards Points', spendRequired: 3000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'southwest-premier-business-gas-dining',
      name: 'Gas Stations & Restaurants',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['gas-stations', 'dining'],
      spendingCap: { amount: 8000, period: 'ANNUAL' },
      note: 'The $8,000 cap is combined across both categories each anniversary year.'
    },
    {
      id: 'southwest-premier-business-southwest',
      name: 'Southwest Airlines',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'Southwest Airlines purchases'
    }
  ]
};
