import type { Card } from '../../../models/card.model';

export const AUTOGRAPH: Card = {
  id: 'wells-fargo-autograph',
  name: 'Wells Fargo Autograph',
  issuer: 'Wells Fargo',
  rewardsProgram: 'Wells Fargo Rewards',
  rewardsCurrency: 'Wells Fargo Rewards',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  defaultSignUpBonus: { amount: 20000, currency: 'Wells Fargo Rewards', spendRequired: 1000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'autograph-3x',
      name: 'Dining, Travel, Gas, Transit, Streaming & Phone Plans',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining', 'travel', 'gas-stations', 'transit', 'streaming', 'phone']
    }
  ]
};
