import type { Card } from '../../../models/card.model';

export const DOUBLE_CASH: Card = {
  id: 'citi-double-cash',
  name: 'Citi Double Cash',
  issuer: 'Citi',
  rewardsProgram: 'Citi ThankYou',
  rewardsCurrency: 'ThankYou Points',
  network: 'MASTERCARD',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'good',
  baseRewardRate: 2.0,
  termsCheckedOn: '2026-10-11',
  defaultSignUpBonus: { amount: 20000, currency: 'ThankYou Points', spendRequired: 1500, windowMonths: 6 },
  rewardTiers: [
    {
      id: 'double-cash-travel-portal',
      name: 'Hotels, Car Rentals & Attractions',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels', 'car-rentals'],
      onlyWhen: 'Booked through Citi Travel',
      note: 'Sources disagree on this rate (3% to 5%); check with Citi.'
    }
  ]
};
