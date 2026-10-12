import type { Card } from '../../../models/card.model';

export const BRITISH_AIRWAYS: Card = {
  id: 'chase-british-airways',
  name: 'British Airways Visa Signature',
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
  note: 'Travel Together Ticket each calendar year you spend $30,000.',
  defaultSignUpBonus: { amount: 75000, currency: 'Avios', spendRequired: 5000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'british-airways-hotels',
      name: 'Hotels Booked Direct',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels'],
      note: 'Booked directly with the hotel.'
    },
    {
      id: 'british-airways-flights',
      name: 'British Airways, Aer Lingus & Iberia',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'British Airways, Aer Lingus & Iberia flights'
    }
  ]
};
