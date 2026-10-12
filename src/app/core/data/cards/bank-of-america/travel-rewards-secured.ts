import type { Card } from '../../../models/card.model';

export const TRAVEL_REWARDS_SECURED: Card = {
  id: 'bofa-travel-rewards-secured',
  name: 'Bank of America Travel Rewards Secured',
  issuer: 'Bank of America',
  rewardsProgram: 'Bank of America Rewards',
  rewardsCurrency: 'Bank of America Points',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'rebuilding',
  baseRewardRate: 1.5,
  termsCheckedOn: '2026-10-11',
  note: 'Secured card: $200 to $5,000 refundable deposit.',
  rewardTiers: [
    {
      id: 'travel-rewards-secured-travel-center',
      name: 'Travel',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['travel'],
      onlyWhen: 'Booked through the Bank of America Travel Center'
    }
  ]
};
