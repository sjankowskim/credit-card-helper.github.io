import type { RewardsProgram, UserCard } from './card.model';
import { createDefaultRewardsState, type RewardsState } from './rewards.model';
import { createDefaultBenefitsState, type BenefitsState, type Referral } from './benefits.model';

export interface DashboardSettings {
  numCards: 1 | 3 | 5;
  includeWishlisted: boolean;
  excludeForeignFee: boolean;
  includeDuplicates: boolean;
  travelRedemption: boolean;
}

/**
 * Everything the app persists, stored under a single localStorage key.
 * Bump CURRENT_SCHEMA_VERSION and add a step in storage.migrations.ts
 * whenever this shape changes.
 */
export interface AppState {
  schemaVersion: number;
  userCards: UserCard[];
  cppValuations: Partial<Record<RewardsProgram, number>>;
  dashboardSettings: DashboardSettings;
  rewards: RewardsState;
  benefits: BenefitsState;
  referrals: Referral[];
}

export const CURRENT_SCHEMA_VERSION = 5;

export const DEFAULT_DASHBOARD_SETTINGS: DashboardSettings = {
  numCards: 3,
  includeWishlisted: false,
  excludeForeignFee: false,
  includeDuplicates: false,
  travelRedemption: false
};

export function createDefaultAppState(): AppState {
  return {
    schemaVersion: CURRENT_SCHEMA_VERSION,
    userCards: [],
    cppValuations: {},
    dashboardSettings: { ...DEFAULT_DASHBOARD_SETTINGS },
    rewards: createDefaultRewardsState(),
    benefits: createDefaultBenefitsState(),
    referrals: []
  };
}
