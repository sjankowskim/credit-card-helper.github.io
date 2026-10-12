import { Component, computed, inject, signal } from '@angular/core';
import { SubscriptionsService } from '../../core/services/subscriptions.service';
import { ToastService } from '../../core/services/toast.service';
import { DonutChartComponent, type DonutSlice } from '../../shared/donut-chart/donut-chart.component';
import type { CadenceUnit, Subscription } from '../../core/models/subscription.model';
import { describeCadence, getAnnualCost, getNextPayment } from '../../core/utils/subscription.utils';
import { formatCurrency } from '../../core/utils/card-display.utils';
import { daysBetween, formatDate, toIsoDate, today } from '../../core/utils/date.utils';

type Breakdown = 'subscription' | 'category';

/**
 * Categorical colors in a fixed order (Okabe-Ito, colorblind-friendly; its pale yellow
 * swapped for a darker olive that reads on white). Gray is reserved for "Other".
 */
const SLICE_COLORS = ['#0072B2', '#E69F00', '#009E73', '#D55E00', '#56B4E9', '#CC79A7', '#8C7A00'];
const OTHER_COLOR = '#9CA3AF';

interface SubscriptionView {
  sub: Subscription;
  annual: number;
  monthly: number;
  next: Date | null;
  /** Days until the next charge */
  daysUntil: number | null;
}

interface SubscriptionDraft {
  name: string;
  cost: string;
  cadenceValue: string;
  cadenceUnit: CadenceUnit;
  paymentDate: string;
  category: string;
}

function emptyDraft(): SubscriptionDraft {
  return { name: '', cost: '', cadenceValue: '1', cadenceUnit: 'month', paymentDate: '', category: '' };
}

@Component({
  selector: 'app-subscriptions',
  imports: [DonutChartComponent],
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.scss'
})
export class SubscriptionsComponent {
  private readonly subscriptionsService = inject(SubscriptionsService);
  private readonly toastService = inject(ToastService);

  readonly formatIso = formatDate;
  readonly describeCadence = describeCadence;
  readonly cadenceUnits: { id: CadenceUnit; label: string }[] = [
    { id: 'day', label: 'Days' },
    { id: 'week', label: 'Weeks' },
    { id: 'month', label: 'Months' },
    { id: 'year', label: 'Years' }
  ];

  readonly formatMoney = (value: number): string => formatCurrency(Math.round(value * 100) / 100);
  readonly formatWhole = (value: number): string => formatCurrency(Math.round(value));

  readonly views = computed<SubscriptionView[]>(() => {
    const now = today();
    return this.subscriptionsService
      .subscriptions()
      .map(sub => {
        const annual = getAnnualCost(sub);
        const next = sub.active ? getNextPayment(sub, now) : null;
        return { sub, annual, monthly: annual / 12, next, daysUntil: next ? daysBetween(now, next) : null };
      })
      .sort((a, b) => Number(b.sub.active) - Number(a.sub.active) || b.annual - a.annual);
  });

  private readonly active = computed(() => this.views().filter(v => v.sub.active));

  readonly stats = computed(() => {
    const active = this.active();
    const annual = active.reduce((sum, v) => sum + v.annual, 0);
    const next30 = active.filter(v => v.daysUntil !== null && v.daysUntil <= 30);
    return { annual, monthly: annual / 12, count: active.length, next30: next30.reduce((sum, v) => sum + v.sub.cost, 0), next30Count: next30.length };
  });

  /** Active subscriptions charging in the next 30 days, soonest first */
  readonly upcoming = computed(() =>
    this.active()
      .filter(v => v.daysUntil !== null && v.daysUntil <= 30)
      .sort((a, b) => a.daysUntil! - b.daysUntil!)
  );

  // ---- Breakdown chart ----
  readonly breakdown = signal<Breakdown>('subscription');
  readonly breakdowns: { id: Breakdown; label: string }[] = [
    { id: 'subscription', label: 'Subscription' },
    { id: 'category', label: 'Category' }
  ];

  /**
   * Yearly cost by the chosen grouping: the 7 largest groups get colors, the rest fold
   * into Other. Colors go to the shown groups in name order, so a group keeps its color
   * when amounts shift.
   */
  readonly slices = computed<DonutSlice[]>(() => {
    const groups = new Map<string, number>();
    for (const v of this.active()) {
      const key = this.groupKey(v.sub);
      groups.set(key, (groups.get(key) ?? 0) + v.annual);
    }
    const sorted = [...groups.entries()].filter(([, value]) => value > 0).sort((a, b) => b[1] - a[1]);
    const shown = sorted.slice(0, SLICE_COLORS.length);
    const rest = sorted.slice(SLICE_COLORS.length);
    const colorOrder = shown.map(([key]) => key).sort((a, b) => a.localeCompare(b));

    const slices: DonutSlice[] = shown.map(([key, value]) => ({
      key,
      label: key,
      value,
      color: SLICE_COLORS[colorOrder.indexOf(key)]
    }));
    if (rest.length > 0) {
      slices.push({
        key: '__other',
        label: `Other (${rest.length})`,
        value: rest.reduce((sum, [, value]) => sum + value, 0),
        color: OTHER_COLOR
      });
    }
    return slices;
  });

  readonly sliceTotal = computed(() => this.slices().reduce((sum, s) => sum + s.value, 0));

  private groupKey(sub: Subscription): string {
    switch (this.breakdown()) {
      case 'category':
        return sub.category?.trim() || 'Uncategorized';
      default:
        return sub.name;
    }
  }

  // ---- Add / edit form ----
  readonly formOpen = signal(false);
  readonly editingId = signal<string | null>(null);
  readonly draft = signal<SubscriptionDraft>(emptyDraft());

  readonly categorySuggestions = computed(() =>
    [...new Set(this.subscriptionsService.subscriptions().map(s => s.category ?? '').filter(Boolean))].sort()
  );

  readonly canSave = computed(() => {
    const d = this.draft();
    return !!d.name.trim() && Number(d.cost) >= 0 && d.cost !== '' && Number(d.cadenceValue) > 0;
  });

  readonly draftAnnual = computed(() => {
    const d = this.draft();
    return this.canSave() ? getAnnualCost({ cost: Number(d.cost), cadenceValue: Number(d.cadenceValue), cadenceUnit: d.cadenceUnit }) : null;
  });

  setField<K extends keyof SubscriptionDraft>(field: K, value: SubscriptionDraft[K]): void {
    this.draft.update(d => ({ ...d, [field]: value }));
  }

  openAdd(): void {
    this.editingId.set(null);
    this.draft.set(emptyDraft());
    this.formOpen.set(true);
  }

  openEdit(sub: Subscription): void {
    this.editingId.set(sub.id);
    this.draft.set({
      name: sub.name,
      cost: String(sub.cost),
      cadenceValue: String(sub.cadenceValue),
      cadenceUnit: sub.cadenceUnit,
      paymentDate: sub.paymentDate ?? '',
      category: sub.category ?? ''
    });
    this.formOpen.set(true);
  }

  closeForm(): void {
    this.formOpen.set(false);
    this.editingId.set(null);
  }

  save(event: Event): void {
    event.preventDefault();
    if (!this.canSave()) return;
    const d = this.draft();
    const fields = {
      name: d.name.trim(),
      cost: Number(d.cost),
      cadenceValue: Math.round(Number(d.cadenceValue)),
      cadenceUnit: d.cadenceUnit,
      paymentDate: d.paymentDate || undefined,
      category: d.category.trim() || undefined
    };
    const id = this.editingId();
    if (id) {
      this.subscriptionsService.update(id, fields);
      this.toastService.success(`Updated ${fields.name}`);
    } else {
      this.subscriptionsService.add({ ...fields, active: true });
      this.toastService.success(`Added ${fields.name}`);
    }
    this.closeForm();
  }

  setActive(view: SubscriptionView, active: boolean): void {
    this.subscriptionsService.update(view.sub.id, { active });
  }

  remove(view: SubscriptionView): void {
    if (!confirm(`Delete ${view.sub.name}?`)) return;
    this.subscriptionsService.remove(view.sub.id);
    if (this.editingId() === view.sub.id) this.closeForm();
  }

  formatDay(date: Date | null): string {
    return date ? formatDate(toIsoDate(date)) : '';
  }

  describeDaysUntil(days: number | null): string {
    if (days === null) return '';
    if (days === 0) return 'today';
    if (days === 1) return 'tomorrow';
    return `in ${days} days`;
  }

  percentOf(value: number): string {
    const total = this.sliceTotal();
    return total > 0 ? `${((value / total) * 100).toFixed(1)}%` : '';
  }
}
