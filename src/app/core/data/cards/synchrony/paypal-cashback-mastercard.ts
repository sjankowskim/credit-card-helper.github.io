import type { Card } from '../../../models/card.model';

export const PAYPAL_CASHBACK_MASTERCARD: Card = {
  id: 'synchrony-paypal-cashback-mastercard',
  name: 'PayPal Cashback Mastercard',
  issuer: 'Synchrony',
  rewardsProgram: 'Synchrony Cash Back',
  rewardsCurrency: 'Cashback',
  network: 'MASTERCARD',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 1.5,
  termsCheckedOn: '2026-10-11',
  rewardTiers: [
    {
      id: 'paypal-cashback-paypal',
      name: 'PayPal Checkout',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['online-retail'],
      onlyWhen: 'Checking out with PayPal'
    }
  ]
};
