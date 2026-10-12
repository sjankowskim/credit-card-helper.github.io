import type { Card } from '../../../models/card.model';

export const VEGAS_GOLDEN_KNIGHTS: Card = {
  id: 'credit-one-vegas-golden-knights',
  name: 'Credit One Bank Vegas Golden Knights Credit Card',
  issuer: 'Credit One',
  rewardsProgram: 'Credit One Cash Back',
  rewardsCurrency: 'Cashback',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 0.0,
  termsCheckedOn: '2026-10-11',
  note: 'Annual fee depends on credit: $0 (excellent), $39 (average), or $75 the first year then $99 (rebuilding). Vegas Golden Knights fan offers.',
  rewardTiers: [
    {
      id: 'vegas-golden-knights-everyday',
      name: 'Gas, Grocery, Internet/Cable & Phone',
      rewardRate: 1.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['gas-stations', 'grocery-stores', 'internet-cable', 'phone'],
      note: 'Includes satellite TV.'
    }
  ]
};
