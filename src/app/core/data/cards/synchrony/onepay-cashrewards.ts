import type { Card } from '../../../models/card.model';

export const ONEPAY_CASHREWARDS: Card = {
  id: 'synchrony-onepay-cashrewards',
  name: 'OnePay CashRewards Mastercard',
  issuer: 'Synchrony',
  rewardsProgram: 'Synchrony Cash Back',
  rewardsCurrency: 'Cashback',
  network: 'MASTERCARD',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'good',
  baseRewardRate: 1.5,
  termsCheckedOn: '2026-10-11',
  note: "Walmart's credit card. Cash back is redeemed as a statement credit or to a OnePay Cash account.",
  rewardTiers: [
    {
      id: 'onepay-walmart',
      name: 'Walmart',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['department-stores', 'grocery-stores'],
      onlyWhen: 'Walmart purchases',
      note: '5% with a Walmart+ membership.'
    }
  ]
};
