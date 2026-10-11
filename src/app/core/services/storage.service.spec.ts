import { TestBed } from '@angular/core/testing';
import { CURRENT_SCHEMA_VERSION } from '../models/app-state.model';
import { LEGACY_KEYS } from './storage.migrations';
import { STORAGE_KEY, StorageService } from './storage.service';

describe('StorageService', () => {
  beforeEach(() => localStorage.clear());

  it('moves legacy keys into the single storage key', () => {
    localStorage.setItem(LEGACY_KEYS.cppValuations, JSON.stringify({ BILT: 2 }));

    const storage = TestBed.inject(StorageService);

    expect(storage.state().cppValuations).toEqual({ BILT: 2 });
    expect(localStorage.getItem(LEGACY_KEYS.cppValuations)).toBeNull();
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!).schemaVersion).toBe(CURRENT_SCHEMA_VERSION);
  });

  it('persists updates', () => {
    const storage = TestBed.inject(StorageService);
    storage.update('cppValuations', () => ({ BILT: 1.8 }));
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!).cppValuations).toEqual({ BILT: 1.8 });
  });

  it('round-trips export and import', () => {
    const storage = TestBed.inject(StorageService);
    storage.update('cppValuations', () => ({ BILT: 1.8 }));
    const backup = storage.exportJson();

    storage.update('cppValuations', () => ({}));
    storage.importJson(backup);

    expect(storage.exportJson()).toBe(backup);
  });

  it('leaves data untouched when an import is invalid', () => {
    const storage = TestBed.inject(StorageService);
    storage.update('cppValuations', () => ({ BILT: 1.8 }));

    expect(() => storage.importJson('not json')).toThrow();
    expect(() => storage.importJson('{"foo": 1}')).toThrow();
    expect(storage.state().cppValuations).toEqual({ BILT: 1.8 });
  });

  it('keeps unreadable saved data instead of overwriting it', () => {
    localStorage.setItem(STORAGE_KEY, '{"schemaVersion": 999}');
    vi.spyOn(console, 'error').mockImplementation(() => {});

    const storage = TestBed.inject(StorageService);

    expect(storage.state().userCards).toEqual([]);
    const backupKey = Object.keys(localStorage).find((key) => key.startsWith(`${STORAGE_KEY}.unreadable-`));
    expect(localStorage.getItem(backupKey!)).toBe('{"schemaVersion": 999}');
  });
});
