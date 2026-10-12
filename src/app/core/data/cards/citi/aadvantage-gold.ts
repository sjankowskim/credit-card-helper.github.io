import type { Card } from '../../../models/card.model';

// Only one review lists this card's terms; check with Citi.
export const AADVANTAGE_GOLD: Card = {
  id: 'citi-aadvantage-gold',
  name: 'Citi / AAdvantage Gold World Elite Mastercard',
  issuer: 'Citi',
  rewardsProgram: 'American Airlines AAdvantage',
  rewardsCurrency: 'AAdvantage Miles',
  network: 'MASTERCARD',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 50,
  isBusiness: false,
  baseRewardRate: 1.0,
  discontinued: true,
  termsCheckedOn: '2026-10-11',
  note: 'Not open to new applicants; it holds accounts moved from the Barclays Aviator Blue. 25% off eligible inflight food and drinks.',
  rewardTiers: []
};
