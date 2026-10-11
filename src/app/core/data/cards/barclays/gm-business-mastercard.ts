import type { Card } from '../../../models/card.model';

export const GM_BUSINESS_MASTERCARD: Card = {
  id: 'barclays-gm-business-mastercard',
  name: 'GM Business Mastercard',
  issuer: 'Barclays',
  rewardsProgram: 'Store Rewards',
  rewardsCurrency: 'GM Business Card Points',
  network: 'MASTERCARD',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: false,
  annualFee: 0,
  isBusiness: true,
  baseRewardRate: 3.0,
  termsCheckedOn: '2026-10-11',
  note: 'Business Card Points can only be redeemed at GM dealers; their value per point is not shown, so 1¢ is assumed.',
  defaultSignUpBonus: { amount: 100000, currency: 'GM Business Card Points', spendRequired: 5000, windowMonths: 5 },
  rewardTiers: [
    {
      id: 'gm-business-gm',
      name: 'GM Purchases',
      rewardRate: 7.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: [],
      onlyWhen: 'Eligible GM purchases'
    }
  ]
};
