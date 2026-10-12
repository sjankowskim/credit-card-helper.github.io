import type { Card } from '../../../models/card.model';

// The welcome offer is a $30 reward after a first purchase on the day you are approved, so no default sign-up bonus is listed
export const DICKS_CREDIT_CARD: Card = {
  id: 'synchrony-dicks-credit-card',
  name: "DICK'S Credit Card",
  issuer: 'Synchrony',
  rewardsProgram: 'Store Rewards',
  rewardsCurrency: 'Cashback',
  network: 'STORE',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 0.0,
  termsCheckedOn: '2026-10-11',
  note: "Only works at DICK'S brands. Rewards are ScoreCard points (300 points = $10 reward). A DICK'S Mastercard version also exists.",
  rewardTiers: [
    {
      id: 'dicks-dicks',
      name: "DICK'S Brands",
      rewardRate: 10.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['sporting-goods-stores'],
      onlyWhen: "DICK'S Sporting Goods, Golf Galaxy, and other DICK'S brands"
    }
  ]
};
