import type { Card } from '../../../models/card.model';

export const AARP_ESSENTIAL_REWARDS_MASTERCARD: Card = {
  id: 'barclays-aarp-essential-rewards-mastercard',
  name: 'AARP Essential Rewards Mastercard from Barclays',
  issuer: 'Barclays',
  rewardsProgram: 'Barclays Cash Back',
  rewardsCurrency: 'Cashback',
  network: 'MASTERCARD',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  defaultSignUpBonus: { amount: 100, currency: 'Cashback', spendRequired: 500, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'aarp-essential-3pct',
      name: 'Gas & Drugstores',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['gas-stations', 'drugstores'],
      note: 'Excludes Target and Walmart.'
    },
    {
      id: 'aarp-essential-medical',
      name: 'Medical',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: [],
      onlyWhen: 'Eligible medical expenses'
    }
  ]
};
