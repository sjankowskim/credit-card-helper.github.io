import { Injectable, computed, inject } from '@angular/core';
import { RewardsProgram } from '../models/card.model';
import { getDefaultCppValuation } from '../data/cpp-valuations';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CppSettingsService {
  private readonly storage = inject(StorageService);

  /**
   * Get all custom CPP valuations
   */
  readonly customValuations = computed(() => this.storage.state().cppValuations);

  /**
   * Get the CPP valuation for a rewards program
   * Returns user's custom value if set, otherwise returns default
   */
  getCppValuation(program: RewardsProgram): number {
    return this.customValuations()[program] ?? getDefaultCppValuation(program);
  }

  /**
   * Set a custom CPP valuation for a rewards program
   */
  setCppValuation(program: RewardsProgram, value: number): void {
    this.storage.update('cppValuations', valuations => ({
      ...valuations,
      [program]: value
    }));
  }

  /**
   * Reset a rewards program's CPP valuation to the default
   */
  resetCppValuation(program: RewardsProgram): void {
    this.storage.update('cppValuations', valuations => {
      const updated = { ...valuations };
      delete updated[program];
      return updated;
    });
  }

  /**
   * Check if a rewards program has a custom CPP valuation
   */
  hasCustomValuation(program: RewardsProgram): boolean {
    return this.customValuations()[program] !== undefined;
  }
}
