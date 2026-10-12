import type { Card } from '../../../models/card.model';

export const IBERIA: Card = {
  id: 'chase-iberia',
  name: 'Iberia Visa Signature',
  issuer: 'Chase',
  rewardsProgram: 'Avios',
  rewardsCurrency: 'Avios',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 95,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  defaultSignUpBonus: { amount: 75000, currency: 'Avios', spendRequired: 5000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'iberia-hotels',
      name: 'Hotels Booked Direct',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels'],
      note: 'Booked directly with the hotel.'
    },
    {
      id: 'iberia-flights',
      name: 'Iberia, British Airways & Aer Lingus',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'Iberia, British Airways & Aer Lingus flights'
    }
  ]
};
