import {
  type AppState,
  CURRENT_SCHEMA_VERSION,
  DEFAULT_CATALOG_SETTINGS,
  DEFAULT_DASHBOARD_SETTINGS,
  createDefaultAppState
} from '../models/app-state.model';
import { createDefaultRewardsState } from '../models/rewards.model';
import { createDefaultBenefitsState } from '../models/benefits.model';
import { CARD_MAP } from '../data/cards';
import { toIsoDate, today } from '../utils/date.utils';

/** localStorage keys used before the unified AppState (schema v1) */
export const LEGACY_KEYS = {
  userCards: 'user-cards',
  cppValuations: 'cpp-valuations',
  dashboardSettings: 'dashboard-settings'
} as const;

type RawState = Record<string, unknown> & { schemaVersion: number };

/** Keyed by source version: MIGRATIONS[n] takes a v(n) state and returns v(n + 1). */
const MIGRATIONS: Record<number, (state: RawState) => RawState> = {
  // v1 (separate legacy keys, gathered by the caller) -> v2 (single AppState)
  1: (state) => ({
    ...state,
    schemaVersion: 2,
    userCards: Array.isArray(state['userCards']) ? state['userCards'] : [],
    cppValuations: isObject(state['cppValuations']) ? state['cppValuations'] : {},
    dashboardSettings: {
      ...DEFAULT_DASHBOARD_SETTINGS,
      ...(isObject(state['dashboardSettings']) ? state['dashboardSettings'] : {})
    }
  }),

  // v2 -> v3: the hitSub flag becomes an earned sign-up bonus (signUpBonus.earnedDate)
  2: (state) => ({
    ...state,
    schemaVersion: 3,
    userCards: (state['userCards'] as RawUserCard[]).map(migrateHitSub)
  }),

  // v3 -> v4: rewards balances, earned log, and redemptions
  3: (state) => ({
    ...state,
    schemaVersion: 4,
    rewards: createDefaultRewardsState()
  }),

  // v4 -> v5: benefit credits, retention offers, and referrals
  4: (state) => ({
    ...state,
    schemaVersion: 5,
    benefits: createDefaultBenefitsState(),
    referrals: []
  }),

  // v5 -> v6: catalog view, sort, and grouping
  5: (state) => ({
    ...state,
    schemaVersion: 6,
    catalogSettings: { ...DEFAULT_CATALOG_SETTINGS }
  }),

  // v6 -> v7: bank account bonuses
  6: (state) => ({
    ...state,
    schemaVersion: 7,
    bankBonuses: []
  }),

  // v7 -> v8: airline miles entered by hand, with earned miles
  7: (state) => ({
    ...state,
    schemaVersion: 8,
    rewards: { ...(isObject(state['rewards']) ? state['rewards'] : createDefaultRewardsState()), loyaltyAccounts: [], loyaltyEarned: [] }
  }),

  // v8 -> v9: yearly contribution trackers (401(k), IRA, HSA, ...)
  8: (state) => ({
    ...state,
    schemaVersion: 9,
    contributions: []
  }),

  // v9 -> v10: loans
  9: (state) => ({
    ...state,
    schemaVersion: 10,
    loans: []
  })
};

type RawUserCard = { cardId: string; userData: Record<string, unknown> };

function migrateHitSub(userCard: RawUserCard): RawUserCard {
  const { hitSub, ...userData } = userCard.userData;
  if (hitSub !== true) {
    return { ...userCard, userData };
  }

  const card = CARD_MAP.get(userCard.cardId);
  const existing = isObject(userData['signUpBonus']) ? userData['signUpBonus'] : undefined;
  const bonus: Record<string, unknown> = existing ?? {
    amount: card?.defaultSignUpBonus?.amount ?? 0,
    currency: card?.defaultSignUpBonus?.currency ?? card?.rewardsCurrency ?? '',
    spendRequired: card?.defaultSignUpBonus?.spendRequired ?? 0,
    windowMonths: card?.defaultSignUpBonus?.windowMonths ?? 3
  };
  // The real earned date is unknown; the open date keeps it out of "earned this year" for old cards
  const earnedDate = bonus['earnedDate'] ?? userData['accountStartDate'] ?? toIsoDate(today());
  return { ...userCard, userData: { ...userData, signUpBonus: { ...bonus, earnedDate } } };
}

export class UnsupportedSchemaError extends Error {}

/**
 * Upgrades any stored or imported state to the current schema.
 * Returns the default state for null/undefined input.
 * Throws for data that isn't an AppState or comes from a newer app version.
 */
export function migrate(raw: unknown): AppState {
  if (raw === null || raw === undefined) {
    return createDefaultAppState();
  }
  if (!isObject(raw) || typeof raw['schemaVersion'] !== 'number') {
    throw new UnsupportedSchemaError('Data is not a Credit Card Helper backup.');
  }

  let state = raw as RawState;
  if (state.schemaVersion > CURRENT_SCHEMA_VERSION) {
    throw new UnsupportedSchemaError(
      `Data is from a newer version of the app (schema ${state.schemaVersion}).`
    );
  }

  while (state.schemaVersion < CURRENT_SCHEMA_VERSION) {
    const step = MIGRATIONS[state.schemaVersion];
    if (!step) {
      throw new UnsupportedSchemaError(`No migration from schema ${state.schemaVersion}.`);
    }
    state = step(state);
  }

  if (!Array.isArray(state['userCards'])) {
    throw new UnsupportedSchemaError('Data is missing the userCards list.');
  }
  return state as unknown as AppState;
}

/**
 * Builds a v1 state from the pre-v2 localStorage keys.
 * Returns null when none of the legacy keys exist.
 */
export function readLegacyState(storage: Pick<Storage, 'getItem'>): RawState | null {
  const values = Object.fromEntries(
    Object.entries(LEGACY_KEYS).map(([field, key]) => [field, parseJson(storage.getItem(key))])
  );
  if (Object.values(values).every((value) => value === undefined)) {
    return null;
  }
  return { schemaVersion: 1, ...values };
}

function parseJson(text: string | null): unknown {
  if (text === null) return undefined;
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
