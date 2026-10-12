import type { Card } from '../../../models/card.model';

export const PLATINUM_X5: Card = {
  id: 'credit-one-platinum-x5',
  name: 'Credit One Bank Platinum X5 Visa Signature',
  issuer: 'Credit One',
  rewardsProgram: 'Credit One Cash Back',
  rewardsCurrency: 'Cashback',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 95,
  isBusiness: false,
  creditNeeded: 'fair',
  networkTier: 'Visa Signature',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  rewardTiers: [
    {
      id: 'platinum-x5-5pct',
      name: 'Gas, Grocery, Internet/Cable & Phone',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['gas-stations', 'grocery-stores', 'internet-cable', 'phone'],
      spendingCap: { amount: 5000, period: 'ANNUAL' },
      note: 'The $5,000 cap is combined across these categories each year, then 1%. Includes satellite TV.'
    }
  ]
};
