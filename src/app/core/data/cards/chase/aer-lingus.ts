import type { Card } from '../../../models/card.model';

export const AER_LINGUS: Card = {
  id: 'chase-aer-lingus',
  name: 'Aer Lingus Visa Signature',
  issuer: 'Chase',
  rewardsProgram: 'Avios',
  rewardsCurrency: 'Avios',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 95,
  isBusiness: false,
  creditNeeded: 'good',
  networkTier: 'Visa Signature',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: 'Economy companion ticket each calendar year you spend $30,000.',
  defaultSignUpBonus: { amount: 75000, currency: 'Avios', spendRequired: 5000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'aer-lingus-hotels',
      name: 'Hotels Booked Direct',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels'],
      note: 'Booked directly with the hotel.'
    },
    {
      id: 'aer-lingus-flights',
      name: 'Aer Lingus, British Airways & Iberia',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'Aer Lingus, British Airways & Iberia flights'
    }
  ]
};
