import type { Card } from '../../../models/card.model';

export const COINBASE_ONE_CARD: Card = {
  id: 'cardless-coinbase-one-card',
  name: 'Coinbase One Card',
  issuer: 'Cardless',
  rewardsProgram: 'Coinbase Bitcoin Back',
  rewardsCurrency: 'Cashback',
  network: 'AMEX',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'good',
  baseRewardRate: 2.0,
  termsCheckedOn: '2026-10-11',
  note: 'Rewards are bitcoin. Requires a paid Coinbase One membership ($49.99+ a year). Earns 2% to 4% depending on assets held on Coinbase.',
  rewardTiers: [
    {
      id: 'coinbase-one-travel-portal',
      name: 'Coinbase One Card Travel',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare', 'hotels', 'car-rentals'],
      onlyWhen: 'Booked through Coinbase One Card Travel'
    }
  ]
};
