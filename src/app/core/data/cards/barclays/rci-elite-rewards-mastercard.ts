import type { Card } from '../../../models/card.model';

export const RCI_ELITE_REWARDS_MASTERCARD: Card = {
  id: 'barclays-rci-elite-rewards-mastercard',
  name: 'RCI Elite Rewards World Mastercard',
  issuer: 'Barclays',
  rewardsProgram: 'Store Rewards',
  rewardsCurrency: 'RCI Rewards',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: 'A $250 Vacation Credit each calendar year you spend $10,000. Rewards are worth about 1¢.',
  defaultSignUpBonus: { amount: 5000, currency: 'RCI Rewards', spendRequired: 1, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'rci-2x',
      name: 'Travel, Gas & EV Charging',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['travel', 'gas-stations', 'ev-charging'],
      note: 'Travel includes rideshare.'
    },
    {
      id: 'rci-5x',
      name: 'RCI',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['travel'],
      onlyWhen: 'Eligible RCI purchases'
    }
  ]
};
