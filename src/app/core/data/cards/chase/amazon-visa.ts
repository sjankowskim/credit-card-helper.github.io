import type { Card } from '../../../models/card.model';

// The welcome offer is an Amazon gift card on approval with no spend requirement, so no default sign-up bonus is listed
export const AMAZON_VISA: Card = {
  id: 'chase-amazon-visa',
  name: 'Amazon Visa',
  issuer: 'Chase',
  rewardsProgram: 'Chase Cash Back',
  rewardsCurrency: 'Cashback',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'good',
  networkTier: 'Visa Signature',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  referralCapPerYear: 500,
  rewardTiers: [
    {
      id: 'amazon-visa-2pct',
      name: 'Gas, Restaurants, Transit & Rideshare',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['gas-stations', 'dining', 'transit', 'rideshare']
    },
    {
      id: 'amazon-visa-amazon',
      name: 'Amazon & Whole Foods',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['online-retail', 'grocery-stores'],
      onlyWhen: 'Amazon.com, Audible, and Whole Foods Market'
    },
    {
      id: 'amazon-visa-travel-portal',
      name: 'Chase Travel',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['travel'],
      onlyWhen: 'Booked through Chase Travel'
    }
  ]
};
