import type { Card } from '../../../models/card.model';

// The welcome offer varies by member, so no default sign-up bonus is listed
export const MYWALGREENS: Card = {
  id: 'synchrony-mywalgreens',
  name: 'myWalgreens Credit Card',
  issuer: 'Synchrony',
  rewardsProgram: 'Store Rewards',
  rewardsCurrency: 'Cashback',
  network: 'STORE',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'fair',
  baseRewardRate: 0.0,
  termsCheckedOn: '2026-10-11',
  note: 'Only works at Walgreens. Rewards are Walgreens Cash. A myWalgreens Mastercard version also exists.',
  rewardTiers: [
    {
      id: 'mywalgreens-walgreens',
      name: 'Walgreens',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['drugstores'],
      onlyWhen: 'Walgreens purchases',
      note: 'Walgreens-brand products earn 10%.'
    }
  ]
};
