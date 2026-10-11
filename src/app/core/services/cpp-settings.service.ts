import { Injectable, signal } from '@angular/core';
import { RewardsProgram } from '../models/card.model';
import { DEFAULT_CPP_VALUATIONS } from '../data/cpp-valuations';

const STORAGE_KEY = 'cpp-valuations';

@Injectable({
  providedIn: 'root'
})
export class CppSettingsService {
  private readonly userCppValuations = signal<Partial<Record<RewardsProgram, number>>>({});

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        this.userCppValuations.set(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse CPP valuations from storage', e);
      }
    }
  }

  private saveToStorage(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.userCppValuations()));
  }

  /**
   * Get the CPP valuation for a rewards program
   * Returns user's custom value if set, otherwise returns default
   */
  getCppValuation(program: RewardsProgram): number {
    const userValue = this.userCppValuations()[program];
    if (userValue !== undefined) {
      return userValue;
    }
    return DEFAULT_CPP_VALUATIONS[program] ?? 1.0;
  }

  /**
   * Set a custom CPP valuation for a rewards program
   */
  setCppValuation(program: RewardsProgram, value: number): void {
    this.userCppValuations.update(valuations => ({
      ...valuations,
      [program]: value
    }));
    this.saveToStorage();
  }

  /**
   * Reset a rewards program's CPP valuation to the default
   */
  resetCppValuation(program: RewardsProgram): void {
    this.userCppValuations.update(valuations => {
      const updated = { ...valuations };
      delete updated[program];
      return updated;
    });
    this.saveToStorage();
  }

  /**
   * Check if a rewards program has a custom CPP valuation
   */
  hasCustomValuation(program: RewardsProgram): boolean {
    return this.userCppValuations()[program] !== undefined;
  }

  /**
   * Get all custom CPP valuations
   */
  readonly customValuations = this.userCppValuations.asReadonly();
}
