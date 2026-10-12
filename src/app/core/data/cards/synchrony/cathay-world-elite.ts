import type { Card } from '../../../models/card.model';

export const CATHAY_WORLD_ELITE: Card = {
  id: 'synchrony-cathay-world-elite',
  name: 'Cathay World Elite Mastercard',
  issuer: 'Synchrony',
  rewardsProgram: 'Asia Miles',
  rewardsCurrency: 'Asia Miles',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  defaultSignUpBonus: { amount: 38000, currency: 'Asia Miles', spendRequired: 3000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'cathay-dining',
      name: 'Dining',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining'],
      note: 'Includes eligible dining delivery.'
    },
    {
      id: 'cathay-cathay',
      name: 'Cathay Pacific & HK Express',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'Cathay Pacific and HK Express purchases'
    }
  ]
};
