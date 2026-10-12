import type { Card } from '../../../models/card.model';

export const BILT_PALLADIUM: Card = {
  id: 'cardless-bilt-palladium',
  name: 'Bilt Palladium',
  issuer: 'Cardless',
  rewardsProgram: 'BILT',
  rewardsCurrency: 'Bilt Points',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 495,
  isBusiness: false,
  creditNeeded: 'excellent',
  baseRewardRate: 2.0,
  termsCheckedOn: '2026-10-11',
  defaultSignUpBonus: { amount: 50000, currency: 'Bilt Points', spendRequired: 4000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'bilt-palladium-housing',
      name: 'Rent & Mortgage',
      rewardRate: 1.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['rent', 'mortgage'],
      note: 'Varies from 0.5x to 1.25x with how much everyday spend you put on the card compared to your housing payment (1x at 75%). You can instead unlock 1x with Bilt Cash.'
    }
  ],
  benefits: [
    {
      id: 'bilt-palladium-hotel-credit',
      name: 'Bilt Travel hotel credit',
      amount: 200,
      period: 'SEMIANNUAL',
      resetBasis: 'CALENDAR',
      note: 'Hotel bookings through Bilt Travel, usually 2+ nights'
    },
    {
      id: 'bilt-palladium-bilt-cash',
      name: 'Bilt Cash',
      amount: 200,
      period: 'ANNUAL',
      resetBasis: 'CALENDAR',
      note: 'Bilt Cash over $100 expires at the end of the year'
    }
  ]
};
