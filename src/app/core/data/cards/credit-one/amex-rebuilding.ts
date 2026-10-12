import type { Card } from '../../../models/card.model';

export const AMEX_REBUILDING: Card = {
  id: 'credit-one-amex-rebuilding',
  name: 'Credit One Bank American Express for Rebuilding Credit',
  issuer: 'Credit One',
  rewardsProgram: 'Credit One Cash Back',
  rewardsCurrency: 'Cashback',
  network: 'AMEX',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 99,
  isBusiness: false,
  creditNeeded: 'rebuilding',
  baseRewardRate: 0.0,
  termsCheckedOn: '2026-10-11',
  note: 'For rebuilding credit. Annual fee is $75 the first year, then $99 (billed $8.25 a month).',
  rewardTiers: [
    {
      id: 'amex-rebuilding-everyday',
      name: 'Gas, Grocery, Internet/Cable & Phone',
      rewardRate: 1.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['gas-stations', 'grocery-stores', 'internet-cable', 'phone'],
      note: 'Includes satellite TV.'
    }
  ]
};
