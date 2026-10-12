import { Component, computed, inject, signal } from '@angular/core';
import { BankBonusesService } from '../../../../core/services/bank-bonuses.service';
import { ToastService } from '../../../../core/services/toast.service';
import type { BankBonus } from '../../../../core/models/bank-bonus.model';
import { formatCurrency } from '../../../../core/utils/card-display.utils';
import { formatDate, parseLocalDate, toIsoDate, today } from '../../../../core/utils/date.utils';
import {
  compareBankBonusUrgency,
  getBankBonusProgress,
  type BankBonusProgress
} from '../../../../core/utils/bank-bonus.utils';

/** The add/edit form's fields, as typed */
interface BonusDraft {
  bank: string;
  accountName: string;
  amount: string;
  requirement: string;
  goal: string;
  openedDate: string;
  windowDays: string;
  keepOpenUntil: string;
}

function emptyDraft(): BonusDraft {
  return {
    bank: '',
    accountName: '',
    amount: '',
    requirement: '',
    goal: '1',
    openedDate: toIsoDate(today()),
    windowDays: '90',
    keepOpenUntil: ''
  };
}

@Component({
  selector: 'app-bank-bonuses',
  templateUrl: './bank-bonuses.component.html',
  styleUrls: ['../../sub-tracker.component.scss', './bank-bonuses.component.scss']
})
export class BankBonusesComponent {
  private readonly bankBonusesService = inject(BankBonusesService);
  private readonly toastService = inject(ToastService);

  readonly formatCurrency = formatCurrency;
  readonly formatIso = formatDate;

  private readonly all = computed(() => this.bankBonusesService.bonuses().map(b => getBankBonusProgress(b)));

  readonly active = computed(() => this.all().filter(p => p.state === 'in-progress').sort(compareBankBonusUrgency));

  /** Earned and missed bonuses, most recent first */
  readonly history = computed(() =>
    this.all()
      .filter(p => p.state !== 'in-progress')
      .sort((a, b) => this.getOutcomeDate(b).localeCompare(this.getOutcomeDate(a)))
  );

  readonly stats = computed(() => {
    const year = today().getFullYear();
    const earnedThisYear = this.all().filter(p => parseLocalDate(p.bonus.earnedDate)?.getFullYear() === year);
    return {
      active: this.active().length,
      pendingValue: this.active().reduce((sum, p) => sum + p.bonus.amount, 0),
      earnedCount: earnedThisYear.length,
      earnedValue: earnedThisYear.reduce((sum, p) => sum + p.bonus.amount, 0),
      year
    };
  });

  // ---- Add / edit form ----
  readonly draft = signal<BonusDraft>(emptyDraft());
  /** Id of the bonus being edited; null when adding */
  readonly editingId = signal<string | null>(null);
  readonly formOpen = signal(false);

  readonly canSave = computed(() => {
    const d = this.draft();
    return !!d.bank.trim() && Number(d.amount) > 0 && Number(d.goal) > 0 && Number(d.windowDays) > 0;
  });

  /** Progress amounts being typed, by bonus id */
  readonly progressDrafts = signal<Partial<Record<string, string>>>({});

  setField<K extends keyof BonusDraft>(field: K, value: BonusDraft[K]): void {
    this.draft.update(d => ({ ...d, [field]: value }));
  }

  openAdd(): void {
    this.editingId.set(null);
    this.draft.set(emptyDraft());
    this.formOpen.set(true);
  }

  openEdit(bonus: BankBonus): void {
    this.editingId.set(bonus.id);
    this.draft.set({
      bank: bonus.bank,
      accountName: bonus.accountName,
      amount: String(bonus.amount),
      requirement: bonus.requirement,
      goal: String(bonus.goal),
      openedDate: bonus.openedDate ?? '',
      windowDays: String(bonus.windowDays),
      keepOpenUntil: bonus.keepOpenUntil ?? ''
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
      bank: d.bank.trim(),
      accountName: d.accountName.trim(),
      amount: Number(d.amount),
      requirement: d.requirement.trim(),
      goal: Number(d.goal),
      openedDate: d.openedDate || undefined,
      windowDays: Math.round(Number(d.windowDays)),
      keepOpenUntil: d.keepOpenUntil || undefined
    };

    const id = this.editingId();
    if (id) {
      this.bankBonusesService.update(id, fields);
      this.toastService.success(`Updated ${this.getName(fields)}`);
    } else {
      this.bankBonusesService.add({ ...fields, progress: 0 });
      this.toastService.success(`Tracking ${this.getName(fields)}`);
    }
    this.closeForm();
  }

  getName(bonus: Pick<BankBonus, 'bank' | 'accountName'>): string {
    return bonus.accountName ? `${bonus.bank} ${bonus.accountName}` : bonus.bank;
  }

  formatDay(date: Date | null): string {
    return date ? formatDate(toIsoDate(date)) : '';
  }

  /** Progress as a count, or as dollars when the goal looks like a balance */
  formatProgress(value: number, goal: number): string {
    return goal >= 100 ? formatCurrency(value) : value.toLocaleString('en-US', { maximumFractionDigits: 2 });
  }

  /** Earned date, or the deadline for a missed bonus, as an ISO date */
  getOutcomeDate(p: BankBonusProgress): string {
    return p.bonus.earnedDate ?? (p.deadline ? toIsoDate(p.deadline) : '');
  }

  setProgressDraft(id: string, value: string): void {
    this.progressDrafts.update(drafts => ({ ...drafts, [id]: value }));
  }

  saveProgress(p: BankBonusProgress, event: Event): void {
    event.preventDefault();
    const raw = this.progressDrafts()[p.bonus.id];
    const progress = Number(raw);
    if (raw === undefined || raw === '' || !(progress >= 0)) return;

    this.bankBonusesService.setProgress(p.bonus.id, progress);
    this.setProgressDraft(p.bonus.id, '');
    if (!p.requirementMet && progress >= p.bonus.goal) {
      this.toastService.success(`Requirement met for ${this.getName(p.bonus)}! Mark it earned once the bonus posts.`);
    }
  }

  markEarned(p: BankBonusProgress): void {
    this.bankBonusesService.update(p.bonus.id, { earnedDate: toIsoDate(today()) });
    this.toastService.success(`Earned the ${formatCurrency(p.bonus.amount)} ${this.getName(p.bonus)} bonus`);
  }

  undoEarned(p: BankBonusProgress): void {
    this.bankBonusesService.update(p.bonus.id, { earnedDate: undefined });
  }

  remove(p: BankBonusProgress): void {
    if (!confirm(`Delete the ${this.getName(p.bonus)} bonus?`)) return;
    this.bankBonusesService.remove(p.bonus.id);
    if (this.editingId() === p.bonus.id) this.closeForm();
  }
}
