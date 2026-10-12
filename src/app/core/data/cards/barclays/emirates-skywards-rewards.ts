import type { Card } from '../../../models/card.model';

export const EMIRATES_SKYWARDS_REWARDS: Card = {
  id: 'barclays-emirates-skywards-rewards',
  name: 'Emirates Skywards Rewards World Elite Mastercard',
  issuer: 'Barclays',
  rewardsProgram: 'Emirates Skywards',
  rewardsCurrency: 'Skywards Miles',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 99,
  isBusiness: false,
  creditNeeded: 'good',
  networkTier: 'World Elite Mastercard',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: 'Silver tier the first year.',
  defaultSignUpBonus: { amount: 40000, currency: 'Skywards Miles', spendRequired: 3000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'emirates-rewards-travel',
      name: 'Travel',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['travel']
    },
    {
      id: 'emirates-rewards-emirates',
      name: 'Emirates',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'Emirates purchases'
    }
  ]
};
