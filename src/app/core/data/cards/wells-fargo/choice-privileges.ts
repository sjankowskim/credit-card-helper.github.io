import type { Card } from '../../../models/card.model';

export const CHOICE_PRIVILEGES: Card = {
  id: 'wells-fargo-choice-privileges',
  name: 'Choice Privileges Mastercard',
  issuer: 'Wells Fargo',
  rewardsProgram: 'Choice Privileges',
  rewardsCurrency: 'Choice Privileges Points',
  network: 'MASTERCARD',
  hasForeignTransactionFee: false,
  hasTravelPartnerAccess: true,
  affectsChase524: true,
  annualFee: 0,
  isBusiness: false,
  creditNeeded: 'good',
  baseRewardRate: 1.0,
  termsCheckedOn: '2026-10-11',
  note: 'Choice Privileges Gold Elite status and 10% bonus points on qualifying stays.',
  defaultSignUpBonus: { amount: 60000, currency: 'Choice Privileges Points', spendRequired: 1000, windowMonths: 3 },
  rewardTiers: [
    {
      id: 'choice-privileges-everyday',
      name: 'Gas, Grocery, Home Improvement & Phone Plans',
      rewardRate: 3.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['gas-stations', 'grocery-stores', 'home-improvement', 'phone']
    },
    {
      id: 'choice-privileges-choice',
      name: 'Choice Hotels',
      rewardRate: 5.0,
      behavior: { type: 'AUTOMATIC' },
      eligibleCategories: ['hotels'],
      onlyWhen: 'Participating Choice Hotels properties and Choice Privileges point purchases'
    }
  ]
};
