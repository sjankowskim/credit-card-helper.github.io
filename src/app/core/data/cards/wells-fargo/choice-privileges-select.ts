import type { Card } from '../../../models/card.model';

export const CHOICE_PRIVILEGES_SELECT: Card = {
  id: 'wells-fargo-choice-privileges-select',
  name: 'Choice Privileges Select Mastercard',
  issuer: 'Wells Fargo',
  rewardsProgram: 'Choice Privileges',
  rewardsCurrency: 'Choice Privileges Points',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 95,
  isBusiness: false,
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: 'Choice Privileges Platinum Elite status and 25% bonus points on qualifying stays.',
  defaultSignUpBonus: { amount: 60000, currency: 'Choice Privileges Points', spendRequired: 3000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'choice-privileges-select-everyday',
      name: 'Gas, Grocery, Home Improvement & Phone Plans',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['gas-stations', 'grocery-stores', 'home-improvement', 'phone']
    },
    {
      id: 'choice-privileges-select-choice',
      name: 'Choice Hotels',
      rewardRate: 10.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels'],
      onlyWhen: 'Participating Choice Hotels properties and Choice Privileges point purchases'
    }
  ]
};
