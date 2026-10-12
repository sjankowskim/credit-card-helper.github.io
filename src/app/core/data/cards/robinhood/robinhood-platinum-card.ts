import type { Card } from '../../../models/card.model';

// Issued by Coastal Community Bank; Robinhood Credit manages the program
export const ROBINHOOD_PLATINUM_CARD: Card = {
  id: 'robinhood-platinum-card',
  name: 'Robinhood Platinum Card',
  issuer: 'Robinhood',
  rewardsProgram: 'Robinhood Cash Back',
  rewardsCurrency: 'Cashback',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 695,
  isBusiness: false,
  baseRewardRate: 3.0,
  termsCheckedOn: '2026-10-11',
  note: 'Includes Robinhood Gold. Priority Pass lounges. Global Entry/TSA PreCheck credit. WHOOP, Function Health, and One Medical memberships.',
  rewardTiers: [
    {
      id: 'robinhood-platinum-dining',
      name: 'Dining',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining']
    },
    {
      id: 'robinhood-platinum-flights',
      name: 'Flights',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'Booked in the Robinhood app'
    },
    {
      id: 'robinhood-platinum-hotels',
      name: 'Hotels',
      rewardRate: 10.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels'],
      onlyWhen: 'Booked in the Robinhood app'
    }
  ],
  benefits: [
    {
      id: 'robinhood-platinum-flight-credit',
      name: 'Flight credit',
      amount: 150,
      period: 'SEMIANNUAL',
      resetBasis: 'CALENDAR',
      note: 'Flights booked in the app or directly with the airline'
    },
    {
      id: 'robinhood-platinum-hotel-credit',
      name: 'Hotel credit',
      amount: 250,
      period: 'SEMIANNUAL',
      resetBasis: 'CALENDAR',
      note: 'Premium hotels booked in the app'
    },
    {
      id: 'robinhood-platinum-restaurant-credit',
      name: 'Restaurant credit',
      amount: 250,
      period: 'ANNUAL',
      resetBasis: 'CALENDAR',
      note: 'Paid out monthly at eligible restaurants'
    },
    {
      id: 'robinhood-platinum-doordash',
      name: 'DoorDash promo',
      amount: 10,
      period: 'MONTHLY',
      resetBasis: 'CALENDAR'
    },
    {
      id: 'robinhood-platinum-waymo',
      name: 'Waymo credit',
      amount: 250,
      period: 'ANNUAL',
      resetBasis: 'CALENDAR'
    }
  ]
};
