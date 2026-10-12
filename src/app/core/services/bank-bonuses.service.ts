import { Injectable, computed, inject } from '@angular/core';
import { StorageService } from './storage.service';
import type { BankBonus } from '../models/bank-bonus.model';
import { toIsoDate, today } from '../utils/date.utils';

/** Bank account bonuses the user tracks, separate from card sign-up bonuses */
@Injectable({
  providedIn: 'root'
})
export class BankBonusesService {
  private readonly storage = inject(StorageService);

  readonly bonuses = computed(() => this.storage.state().bankBonuses);

  add(bonus: Omit<BankBonus, 'id'>): void {
    this.storage.update('bankBonuses', bonuses => [...bonuses, { ...bonus, id: crypto.randomUUID() }]);
  }

  update(id: string, changes: Partial<Omit<BankBonus, 'id'>>): void {
    this.storage.update('bankBonuses', bonuses => bonuses.map(b => (b.id === id ? { ...b, ...changes } : b)));
  }

  /** Records progress and stamps today as the last update */
  setProgress(id: string, progress: number): void {
    this.update(id, { progress, progressUpdated: toIsoDate(today()) });
  }

  remove(id: string): void {
    this.storage.update('bankBonuses', bonuses => bonuses.filter(b => b.id !== id));
  }
}
