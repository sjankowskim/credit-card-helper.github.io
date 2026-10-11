import type { Card } from '../../../models/card.model';

export const LUFTHANSA_MILES_MORE_WORLD_ELITE_MASTERCARD: Card = {
  id: 'barclays-lufthansa-miles-more',
  name: 'Lufthansa Miles & More World Elite Mastercard',
  issuer: 'Barclays',
  rewardsProgram: 'Miles & More',
  rewardsCurrency: 'Miles & More Miles',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 89,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: 'Two Lufthansa Business Lounge vouchers and a Companion Ticket each year. The fee is waived for Senator and HON Circle members.',
  defaultSignUpBonus: { amount: 70000, currency: 'Miles & More Miles', spendRequired: 4000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'miles-more-partner-airlines',
      name: 'Partner Airline Tickets',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'Miles & More partner airline tickets'
    }
  ]
};
