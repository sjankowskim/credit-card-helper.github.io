import type { Card } from '../../../models/card.model';

export const VENMO_CREDIT_CARD: Card = {
  id: 'synchrony-venmo-credit-card',
  name: 'Venmo Credit Card',
  issuer: 'Synchrony',
  rewardsProgram: 'Synchrony Cash Back',
  rewardsCurrency: 'Cashback',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  rewardTiers: [
    {
      id: 'venmo-dining-entertainment',
      name: 'Dining & Entertainment',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining', 'entertainment', 'streaming'],
      note: 'Entertainment includes movie theaters, streaming, concerts, and game stores. Splitting the purchase in Venmo adds 1%.'
    },
    {
      id: 'venmo-pay-with-venmo',
      name: 'Paying with Venmo',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['online-retail'],
      onlyWhen: 'Checking out with Venmo or paying a business on Venmo'
    }
  ]
};
