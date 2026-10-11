import { Card, CardNetwork, CardIssuer, RewardsProgram } from '../../../models/card.model';

export const CITI_CUSTOM_CASH: Card = {
  id: 'citi-custom-cash',
  name: 'Citi Custom Cash',
  issuer: CardIssuer.CITI,
  rewardsProgram: RewardsProgram.CITI_THANKYOU,
  rewardsCurrency: 'Cashback',
  network: CardNetwork.MASTERCARD,
  hasForeignTransactionFee: true,
  hasTravelPartnerAccess: false,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  baseRewardRate: 1.0,
  imageUrl: '/images/cards/citi-custom-cash.png',
  rewardTiers: [
    {
      id: 'citi-custom-cash-flights-and-hotels',
      name: 'Flights and Hotels',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      // TODO(Phase 6): verify against Citi's current terms; this looks like a Citi Travel portal rate
      eligibleCategories: ['airfare', 'hotels']
    },
    {
      id: 'citi-custom-cash-bonus',
      name: 'Bonus Categories',
      rewardRate: 5.0,
      behavior: { type: 'AUTO_TOP_SPEND', maxCategories: 1 },
      eligibleCategories: [
        'dining',
        'gas-stations',
        'grocery-stores',
        'travel',
        'transit',
        'streaming',
        'drugstores',
        'home-improvement',
        'fitness',
        'live-entertainment'
      ],
      spendingCap: { amount: 500, period: 'MONTHLY' }
    }
  ]
};
