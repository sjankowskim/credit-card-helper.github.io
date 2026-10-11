import type { Card } from '../../../models/card.model';

export const VENTURE_X_REWARDS: Card = {
  id: 'capital-one-venture-x-rewards',
  name: 'Capital One Venture X Rewards',
  issuer: 'Capital One',
  rewardsProgram: 'Capital One Rewards',
  rewardsCurrency: 'Capital One Miles',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 395,
  isBusiness: false,
  baseRewardRate: 2.0,
  imageUrl: '/images/cards/capital-one-venture-x-rewards.png',
  rewardTiers: [],
  // TODO(Phase 6): verify against Capital One's current terms
  benefits: [
    {
      id: 'venture-x-travel-credit',
      name: 'Capital One Travel credit',
      amount: 300,
      period: 'ANNUAL',
      resetBasis: 'CARDMEMBER_YEAR',
      note: 'Bookings made through Capital One Travel'
    },
    {
      id: 'venture-x-anniversary-bonus',
      name: 'Anniversary bonus',
      amount: 100,
      period: 'ANNUAL',
      resetBasis: 'CARDMEMBER_YEAR',
      note: 'Paid as 10,000 bonus miles each account anniversary'
    }
  ]
};
