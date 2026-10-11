import { Injectable, signal } from '@angular/core';
import type { AppState } from '../models/app-state.model';
import { LEGACY_KEYS, migrate, readLegacyState } from './storage.migrations';

export const STORAGE_KEY = 'credit-card-helper';

/**
 * Single source of persisted app state.
 * Feature services read slices of `state` and write through `update`.
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly appState = signal<AppState>(this.load());

  readonly state = this.appState.asReadonly();

  update<K extends keyof AppState>(key: K, recipe: (value: AppState[K]) => AppState[K]): void {
    this.appState.update((state) => ({ ...state, [key]: recipe(state[key]) }));
    this.save();
  }

  exportJson(): string {
    return JSON.stringify(this.appState(), null, 2);
  }

  /** Replaces all data with an exported backup. Throws if the backup is invalid. */
  importJson(json: string): void {
    let parsed: unknown;
    try {
      parsed = JSON.parse(json);
    } catch {
      throw new Error('File is not valid JSON.');
    }
    this.appState.set(migrate(parsed));
    this.save();
  }

  private load(): AppState {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        return migrate(JSON.parse(stored));
      }

      const legacy = readLegacyState(localStorage);
      const state = migrate(legacy);
      if (legacy) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        Object.values(LEGACY_KEYS).forEach((key) => localStorage.removeItem(key));
      }
      return state;
    } catch (e) {
      // Keep the unreadable data so the next save doesn't destroy it
      const backupKey = `${STORAGE_KEY}.unreadable-${Date.now()}`;
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw !== null) {
        localStorage.setItem(backupKey, raw);
      }
      console.error(`Failed to load saved data; starting empty (raw data kept in "${backupKey}")`, e);
      return migrate(null);
    }
  }

  private save(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.appState()));
  }
}
