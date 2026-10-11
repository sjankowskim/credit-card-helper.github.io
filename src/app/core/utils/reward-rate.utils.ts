import { getCategoryLineage } from '../data/category.registry';
import type { Card, RewardTier, UserCard } from '../models/card.model';
import { today } from './date.utils';

/** Pseudo-category for "everything else", which always earns the base rate */
export const FALLTHROUGH_CATEGORY = 'fallthrough';

export type TierWarningReason = 'NEEDS_SELECTION' | 'NEEDS_ACTIVATION';

export interface RewardRateResult {
  /** Earn rate before any point valuation (e.g. 3 for 3x or 3%) */
  rate: number;

  /** The tier that produced the rate; undefined means the base rate */
  tier?: RewardTier;

  /** A tier that would beat `rate` if the user picked or activated it */
  warning?: { reason: TierWarningReason; tier: RewardTier };
}

type TierStatus = 'ACTIVE' | 'INACTIVE' | TierWarningReason;

export function getQuarter(date: Date): 1 | 2 | 3 | 4 {
  return (Math.floor(date.getMonth() / 3) + 1) as 1 | 2 | 3 | 4;
}

/**
 * Earn rate for one card instance in one category.
 * Tiers on a parent category also apply to its children (Dining covers Fast Food).
 * `userCard` supplies category selections and activations; pass null for a catalog card.
 */
export function getRewardRate(
  card: Card,
  userCard: UserCard | null,
  categoryId: string,
  date: Date = today()
): RewardRateResult {
  const result: RewardRateResult = { rate: card.baseRewardRate };
  if (categoryId === FALLTHROUGH_CATEGORY) return result;

  const lineage = getCategoryLineage(categoryId);
  const warnings: NonNullable<RewardRateResult['warning']>[] = [];

  for (const tier of card.rewardTiers) {
    if (!tier.eligibleCategories.some(c => lineage.includes(c))) continue;

    const status = getTierStatus(tier, userCard, lineage, date);
    if (status === 'ACTIVE') {
      if (tier.rewardRate > result.rate) {
        result.rate = tier.rewardRate;
        result.tier = tier;
      }
    } else if (status !== 'INACTIVE') {
      warnings.push({ reason: status, tier });
    }
  }

  result.warning = warnings
    .filter(w => w.tier.rewardRate > result.rate)
    .sort((a, b) => b.tier.rewardRate - a.tier.rewardRate)[0];
  return result;
}

function getTierStatus(tier: RewardTier, userCard: UserCard | null, lineage: string[], date: Date): TierStatus {
  const userData = userCard?.userData;

  switch (tier.behavior.type) {
    case 'AUTOMATIC':
      return 'ACTIVE';

    case 'USER_CHOICE': {
      const selected: string[] = userData?.activeData?.selectedCategories?.[tier.id] ?? [];
      if (selected.length === 0) return 'NEEDS_SELECTION';
      return selected.some(c => lineage.includes(c)) ? 'ACTIVE' : 'INACTIVE';
    }

    case 'AUTO_TOP_SPEND': {
      const selected = userData?.autoTopSpendCategory;
      if (!selected) return 'NEEDS_SELECTION';
      return lineage.includes(selected) ? 'ACTIVE' : 'INACTIVE';
    }

    case 'ROTATING': {
      const { year, quarter, requiresActivation } = tier.behavior;
      if (year !== date.getFullYear() || quarter !== getQuarter(date)) return 'INACTIVE';
      const activated = userData?.activeData?.activatedTierIds?.includes(tier.id) ?? false;
      return requiresActivation && !activated ? 'NEEDS_ACTIVATION' : 'ACTIVE';
    }
  }
}
