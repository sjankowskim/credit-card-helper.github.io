import type { Card } from '../../../models/card.model';

export const BILT_BLUE: Card = {
  id: 'cardless-bilt-blue',
  name: 'Bilt Blue',
  issuer: 'Cardless',
  rewardsProgram: 'BILT',
  rewardsCurrency: 'Bilt Points',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'good',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  rewardTiers: [
    {
      id: 'bilt-blue-housing',
      name: 'Rent & Mortgage',
      rewardRate: 1.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['rent', 'mortgage'],
      note: '1x with 4% Bilt Cash, or 0.5x to 1.25x depending on how much everyday spend you put on the card.'
    }
  ]
};
