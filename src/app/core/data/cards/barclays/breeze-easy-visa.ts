import type { Card } from '../../../models/card.model';

export const BREEZE_EASY_VISA: Card = {
  id: 'barclays-breeze-easy-visa',
  name: 'Breeze Easy Visa Credit Card',
  issuer: 'Barclays',
  rewardsProgram: 'Store Rewards',
  rewardsCurrency: 'BreezePoints',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 89,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: 'BreezePoints are worth about 1¢ toward Breeze flights. 7,500 anniversary points with eligible purchases. Zone 1 boarding and inflight WiFi.',
  defaultSignUpBonus: { amount: 40000, currency: 'BreezePoints', spendRequired: 1000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'breeze-2x',
      name: 'Grocery & Restaurants',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['grocery-stores', 'dining']
    },
    {
      id: 'breeze-breeze',
      name: 'Breeze Bundles',
      rewardRate: 10.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'Breeze Nicer/Nicest Bundles (4X Nice Bundles, 2X No Flex fares)'
    }
  ]
};
