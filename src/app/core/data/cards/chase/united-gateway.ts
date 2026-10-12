import type { Card } from '../../../models/card.model';

export const UNITED_GATEWAY: Card = {
  id: 'chase-united-gateway',
  name: 'United Gateway Card',
  issuer: 'Chase',
  rewardsProgram: 'United MileagePlus',
  rewardsCurrency: 'MileagePlus Miles',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'good',
  networkTier: 'Visa Signature',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: '25% back on United inflight purchases. After $10,000 spend in a calendar year: 2 free checked bags and 10% off award flights.',
  defaultSignUpBonus: { amount: 40000, currency: 'MileagePlus Miles', spendRequired: 1000, windowMonths: 3 },
  referralCapPerYear: 100000,
  rewardTiers: [
    {
      id: 'united-gateway-2x',
      name: 'Gas, Transit & Rideshare',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['gas-stations', 'transit', 'rideshare']
    },
    {
      id: 'united-gateway-united',
      name: 'United',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'United purchases',
      note: 'United flights also earn 3x as a MileagePlus member (5x total), or 6x after $10,000 spend in a calendar year.'
    }
  ]
};
