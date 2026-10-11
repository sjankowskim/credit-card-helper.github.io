import type { Card } from '../../../models/card.model';

// Sources conflict on the welcome offer (30,000 vs 50,000 points), so no default sign-up bonus is set.
export const TRAVEL_REWARDS_BUSINESS: Card = {
  id: 'bofa-business-advantage-travel-rewards',
  name: 'Bank of America Business Advantage Travel Rewards',
  issuer: 'Bank of America',
  rewardsProgram: 'Bank of America Rewards',
  rewardsCurrency: 'Bank of America Points',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: false,
  annualFee: 0,
  isBusiness: true,
  baseRewardRate: 1.5,
  termsCheckedOn: '2026-10-11',
  note: 'Preferred Rewards for Business boosts the rates by 25% to 75%.',
  rewardTiers: [
    {
      id: 'business-travel-rewards-travel-center',
      name: 'Travel',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['travel'],
      onlyWhen: 'Booked through the Bank of America Travel Center'
    }
  ]
};
