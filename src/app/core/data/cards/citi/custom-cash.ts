import type { Card } from '../../../models/card.model';

export const CUSTOM_CASH: Card = {
  id: 'citi-custom-cash',
  name: 'Citi Custom Cash',
  issuer: 'Citi',
  rewardsProgram: 'Citi ThankYou',
  rewardsCurrency: 'Cashback',
  network: 'MASTERCARD',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'good',
  baseRewardRate: 1.0,
  // Closed to new applicants on 2026-05-28
  discontinued: true,
  termsCheckedOn: '2026-10-11',
  rewardTiers: [
    {
      id: 'citi-custom-cash-bonus',
      name: 'Bonus Categories',
      rewardRate: 5.0,
      behavior: { type: 'AUTO_TOP_SPEND', maxCategories: 1 },
      eligibleCategories: [
        'dining',
        'gas-stations',
        'grocery-stores',
        'travel',
        'transit',
        'streaming',
        'drugstores',
        'home-improvement',
        'fitness',
        'live-entertainment'
      ],
      spendingCap: { amount: 500, period: 'MONTHLY' }
    },
    {
      id: 'citi-custom-cash-travel-portal',
      name: 'Hotels, Car Rentals & Attractions',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels', 'car-rentals'],
      onlyWhen: 'Booked through Citi Travel',
      note: 'Citi listed this through 6/30/2026; check whether it has been extended.'
    }
  ]
};
