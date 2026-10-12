import { Component, computed, inject, signal } from '@angular/core';
import { ContributionsService, type TrackerProgress } from '../../core/services/contributions.service';
import { ToastService } from '../../core/services/toast.service';
import { InlineEditFieldComponent } from '../../shared/inline-edit-field/inline-edit-field.component';
import {
  CATCH_UP_LABELS,
  CONTRIBUTION_TYPES,
  getContributionTypeInfo,
  getDefaultLimit,
  LIMIT_YEARS,
  type CatchUp,
  type ContributionType,
  type HsaCoverage
} from '../../core/data/contribution-limits';
import { formatCurrency } from '../../core/utils/card-display.utils';
import { formatDate, toIsoDate, today } from '../../core/utils/date.utils';

@Component({
  selector: 'app-contributions',
  imports: [InlineEditFieldComponent],
  templateUrl: './contributions.component.html',
  styleUrl: './contributions.component.scss'
})
export class ContributionsComponent {
  private readonly contributionsService = inject(ContributionsService);
  private readonly toastService = inject(ToastService);

  readonly formatCurrency = formatCurrency;
  readonly formatIso = formatDate;
  readonly types = CONTRIBUTION_TYPES;
  readonly catchUpLabels = CATCH_UP_LABELS;
  readonly getTypeInfo = getContributionTypeInfo;

  readonly year = signal(today().getFullYear());
  readonly limitYears = { first: Math.min(...LIMIT_YEARS), last: Math.max(...LIMIT_YEARS) };

  /** Years that have trackers, newest first, for jumping between them */
  readonly trackedYears = computed(() =>
    [...new Set(this.contributionsService.trackers().map(t => t.year))].sort((a, b) => b - a)
  );

  readonly minYear = 1900;
  readonly maxYear = 2100;

  stepYear(delta: number): void {
    const year = this.year() + delta;
    if (year >= this.minYear && year <= this.maxYear) this.year.set(year);
  }

  /** Applies a typed year; anything invalid is rejected and the box shows the current year again */
  setYear(input: HTMLInputElement): void {
    const year = Number(input.value);
    if (Number.isInteger(year) && year >= this.minYear && year <= this.maxYear) {
      this.year.set(year);
    } else {
      this.toastService.warning(`Enter a year from ${this.minYear} to ${this.maxYear}`);
    }
    // The binding won't refresh the box when the year didn't change, so sync it directly
    input.value = String(this.year());
  }

  readonly progress = computed(() =>
    this.contributionsService
      .trackers()
      .filter(t => t.year === this.year())
      .map(t => this.contributionsService.getProgress(t))
  );

  readonly stats = computed(() => {
    const rows = this.progress();
    return {
      contributed: rows.reduce((sum, p) => sum + p.contributed, 0),
      remaining: rows.reduce((sum, p) => sum + p.remaining, 0),
      maxed: rows.filter(p => p.remaining === 0).length,
      count: rows.length
    };
  });

  // ---- Add tracker form ----
  readonly formOpen = signal(false);
  readonly draftType = signal<ContributionType>('401k');
  readonly draftName = signal('');
  readonly draftCatchUp = signal<CatchUp>('none');
  readonly draftCoverage = signal<HsaCoverage>('self');
  /** Limit typed by the user; empty means use the IRS limit */
  readonly draftLimit = signal('');

  readonly draftInfo = computed(() => getContributionTypeInfo(this.draftType()));
  readonly defaultLimit = computed(() => getDefaultLimit(this.draftType(), this.year(), this.draftCatchUp(), this.draftCoverage()));
  readonly effectiveLimit = computed(() => (this.draftLimit() !== '' ? Number(this.draftLimit()) : this.defaultLimit()));

  readonly canAdd = computed(() => {
    const limit = this.effectiveLimit();
    return limit !== undefined && limit > 0 && (this.draftType() !== 'custom' || !!this.draftName().trim());
  });

  setDraftType(type: ContributionType): void {
    this.draftType.set(type);
    this.draftCatchUp.set('none');
    this.draftLimit.set('');
  }

  addTracker(event: Event): void {
    event.preventDefault();
    const limit = this.effectiveLimit();
    if (!this.canAdd() || limit === undefined) return;
    const info = this.draftInfo();
    this.contributionsService.add({
      year: this.year(),
      type: this.draftType(),
      name: this.draftName().trim() || undefined,
      limit,
      catchUp: this.draftCatchUp(),
      coverage: info.hasCoverage ? this.draftCoverage() : undefined
    });
    this.toastService.success(`Tracking ${this.draftName().trim() || info.label} for ${this.year()}`);
    this.draftName.set('');
    this.draftLimit.set('');
    this.formOpen.set(false);
  }

  // ---- Trackers ----

  /** Contribution amounts, dates, and notes being typed, by tracker id */
  readonly entryDrafts = signal<Partial<Record<string, { amount: string; date: string; note: string }>>>({});
  /** Trackers showing their contribution history */
  readonly expanded = signal<ReadonlySet<string>>(new Set());

  getEntryDraft(id: string): { amount: string; date: string; note: string } {
    return this.entryDrafts()[id] ?? { amount: '', date: toIsoDate(today()), note: '' };
  }

  setEntryDraft(id: string, field: 'amount' | 'date' | 'note', value: string): void {
    this.entryDrafts.update(drafts => ({ ...drafts, [id]: { ...this.getEntryDraft(id), [field]: value } }));
  }

  addEntry(p: TrackerProgress, event: Event): void {
    event.preventDefault();
    const draft = this.getEntryDraft(p.tracker.id);
    const amount = Number(draft.amount);
    if (!(amount > 0) || !draft.date) return;

    this.contributionsService.addEntry(p.tracker.id, { date: draft.date, amount, note: draft.note.trim() || undefined });
    this.entryDrafts.update(drafts => ({ ...drafts, [p.tracker.id]: { amount: '', date: draft.date, note: '' } }));

    const total = p.contributed + amount;
    if (total > p.tracker.limit) {
      this.toastService.error(`${p.label} is now ${formatCurrency(total - p.tracker.limit)} over its limit`);
    } else if (p.remaining > 0 && total === p.tracker.limit) {
      this.toastService.success(`${p.label} is maxed out for ${p.tracker.year}!`);
    }
  }

  removeEntry(p: TrackerProgress, entryId: string): void {
    this.contributionsService.removeEntry(p.tracker.id, entryId);
  }

  setLimit(p: TrackerProgress, value: string | number | undefined): void {
    if (value !== undefined && Number(value) > 0) this.contributionsService.update(p.tracker.id, { limit: Number(value) });
  }

  toggleExpanded(id: string): void {
    this.expanded.update(set => {
      const next = new Set(set);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  sortedEntries(p: TrackerProgress) {
    return [...p.tracker.entries].sort((a, b) => b.date.localeCompare(a.date));
  }

  remove(p: TrackerProgress): void {
    if (confirm(`Delete the ${p.tracker.year} ${p.label} tracker and its contributions?`)) this.contributionsService.remove(p.tracker.id);
  }

  /** Copies this tracker to next year with the new year's IRS limit (or the same limit if not on file) */
  carryForward(p: TrackerProgress): void {
    const { tracker } = p;
    const nextYear = tracker.year + 1;
    const exists = this.contributionsService
      .trackers()
      .some(t => t.year === nextYear && t.type === tracker.type && (t.name ?? '') === (tracker.name ?? ''));
    if (exists) {
      this.toastService.error(`${p.label} is already tracked for ${nextYear}`);
      return;
    }
    const limit = getDefaultLimit(tracker.type, nextYear, tracker.catchUp, tracker.coverage ?? 'self') ?? tracker.limit;
    this.contributionsService.add({ ...tracker, year: nextYear, limit });
    this.toastService.success(`Added ${p.label} for ${nextYear}`);
  }

  formatDay(date: Date): string {
    return formatDate(toIsoDate(date));
  }

  describeOptions(p: TrackerProgress): string {
    const parts: string[] = [];
    if (p.tracker.name) parts.push(getContributionTypeInfo(p.tracker.type).label);
    if (p.tracker.coverage) parts.push(p.tracker.coverage === 'family' ? 'Family coverage' : 'Self-only coverage');
    if (p.tracker.catchUp !== 'none') parts.push(`${CATCH_UP_LABELS[p.tracker.catchUp]} catch-up`);
    return parts.join(' · ');
  }
}
