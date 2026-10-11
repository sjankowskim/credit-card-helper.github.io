import {
  type AppState,
  CURRENT_SCHEMA_VERSION,
  DEFAULT_DASHBOARD_SETTINGS,
  createDefaultAppState
} from '../models/app-state.model';

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
  })
};

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
