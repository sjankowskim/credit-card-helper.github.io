import type { RewardsProgram, UserCard } from './card.model';
import { createDefaultRewardsState, type RewardsState } from './rewards.model';
import { createDefaultBenefitsState, type BenefitsState, type Referral } from './benefits.model';
import type { BankBonus } from './bank-bonus.model';
import type { ContributionTracker } from './contribution.model';
import type { Loan } from './loan.model';
import type { Subscription } from './subscription.model';
import type { WalletColumnId, WalletTableKind } from '../data/wallet-columns';
import type { CatalogColumnId } from '../data/catalog-columns';
import { DEFAULT_HOME_WIDGETS, type HomeWidgetId } from '../data/home-widgets';

export interface DashboardSettings {
  numCards: 1 | 3 | 5;
  includeWishlisted: boolean;
  excludeForeignFee: boolean;
  includeDuplicates: boolean;
  travelRedemption: boolean;
}

export type CatalogView = 'grid' | 'compact' | 'table';
export type CatalogSort = 'name' | 'issuer' | 'fee-asc' | 'fee-desc' | 'best-rate';

export interface CatalogSettings {
  view: CatalogView;
  sort: CatalogSort;
  groupByIssuer: boolean;
  /** Columns shown in the table view; missing means the default columns */
  columns?: CatalogColumnId[];
}

export interface WalletSettings {
  view: CatalogView;
  /** Columns shown in each table view; a table missing here uses its default columns */
  columns?: Partial<Record<WalletTableKind, WalletColumnId[]>>;
}

export interface HomeSettings {
  /** Widgets on the Home page, in order */
  widgets: HomeWidgetId[];
  /** Categories the Best card widget shows (category ids, plus 'fallthrough'); missing means the defaults */
  bestCardCategories?: string[];
  /** Rules the Application rules widget shows (VelocityRule ids); missing means the featured issuers' rules */
  applicationRuleIds?: string[];
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
  catalogSettings: CatalogSettings;
  walletSettings: WalletSettings;
  homeSettings: HomeSettings;
  rewards: RewardsState;
  benefits: BenefitsState;
  referrals: Referral[];
  bankBonuses: BankBonus[];
  contributions: ContributionTracker[];
  loans: Loan[];
  subscriptions: Subscription[];
}

export const CURRENT_SCHEMA_VERSION = 14;

export const DEFAULT_DASHBOARD_SETTINGS: DashboardSettings = {
  numCards: 3,
  includeWishlisted: false,
  excludeForeignFee: false,
  includeDuplicates: false,
  travelRedemption: false
};

export const DEFAULT_CATALOG_SETTINGS: CatalogSettings = {
  view: 'grid',
  sort: 'name',
  groupByIssuer: false
};

export const DEFAULT_WALLET_SETTINGS: WalletSettings = {
  view: 'grid'
};

export function createDefaultHomeSettings(): HomeSettings {
  return { widgets: [...DEFAULT_HOME_WIDGETS] };
}

export function createDefaultAppState(): AppState {
  return {
    schemaVersion: CURRENT_SCHEMA_VERSION,
    userCards: [],
    cppValuations: {},
    dashboardSettings: { ...DEFAULT_DASHBOARD_SETTINGS },
    catalogSettings: { ...DEFAULT_CATALOG_SETTINGS },
    walletSettings: { ...DEFAULT_WALLET_SETTINGS },
    homeSettings: createDefaultHomeSettings(),
    rewards: createDefaultRewardsState(),
    benefits: createDefaultBenefitsState(),
    referrals: [],
    bankBonuses: [],
    contributions: [],
    loans: [],
    subscriptions: []
  };
}
