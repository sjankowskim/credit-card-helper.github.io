import type { Card } from '../../../models/card.model';

export const XBOX_MASTERCARD: Card = {
  id: 'barclays-xbox-mastercard',
  name: 'Xbox Mastercard',
  issuer: 'Barclays',
  rewardsProgram: 'Store Rewards',
  rewardsCurrency: 'Xbox Card Points',
  network: 'MASTERCARD',
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: 'Points are worth 1¢ toward purchases at xbox.com, Microsoft.com, on console, and in-game. Bonus points are not earned through mobile wallets or mobile card readers. New accounts also get 3 months of Game Pass Ultimate after the first purchase.',
  defaultSignUpBonus: { amount: 5000, currency: 'Xbox Card Points', spendRequired: 1, windowMonths: 6 },
  rewardTiers: [
    {
      id: 'xbox-streaming-delivery',
      name: 'Streaming & Food Delivery',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['streaming', 'food-delivery'],
      note: 'Streaming includes video, music, and audiobook services like Netflix, Spotify, and Audible.'
    },
    {
      id: 'xbox-microsoft-store',
      name: 'Microsoft Store',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['electronics-stores'],
      onlyWhen: 'The digital Microsoft Store (xbox.com, microsoft.com, Xbox consoles, and the Xbox and Microsoft Store apps), excluding in-game stores'
    }
  ]
};
