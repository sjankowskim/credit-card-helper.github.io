import { Component, computed, inject, signal } from '@angular/core';
import { RewardsService, type ProgramCpp } from '../../../../core/services/rewards.service';
import { CppSettingsService } from '../../../../core/services/cpp-settings.service';
import { ToastService } from '../../../../core/services/toast.service';
import type { RewardsProgram } from '../../../../core/models/card.model';
import type { Redemption } from '../../../../core/models/rewards.model';
import { formatCurrency } from '../../../../core/utils/card-display.utils';
import { formatDate, toIsoDate, today } from '../../../../core/utils/date.utils';

@Component({
  selector: 'app-rewards-redemptions',
  templateUrl: './redemptions.component.html',
  styleUrl: './redemptions.component.scss'
})
export class RedemptionsComponent {
  private readonly rewardsService = inject(RewardsService);
  private readonly cppSettingsService = inject(CppSettingsService);
  private readonly toastService = inject(ToastService);

  readonly formatCurrency = formatCurrency;
  readonly formatDate = formatDate;

  readonly redemptions = this.rewardsService.redemptions;
  readonly programCpps = this.rewardsService.programCpps;
  readonly programs = this.rewardsService.pointsPrograms;
  readonly airlineAccounts = computed(() => this.rewardsService.loyaltyAccounts().map(a => a.account));

  // ---- Add form ----
  /** 'program:<RewardsProgram>' for a card points program, 'account:<id>' for airline miles */
  readonly draftSource = signal('');
  readonly draftDate = signal(toIsoDate(today()));
  readonly draftPoints = signal('');
  readonly draftValue = signal('');
  readonly draftDescription = signal('');

  /** The CPP this redemption would get, shown while typing */
  readonly draftCpp = computed(() => {
    const points = Number(this.draftPoints());
    const value = Number(this.draftValue());
    return points > 0 && value > 0 ? cpp(value, points) : null;
  });

  readonly canAdd = computed(
    () => !!this.draftSource() && Number(this.draftPoints()) > 0 && Number(this.draftValue()) >= 0 && this.draftValue() !== ''
  );

  /** Miles left on the chosen airline account, shown while choosing */
  readonly draftAccount = computed(() => {
    const source = this.draftSource();
    return source.startsWith('account:') ? this.rewardsService.getLoyaltyAccount(source.slice('account:'.length)) : undefined;
  });

  add(event: Event): void {
    event.preventDefault();
    const source = this.draftSource();
    if (!this.canAdd() || !source) return;
    const [kind, id] = [source.slice(0, source.indexOf(':')), source.slice(source.indexOf(':') + 1)];
    this.rewardsService.addRedemption({
      ...(kind === 'account' ? { loyaltyAccountId: id } : { program: id as RewardsProgram }),
      date: this.draftDate(),
      points: Number(this.draftPoints()),
      cashValue: Number(this.draftValue()),
      description: this.draftDescription().trim()
    });
    this.draftPoints.set('');
    this.draftValue.set('');
    this.draftDescription.set('');
    this.toastService.success(kind === 'account' ? 'Redemption logged and taken off your miles balance' : 'Redemption logged');
  }

  remove(redemption: Redemption): void {
    this.rewardsService.removeRedemption(redemption.id);
  }

  getSource(redemption: Redemption): string {
    return this.rewardsService.getRedemptionSource(redemption);
  }

  getCpp(redemption: Redemption): number {
    return cpp(redemption.cashValue, redemption.points);
  }

  formatCpp(value: number): string {
    return `${value.toFixed(2)}¢`;
  }

  /** The valuation in use: your CPP setting for a card program, or the airline account's own ¢ per mile */
  currentCpp(summary: ProgramCpp): number | undefined {
    if (summary.loyaltyAccountId) return this.rewardsService.getLoyaltyAccount(summary.loyaltyAccountId)?.cpp;
    return summary.program ? this.cppSettingsService.getCppValuation(summary.program) : undefined;
  }

  useAsCpp(summary: ProgramCpp): void {
    const rounded = Math.round(summary.cpp * 100) / 100;
    if (summary.loyaltyAccountId) this.rewardsService.updateLoyaltyAccount(summary.loyaltyAccountId, { cpp: rounded });
    else if (summary.program) this.cppSettingsService.setCppValuation(summary.program, rounded);
    else return;
    this.toastService.success(`${summary.label} now valued at ${this.formatCpp(rounded)} per point`);
  }
}

/** Cents per point */
function cpp(cashValue: number, points: number): number {
  return (cashValue / points) * 100;
}
