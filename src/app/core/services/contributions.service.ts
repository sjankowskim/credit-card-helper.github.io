import { Injectable, computed, inject } from '@angular/core';
import { StorageService } from './storage.service';
import type { ContributionEntry, ContributionTracker } from '../models/contribution.model';
import { getContributionTypeInfo } from '../data/contribution-limits';
import { daysBetween, today } from '../utils/date.utils';

export interface TrackerProgress {
  tracker: ContributionTracker;
  label: string;
  contributed: number;
  remaining: number;
  /** 0-100 */
  percent: number;
  overLimit: boolean;
  /** Last day contributions count for the tax year */
  deadline: Date;
  /** Days until the deadline (negative once passed) */
  daysLeft: number;
  /** Dollars per month needed to reach the limit by the deadline; null when met or past */
  perMonthNeeded: number | null;
  /** Contributions you'd have by now contributing evenly from Jan 1 to the deadline */
  expected: number;
  behindPace: boolean;
}

/** Yearly contributions to tax-advantaged accounts against their limits */
@Injectable({
  providedIn: 'root'
})
export class ContributionsService {
  private readonly storage = inject(StorageService);

  readonly trackers = computed(() => this.storage.state().contributions ?? []);

  getProgress(tracker: ContributionTracker, reference: Date = today()): TrackerProgress {
    const info = getContributionTypeInfo(tracker.type);
    const contributed = tracker.entries.reduce((sum, e) => sum + e.amount, 0);
    const deadline = info.extendsToTaxDay ? new Date(tracker.year + 1, 3, 15) : new Date(tracker.year, 11, 31);
    const start = new Date(tracker.year, 0, 1);
    const daysLeft = daysBetween(reference, deadline);
    const remaining = Math.max(0, tracker.limit - contributed);

    const total = Math.max(1, daysBetween(start, deadline));
    const elapsed = Math.min(total, Math.max(0, daysBetween(start, reference)));
    const expected = Math.round((tracker.limit * elapsed) / total);

    return {
      tracker,
      label: tracker.name || info.label,
      contributed,
      remaining,
      percent: tracker.limit > 0 ? Math.min(100, (contributed / tracker.limit) * 100) : 0,
      overLimit: contributed > tracker.limit,
      deadline,
      daysLeft,
      perMonthNeeded: remaining > 0 && daysLeft >= 0 ? Math.ceil(remaining / Math.max(1, daysLeft / 30.44)) : null,
      expected,
      behindPace: remaining > 0 && daysLeft >= 0 && contributed < expected
    };
  }

  add(tracker: Omit<ContributionTracker, 'id' | 'entries'>): void {
    this.storage.update('contributions', list => [...(list ?? []), { ...tracker, id: crypto.randomUUID(), entries: [] }]);
  }

  update(id: string, changes: Partial<Omit<ContributionTracker, 'id' | 'entries'>>): void {
    this.storage.update('contributions', list => (list ?? []).map(t => (t.id === id ? { ...t, ...changes } : t)));
  }

  remove(id: string): void {
    this.storage.update('contributions', list => (list ?? []).filter(t => t.id !== id));
  }

  addEntry(trackerId: string, entry: Omit<ContributionEntry, 'id'>): void {
    this.storage.update('contributions', list =>
      (list ?? []).map(t => (t.id === trackerId ? { ...t, entries: [...t.entries, { ...entry, id: crypto.randomUUID() }] } : t))
    );
  }

  removeEntry(trackerId: string, entryId: string): void {
    this.storage.update('contributions', list =>
      (list ?? []).map(t => (t.id === trackerId ? { ...t, entries: t.entries.filter(e => e.id !== entryId) } : t))
    );
  }
}
