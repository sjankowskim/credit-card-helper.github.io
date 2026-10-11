import { CURRENT_SCHEMA_VERSION, DEFAULT_DASHBOARD_SETTINGS } from '../models/app-state.model';
import { LEGACY_KEYS, UnsupportedSchemaError, migrate, readLegacyState } from './storage.migrations';

function fakeStorage(entries: Record<string, string>): Pick<Storage, 'getItem'> {
  return { getItem: (key) => entries[key] ?? null };
}

describe('storage migrations', () => {
  it('returns default state for empty input', () => {
    const state = migrate(null);
    expect(state.schemaVersion).toBe(CURRENT_SCHEMA_VERSION);
    expect(state.userCards).toEqual([]);
    expect(state.dashboardSettings).toEqual(DEFAULT_DASHBOARD_SETTINGS);
  });

  it('migrates the legacy separate keys (v1) to a single state', () => {
    const userCards = [{ id: 'a', cardId: 'citi-custom-cash', instanceNumber: 1, isWishlist: false, userData: {} }];
    const legacy = readLegacyState(fakeStorage({
      [LEGACY_KEYS.userCards]: JSON.stringify(userCards),
      [LEGACY_KEYS.cppValuations]: JSON.stringify({ 'Citi ThankYou': 1.5 }),
      [LEGACY_KEYS.dashboardSettings]: JSON.stringify({ numCards: 5 })
    }));

    const state = migrate(legacy);

    expect(state.schemaVersion).toBe(CURRENT_SCHEMA_VERSION);
    expect(state.userCards).toEqual(userCards);
    expect(state.cppValuations).toEqual({ 'Citi ThankYou': 1.5 });
    expect(state.dashboardSettings).toEqual({ ...DEFAULT_DASHBOARD_SETTINGS, numCards: 5 });
  });

  it('ignores corrupt legacy values instead of failing', () => {
    const legacy = readLegacyState(fakeStorage({ [LEGACY_KEYS.userCards]: '{not json' }));
    expect(migrate(legacy).userCards).toEqual([]);
  });

  it('returns null when there is no legacy data', () => {
    expect(readLegacyState(fakeStorage({}))).toBeNull();
  });

  it('rejects data that is not a backup or is from a newer version', () => {
    expect(() => migrate({ hello: 'world' })).toThrow(UnsupportedSchemaError);
    expect(() => migrate([])).toThrow(UnsupportedSchemaError);
    expect(() => migrate({ schemaVersion: CURRENT_SCHEMA_VERSION + 1, userCards: [] }))
      .toThrow(/newer version/);
  });
});
