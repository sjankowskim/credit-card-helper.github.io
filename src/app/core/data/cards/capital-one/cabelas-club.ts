import type { Card } from '../../../models/card.model';

export const CABELAS_CLUB: Card = {
  id: 'capital-one-cabelas-club-card',
  name: "Cabela's CLUB Card",
  issuer: 'Capital One',
  rewardsProgram: 'Store Rewards',
  rewardsCurrency: 'CLUB Points',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: "CLUB Points are store credit at Bass Pro Shops and Cabela's. Capital One's page doesn't list the rate elsewhere; 1x is assumed.",
  rewardTiers: [
    {
      id: 'cabelas-club-stores',
      name: "Bass Pro Shops & Cabela's",
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['sporting-goods-stores'],
      onlyWhen: "Bass Pro Shops and Cabela's purchases"
    }
  ]
};
