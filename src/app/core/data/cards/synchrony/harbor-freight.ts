import type { Card } from '../../../models/card.model';

// The welcome offer is 10% off your first purchase, so no default sign-up bonus is listed
export const HARBOR_FREIGHT: Card = {
  id: 'synchrony-harbor-freight',
  name: 'Harbor Freight Credit Card',
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
  note: 'Only works at Harbor Freight. Rewards are Harbor Freight Money; you can take 0% equal payments on $299+ instead.',
  rewardTiers: [
    {
      id: 'harbor-freight-harbor-freight',
      name: 'Harbor Freight',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['home-improvement'],
      onlyWhen: 'Harbor Freight purchases'
    }
  ]
};
