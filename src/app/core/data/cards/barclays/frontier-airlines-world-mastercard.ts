import type { Card } from '../../../models/card.model';

// The 60,000-mile offer includes 10,000 for adding an authorized user; the default bonus is the 50,000 after $500 and paying the fee.
export const FRONTIER_AIRLINES_WORLD_MASTERCARD: Card = {
  id: 'barclays-frontier-airlines-world-mastercard',
  name: 'Frontier Airlines World Mastercard',
  issuer: 'Barclays',
  rewardsProgram: 'Frontier Miles',
  rewardsCurrency: 'Frontier Miles',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 99,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: '$100 flight voucher each anniversary you spend $2,500 in the cardmembership year. Two free checked bags.',
  defaultSignUpBonus: { amount: 50000, currency: 'Frontier Miles', spendRequired: 500, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'frontier-restaurants',
      name: 'Restaurants',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['dining']
    },
    {
      id: 'frontier-frontier',
      name: 'Frontier',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'Frontier purchases (up to 17x with membership, non-Basic fares)'
    }
  ]
};
