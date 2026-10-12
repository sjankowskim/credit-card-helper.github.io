import type { Card } from '../../../models/card.model';

export const PLATINUM_REWARDS_NO_FEE: Card = {
  id: 'credit-one-platinum-rewards-no-fee',
  name: 'Credit One Bank Platinum Rewards Visa with No Annual Fee',
  issuer: 'Credit One',
  rewardsProgram: 'Credit One Cash Back',
  rewardsCurrency: 'Cashback',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'fair',
  baseRewardRate: 0.0,
  termsCheckedOn: '2026-10-11',
  rewardTiers: [
    {
      id: 'platinum-rewards-no-fee-everyday',
      name: 'Gas, Grocery, Internet/Cable & Phone',
      rewardRate: 1.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['gas-stations', 'grocery-stores', 'internet-cable', 'phone'],
      note: 'Includes satellite TV.'
    }
  ]
};
