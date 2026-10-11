import type { Card } from '../../../models/card.model';

export const NORWEGIAN_CRUISE_LINE: Card = {
  id: 'bofa-norwegian-cruise-line',
  name: 'Norwegian Cruise Line World Mastercard',
  issuer: 'Bank of America',
  rewardsProgram: 'Store Rewards',
  rewardsCurrency: 'WorldPoints',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: 'Points are for Norwegian Cruise Line.',
  defaultSignUpBonus: { amount: 20000, currency: 'WorldPoints', spendRequired: 1000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'ncl-air-hotel',
      name: 'Airfare & Hotels',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare', 'hotels']
    },
    {
      id: 'ncl-norwegian',
      name: 'Norwegian Cruise Line',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['travel'],
      onlyWhen: 'Norwegian Cruise Line purchases'
    }
  ]
};
