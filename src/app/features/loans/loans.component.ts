import { Component, computed, inject, signal } from '@angular/core';
import { LoansService } from '../../core/services/loans.service';
import { ToastService } from '../../core/services/toast.service';
import { InlineEditFieldComponent } from '../../shared/inline-edit-field/inline-edit-field.component';
import { LOAN_TYPE_LABELS, type Loan, type LoanPayment, type LoanType } from '../../core/models/loan.model';
import { getLoanPayoff, getPortfolioPayoff, monthlyInterest, type LoanPayoff, type PayoffStrategy } from '../../core/utils/loan.utils';
import { formatCurrency } from '../../core/utils/card-display.utils';
import { formatDate, toIsoDate, today } from '../../core/utils/date.utils';

interface LoanView {
  loan: Loan;
  payoff: LoanPayoff;
  /** Interest charged in the next month at the current balance */
  nextInterest: number;
  /** Share of the original amount paid off, 0-100; null without an original amount */
  paidPercent: number | null;
}

interface LoanDraft {
  name: string;
  lender: string;
  type: LoanType;
  balance: string;
  apr: string;
  monthlyPayment: string;
  originalAmount: string;
  startDate: string;
}

function emptyDraft(): LoanDraft {
  return { name: '', lender: '', type: 'student-federal', balance: '', apr: '', monthlyPayment: '', originalAmount: '', startDate: '' };
}

@Component({
  selector: 'app-loans',
  imports: [InlineEditFieldComponent],
  templateUrl: './loans.component.html',
  styleUrl: './loans.component.scss'
})
export class LoansComponent {
  private readonly loansService = inject(LoansService);
  private readonly toastService = inject(ToastService);

  readonly formatCurrency = formatCurrency;
  readonly formatIso = formatDate;
  readonly typeLabels = LOAN_TYPE_LABELS;
  readonly loanTypes = Object.keys(LOAN_TYPE_LABELS) as LoanType[];

  readonly views = computed<LoanView[]>(() =>
    this.loansService.loans().map(loan => ({
      loan,
      payoff: getLoanPayoff(loan),
      nextInterest: monthlyInterest(loan.balance, loan.apr),
      paidPercent: loan.originalAmount ? Math.min(100, Math.max(0, (1 - loan.balance / loan.originalAmount) * 100)) : null
    }))
  );

  private readonly open = computed(() => this.loansService.loans().filter(l => l.balance > 0));

  readonly stats = computed(() => {
    const open = this.open();
    const balance = open.reduce((sum, l) => sum + l.balance, 0);
    return {
      balance,
      monthly: open.reduce((sum, l) => sum + l.monthlyPayment, 0),
      /** Balance-weighted APR */
      apr: balance > 0 ? open.reduce((sum, l) => sum + l.apr * l.balance, 0) / balance : 0,
      count: open.length
    };
  });

  // ---- Payoff planner ----
  readonly extra = signal('');
  readonly strategy = signal<PayoffStrategy>('avalanche');

  readonly plan = computed(() => {
    const loans = this.open();
    const extra = Math.max(0, Number(this.extra()) || 0);
    const current = getPortfolioPayoff(loans, 0, this.strategy());
    const withExtra = getPortfolioPayoff(loans, extra, this.strategy());
    return {
      current,
      withExtra,
      hasExtra: extra > 0,
      monthsSaved: current.months !== null && withExtra.months !== null ? current.months - withExtra.months : null,
      interestSaved: current.interest !== null && withExtra.interest !== null ? current.interest - withExtra.interest : null
    };
  });

  // ---- Add loan form ----
  readonly formOpen = signal(false);
  readonly draft = signal<LoanDraft>(emptyDraft());

  readonly canAdd = computed(() => {
    const d = this.draft();
    return !!d.name.trim() && Number(d.balance) >= 0 && d.balance !== '' && Number(d.apr) >= 0 && d.apr !== '' && Number(d.monthlyPayment) > 0;
  });

  setField<K extends keyof LoanDraft>(field: K, value: LoanDraft[K]): void {
    this.draft.update(d => ({ ...d, [field]: value }));
  }

  addLoan(event: Event): void {
    event.preventDefault();
    if (!this.canAdd()) return;
    const d = this.draft();
    this.loansService.add({
      name: d.name.trim(),
      lender: d.lender.trim() || undefined,
      type: d.type,
      balance: Number(d.balance),
      apr: Number(d.apr),
      monthlyPayment: Number(d.monthlyPayment),
      originalAmount: d.originalAmount === '' ? undefined : Number(d.originalAmount),
      startDate: d.startDate || undefined
    });
    this.toastService.success(`Tracking ${d.name.trim()}`);
    this.draft.set(emptyDraft());
    this.formOpen.set(false);
  }

  // ---- Loans ----

  update(view: LoanView, field: 'name' | 'lender' | 'balance' | 'apr' | 'monthlyPayment' | 'originalAmount', value: string | number | undefined): void {
    const { id } = view.loan;
    if (field === 'name') {
      if (value) this.loansService.update(id, { name: String(value) });
    } else if (field === 'lender') {
      this.loansService.update(id, { lender: value === undefined ? undefined : String(value) });
    } else if (field === 'originalAmount') {
      this.loansService.update(id, { originalAmount: value === undefined ? undefined : Number(value) });
    } else if (value !== undefined) {
      this.loansService.update(id, { [field]: Number(value) });
    }
  }

  remove(view: LoanView): void {
    if (confirm(`Delete ${view.loan.name} and its payment history?`)) this.loansService.remove(view.loan.id);
  }

  /** Payment amounts, principal, dates, and notes being typed, by loan id */
  readonly paymentDrafts = signal<Partial<Record<string, { amount: string; principal: string; date: string; note: string }>>>({});
  readonly expanded = signal<ReadonlySet<string>>(new Set());

  getPaymentDraft(id: string): { amount: string; principal: string; date: string; note: string } {
    return this.paymentDrafts()[id] ?? { amount: '', principal: '', date: toIsoDate(today()), note: '' };
  }

  setPaymentDraft(id: string, field: 'amount' | 'principal' | 'date' | 'note', value: string): void {
    this.paymentDrafts.update(drafts => ({ ...drafts, [id]: { ...this.getPaymentDraft(id), [field]: value } }));
  }

  /** Principal if left blank: the payment minus one month of interest */
  estimatePrincipal(view: LoanView): number | null {
    const amount = Number(this.getPaymentDraft(view.loan.id).amount);
    if (!(amount > 0)) return null;
    return Math.min(view.loan.balance, Math.max(0, Math.round((amount - view.nextInterest) * 100) / 100));
  }

  logPayment(view: LoanView, event: Event): void {
    event.preventDefault();
    const draft = this.getPaymentDraft(view.loan.id);
    const amount = Number(draft.amount);
    if (!(amount > 0) || !draft.date) return;
    const principal = draft.principal === '' ? this.estimatePrincipal(view) ?? 0 : Math.max(0, Number(draft.principal));

    this.loansService.addPayment(view.loan.id, { date: draft.date, amount, principal, note: draft.note.trim() || undefined });
    this.paymentDrafts.update(drafts => ({ ...drafts, [view.loan.id]: { amount: '', principal: '', date: draft.date, note: '' } }));
    if (principal >= view.loan.balance) this.toastService.success(`${view.loan.name} is paid off!`);
    else this.toastService.success(`${formatCurrency(principal)} off the ${view.loan.name} balance`);
  }

  removePayment(view: LoanView, paymentId: string): void {
    this.loansService.removePayment(view.loan.id, paymentId);
  }

  toggleExpanded(id: string): void {
    this.expanded.update(set => {
      const next = new Set(set);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  /** The part of a payment that wasn't principal */
  interestOf(payment: LoanPayment): number {
    return Math.max(0, payment.amount - payment.principal);
  }

  sortedPayments(view: LoanView) {
    return [...view.loan.payments].sort((a, b) => b.date.localeCompare(a.date));
  }

  formatMonth(date: Date | null): string {
    return date ? date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '';
  }

  /** e.g. '4 yrs 3 mos' */
  formatDuration(months: number | null): string {
    if (months === null) return '';
    const years = Math.floor(months / 12);
    const rest = months % 12;
    const parts = [];
    if (years) parts.push(`${years} ${years === 1 ? 'yr' : 'yrs'}`);
    if (rest || !years) parts.push(`${rest} ${rest === 1 ? 'mo' : 'mos'}`);
    return parts.join(' ');
  }

  formatPercent(value: number): string {
    return `${value.toFixed(2)}%`;
  }
}
