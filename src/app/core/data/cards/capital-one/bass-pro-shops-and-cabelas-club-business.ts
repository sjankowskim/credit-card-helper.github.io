import type { Card } from '../../../models/card.model';

export const BASS_PRO_SHOPS_AND_CABELAS_CLUB_BUSINESS: Card = {
  id: 'capital-one-club-business-card',
  name: "Bass Pro Shops and Cabela's CLUB Business Card",
  issuer: 'Capital One',
  rewardsProgram: 'Store Rewards',
  rewardsCurrency: 'CLUB Points',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: false,
  annualFee: 0,
  isBusiness: true,
  creditNeeded: 'good',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: "CLUB Points are store credit at Bass Pro Shops and Cabela's. Capital One's page doesn't list the rate elsewhere; 1x is assumed.",
  defaultSignUpBonus: { amount: 7500, currency: 'CLUB Points', spendRequired: 1000, windowMonths: 2 },
  rewardTiers: [
    {
      id: 'club-business-stores',
      name: "Bass Pro Shops & Cabela's",
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['sporting-goods-stores'],
      onlyWhen: "Bass Pro Shops and Cabela's purchases"
    }
  ]
};
