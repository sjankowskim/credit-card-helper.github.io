import type { Card, CreditLevel } from '../models/card.model';
import { CATEGORY_REGISTRY, type CategoryId } from '../data/category.registry';
import { REWARDS_PROGRAM_REGISTRY } from '../data/rewards-program.registry';

export type RewardsKind = 'cash' | 'transferable' | 'travel' | 'store' | 'none';

export const REWARDS_KIND_LABELS: Record<RewardsKind, string> = {
  cash: 'Cash back',
  transferable: 'Transferable points',
  travel: 'Airline & hotel',
  store: 'Store rewards',
  none: 'No rewards'
};

export const CREDIT_LEVEL_LABELS: Record<CreditLevel, string> = {
  excellent: 'Excellent',
  good: 'Good',
  fair: 'Fair',
  rebuilding: 'New or rebuilding'
};

/** Lowest to highest */
const CREDIT_ORDER: CreditLevel[] = ['rebuilding', 'fair', 'good', 'excellent'];

/** True when someone with `level` credit typically qualifies for the card */
export function qualifiesWith(card: Card, level: CreditLevel): boolean {
  return CREDIT_ORDER.indexOf(card.creditNeeded) <= CREDIT_ORDER.indexOf(level);
}

export function isStudentCard(card: Card): boolean {
  return /\bStudents?\b/.test(card.name);
}

export function isSecuredCard(card: Card): boolean {
  return /\bSecured\b/.test(card.name);
}

export function isStoreOnly(card: Card): boolean {
  return card.network === 'STORE';
}

export function getRewardsKind(card: Card): RewardsKind {
  if (card.baseRewardRate === 0 && card.rewardTiers.length === 0) return 'none';
  if (card.rewardsProgram === 'Store Rewards') return 'store';
  const program = REWARDS_PROGRAM_REGISTRY[card.rewardsProgram];
  if (program.allowsTransfers && program.hasTravelPartners && card.hasTravelPartnerAccess) return 'transferable';
  if (program.hasTravelPartners && !program.allowsTransfers) return 'travel';
  return 'cash';
}

/**
 * True when the card earns more than its base rate on `category`, including a bonus on
 * the category's parent (dining covers fast food). Portal-only and merchant-only tiers
 * (`onlyWhen`) don't count, since most purchases in the category don't qualify.
 */
export function earnsBonusOn(card: Card, category: CategoryId): boolean {
  const parent = (CATEGORY_REGISTRY[category] as { parentId?: CategoryId }).parentId;
  return card.rewardTiers.some(
    tier =>
      !tier.onlyWhen &&
      tier.rewardRate > card.baseRewardRate &&
      (tier.eligibleCategories.includes(category) || (!!parent && tier.eligibleCategories.includes(parent)))
  );
}
