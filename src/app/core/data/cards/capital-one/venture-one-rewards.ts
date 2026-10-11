import type { Card } from '../../../models/card.model';

export const VENTURE_ONE_REWARDS: Card = {
  id: 'capital-one-ventureone-rewards',
  name: 'Capital One VentureOne Rewards',
  issuer: 'Capital One',
  rewardsProgram: 'Capital One Rewards',
  rewardsCurrency: 'Capital One Miles',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 1.25,
  termsCheckedOn: '2026-10-11',
  defaultSignUpBonus: { amount: 20000, currency: 'Capital One Miles', spendRequired: 500, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'ventureone-travel-portal',
      name: 'Hotels & Rental Cars',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels', 'car-rentals'],
      onlyWhen: 'Booked through Capital One Travel'
    }
  ]
};
