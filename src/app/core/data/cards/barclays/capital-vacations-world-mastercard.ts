import type { Card } from '../../../models/card.model';

export const CAPITAL_VACATIONS_WORLD_MASTERCARD: Card = {
  id: 'barclays-capital-vacations-world-mastercard',
  name: 'Capital Vacations World Mastercard',
  issuer: 'Barclays',
  rewardsProgram: 'Store Rewards',
  rewardsCurrency: 'Capital Vacations Rewards',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'good',
  networkTier: 'World Mastercard',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: 'A 3-night resort stay certificate each calendar year you spend $10,000. Rewards are worth about 1¢.',
  defaultSignUpBonus: { amount: 5000, currency: 'Capital Vacations Rewards', spendRequired: 1, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'capital-vacations-2x',
      name: 'Travel, Gas & EV Charging',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['travel', 'gas-stations', 'ev-charging']
    },
    {
      id: 'capital-vacations-5x',
      name: 'Capital Vacations',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['travel'],
      onlyWhen: 'Capital Vacations maintenance fees, exchange fees, and Lifestyles+'
    }
  ]
};
