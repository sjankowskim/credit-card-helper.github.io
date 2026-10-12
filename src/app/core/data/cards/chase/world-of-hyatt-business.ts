import type { Card } from '../../../models/card.model';

export const WORLD_OF_HYATT_BUSINESS: Card = {
  id: 'chase-world-of-hyatt-business',
  name: 'World of Hyatt Business',
  issuer: 'Chase',
  rewardsProgram: 'World of Hyatt',
  rewardsCurrency: 'World of Hyatt Points',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: false,
  annualFee: 199,
  isBusiness: true,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: 'Spend $50,000 in a calendar year to get 10% of redeemed points back for the rest of the year.',
  defaultSignUpBonus: { amount: 70000, currency: 'World of Hyatt Points', spendRequired: 7000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'hyatt-business-top-3',
      name: 'Top 3 Categories',
      rewardRate: 2.0,
      behavior: { type: 'AUTO_TOP_SPEND', maxCategories: 3 },
      eligibleCategories: [
        'dining',
        'shipping',
        'airfare',
        'transit',
        'rideshare',
        'advertising',
        'car-rentals',
        'gas-stations',
        'internet-cable',
        'phone'
      ],
      note: 'Your 3 highest-spend categories each quarter. Airfare must be bought from airlines; advertising is social media and search engines.'
    },
    {
      id: 'hyatt-business-fitness',
      name: 'Fitness',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['fitness']
    },
    {
      id: 'hyatt-business-hyatt',
      name: 'Hyatt',
      rewardRate: 4.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels'],
      onlyWhen: 'Hyatt hotels and resorts'
    }
  ],
  benefits: [
    {
      id: 'hyatt-business-hyatt-credit',
      name: 'Hyatt credit',
      amount: 100,
      period: 'ANNUAL',
      resetBasis: 'CARDMEMBER_YEAR',
      note: '$50 back on each of 2 Hyatt purchases of $50 or more'
    }
  ]
};
