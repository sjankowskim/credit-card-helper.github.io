import { Injectable, signal } from '@angular/core';

export type ThemePreference = 'system' | 'light' | 'dark';

/** localStorage key; kept apart from the app data since the theme is per device, not part of a backup */
export const THEME_KEY = 'credit-card-helper.theme';

/**
 * Light/dark theme. 'system' follows the OS. index.html applies the saved choice before
 * the app loads; this service changes it at runtime.
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  readonly preference = signal<ThemePreference>(this.read());

  set(preference: ThemePreference): void {
    this.preference.set(preference);
    try {
      if (preference === 'system') localStorage.removeItem(THEME_KEY);
      else localStorage.setItem(THEME_KEY, preference);
    } catch {
      // Storage can be unavailable (private mode); the choice still applies for this visit
    }
    apply(preference);
  }

  private read(): ThemePreference {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      return saved === 'light' || saved === 'dark' ? saved : 'system';
    } catch {
      return 'system';
    }
  }
}

function apply(preference: ThemePreference): void {
  const root = document.documentElement;
  if (preference === 'system') root.removeAttribute('data-theme');
  else root.setAttribute('data-theme', preference);
}
