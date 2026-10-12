import type { Card } from '../../../models/card.model';

export const AIR_FRANCE_KLM: Card = {
  id: 'bofa-air-france-klm',
  name: 'Air France KLM Visa Signature',
  issuer: 'Bank of America',
  rewardsProgram: 'Flying Blue',
  rewardsCurrency: 'Flying Blue Miles',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 89,
  isBusiness: false,
  creditNeeded: 'good',
  networkTier: 'Visa Signature',
  baseRewardRate: 1.5,
  termsCheckedOn: '2026-10-11',
  note: '5,000 bonus miles each year you spend at least $50. Earns Flying Blue XP based on spend.',
  defaultSignUpBonus: { amount: 50000, currency: 'Flying Blue Miles', spendRequired: 2000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'air-france-klm-dining',
      name: 'Dining',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining']
    },
    {
      id: 'air-france-klm-airlines',
      name: 'Air France, KLM & SkyTeam',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'Air France, KLM, and SkyTeam purchases'
    }
  ]
};
