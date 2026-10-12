import type { Card } from '../../../models/card.model';

// Issued by Coastal Community Bank; Robinhood Credit manages the program
export const ROBINHOOD_GOLD_CARD: Card = {
  id: 'robinhood-gold-card',
  name: 'Robinhood Gold Card',
  issuer: 'Robinhood',
  rewardsProgram: 'Robinhood Cash Back',
  rewardsCurrency: 'Cashback',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 3.0,
  termsCheckedOn: '2026-10-11',
  note: 'Requires a paid Robinhood Gold membership. Cash back is redeemed to a Robinhood brokerage account.',
  rewardTiers: []
};
