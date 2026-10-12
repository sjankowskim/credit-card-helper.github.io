import type { Card } from '../../../models/card.model';

export const EMIRATES_SKYWARDS_PREMIUM: Card = {
  id: 'barclays-emirates-skywards-premium',
  name: 'Emirates Skywards Premium World Elite Mastercard',
  issuer: 'Barclays',
  rewardsProgram: 'Emirates Skywards',
  rewardsCurrency: 'Skywards Miles',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 499,
  isBusiness: false,
  creditNeeded: 'excellent',
  networkTier: 'World Elite Mastercard',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: '10,000 bonus miles each cardmembership year you spend $30,000. Gold tier the first year. Priority Pass Select. Global Entry/TSA PreCheck credit up to $120 every 5 years.',
  defaultSignUpBonus: { amount: 50000, currency: 'Skywards Miles', spendRequired: 3000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'emirates-premium-travel',
      name: 'Travel',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['travel']
    },
    {
      id: 'emirates-premium-emirates',
      name: 'Emirates',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'Emirates purchases'
    }
  ]
};
