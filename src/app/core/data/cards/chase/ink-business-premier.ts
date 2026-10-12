import type { Card } from '../../../models/card.model';

export const INK_BUSINESS_PREMIER: Card = {
  id: 'chase-ink-business-premier',
  name: 'Chase Ink Business Premier',
  issuer: 'Chase',
  rewardsProgram: 'Chase Ultimate Rewards',
  rewardsCurrency: 'Ultimate Rewards',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: false,
  annualFee: 195,
  isBusiness: true,
  baseRewardRate: 2.0,
  termsCheckedOn: '2026-10-11',
  note: 'Purchases of $5,000 or more earn 2.5%. A pay-in-full card with a Flex for Business balance. Rewards are cash back and can\'t be moved to other Ultimate Rewards cards.',
  defaultSignUpBonus: { amount: 100000, currency: 'Ultimate Rewards', spendRequired: 10000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'ink-premier-travel-portal',
      name: 'Chase Travel',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['travel'],
      onlyWhen: 'Booked through Chase Travel'
    }
  ]
};
