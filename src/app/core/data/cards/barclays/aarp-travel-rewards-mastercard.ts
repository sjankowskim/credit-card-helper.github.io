import type { Card } from '../../../models/card.model';

export const AARP_TRAVEL_REWARDS_MASTERCARD: Card = {
  id: 'barclays-aarp-travel-rewards-mastercard',
  name: 'AARP Travel Rewards Mastercard from Barclays',
  issuer: 'Barclays',
  rewardsProgram: 'Barclays Cash Back',
  rewardsCurrency: 'Cashback',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  defaultSignUpBonus: { amount: 100, currency: 'Cashback', spendRequired: 500, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'aarp-travel-3pct',
      name: 'Airfare, Hotels & Car Rentals',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare', 'hotels', 'car-rentals']
    },
    {
      id: 'aarp-travel-restaurants',
      name: 'Restaurants',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining']
    }
  ]
};
