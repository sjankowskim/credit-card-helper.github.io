import type { Card } from '../../../models/card.model';

export const VENTURE_ONE_BUSINESS: Card = {
  id: 'capital-one-ventureone-business',
  name: 'Capital One VentureOne Business',
  issuer: 'Capital One',
  rewardsProgram: 'Capital One Rewards',
  rewardsCurrency: 'Capital One Miles',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: false,
  annualFee: 0,
  isBusiness: true,
  baseRewardRate: 1.5,
  termsCheckedOn: '2026-10-11',
  defaultSignUpBonus: { amount: 50000, currency: 'Capital One Miles', spendRequired: 4500, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'ventureone-business-travel-portal',
      name: 'Hotels & Rental Cars',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels', 'car-rentals'],
      onlyWhen: 'Booked through Capital One Business Travel'
    }
  ]
};
