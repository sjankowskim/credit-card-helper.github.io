import type { Card } from '../../../models/card.model';

export const SUN_COUNTRY_VISA: Card = {
  id: 'synchrony-sun-country-visa',
  name: 'Sun Country Visa Signature',
  issuer: 'Synchrony',
  rewardsProgram: 'Sun Country Rewards',
  rewardsCurrency: 'Sun Country Points',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  defaultSignUpBonus: { amount: 25000, currency: 'Sun Country Points', spendRequired: 1000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'sun-country-gas-grocery',
      name: 'Gas & Grocery',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['gas-stations', 'grocery-stores']
    },
    {
      id: 'sun-country-sun-country',
      name: 'Sun Country',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'Sun Country purchases',
      note: 'Sun Country flights also earn 2x as a Sun Country Rewards member (5x total).'
    }
  ]
};
