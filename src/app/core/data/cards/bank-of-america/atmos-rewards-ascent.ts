import type { Card } from '../../../models/card.model';

export const ATMOS_REWARDS_ASCENT: Card = {
  id: 'bofa-atmos-rewards-ascent',
  name: 'Atmos Rewards Ascent Visa Signature',
  issuer: 'Bank of America',
  rewardsProgram: 'Atmos Rewards',
  rewardsCurrency: 'Atmos Points',
  network: 'VISA',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 95,
  isBusiness: false,
  creditNeeded: 'good',
  networkTier: 'Visa Signature',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: '10% more points with an eligible Bank of America account. Free checked bag and preferred boarding for you and up to 6 guests.',
  defaultSignUpBonus: { amount: 50000, currency: 'Atmos Points', spendRequired: 1500, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'atmos-ascent-2x',
      name: 'Gas, EV Charging, Cable, Streaming & Transit',
      rewardRate: 2.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['gas-stations', 'ev-charging', 'internet-cable', 'streaming', 'transit']
    },
    {
      id: 'atmos-ascent-airlines',
      name: 'Alaska & Hawaiian Airlines',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['airfare'],
      onlyWhen: 'Alaska Airlines and Hawaiian Airlines purchases'
    }
  ]
};
