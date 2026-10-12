import type { Card } from '../../../models/card.model';

// Welcome offer is $200 in Bilt Cash after approval, not points, so no default sign-up bonus is listed.
export const BILT_OBSIDIAN: Card = {
  id: 'cardless-bilt-obsidian',
  name: 'Bilt Obsidian',
  issuer: 'Cardless',
  rewardsProgram: 'BILT',
  rewardsCurrency: 'Bilt Points',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 95,
  isBusiness: false,
  creditNeeded: 'excellent',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  rewardTiers: [
    {
      id: 'bilt-obsidian-3x',
      name: '3x Dining or Grocery',
      rewardRate: 3.0,
      behavior: { type: 'USER_CHOICE', maxSelections: 1 },
      eligibleCategories: ['dining', 'grocery-stores'],
      note: 'Chosen for the calendar year. Grocery is capped at $25,000 a year.'
    },
    {
      id: 'bilt-obsidian-travel',
      name: 'Travel',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['travel']
    },
    {
      id: 'bilt-obsidian-housing',
      name: 'Rent & Mortgage',
      rewardRate: 1.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['rent', 'mortgage'],
      note: 'Up to 1x (some sources say 1.25x) depending on everyday spend or Bilt Cash.'
    }
  ],
  benefits: [
    {
      id: 'bilt-obsidian-hotel-credit',
      name: 'Bilt Travel hotel credit',
      amount: 50,
      period: 'SEMIANNUAL',
      resetBasis: 'CALENDAR',
      note: 'Hotel bookings through Bilt Travel'
    }
  ]
};
