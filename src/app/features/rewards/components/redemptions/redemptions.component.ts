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

  // ---- Add form ----
  readonly draftProgram = signal<RewardsProgram | ''>('');
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
    () => !!this.draftProgram() && Number(this.draftPoints()) > 0 && Number(this.draftValue()) >= 0 && this.draftValue() !== ''
  );

  add(event: Event): void {
    event.preventDefault();
    const program = this.draftProgram();
    if (!this.canAdd() || !program) return;
    this.rewardsService.addRedemption({
      program,
      date: this.draftDate(),
      points: Number(this.draftPoints()),
      cashValue: Number(this.draftValue()),
      description: this.draftDescription().trim()
    });
    this.draftPoints.set('');
    this.draftValue.set('');
    this.draftDescription.set('');
    this.toastService.success('Redemption logged');
  }

  remove(redemption: Redemption): void {
    this.rewardsService.removeRedemption(redemption.id);
  }

  getCpp(redemption: Redemption): number {
    return cpp(redemption.cashValue, redemption.points);
  }

  formatCpp(value: number): string {
    return `${value.toFixed(2)}¢`;
  }

  currentCpp(program: RewardsProgram): number {
    return this.cppSettingsService.getCppValuation(program);
  }

  useAsCpp(summary: ProgramCpp): void {
    const rounded = Math.round(summary.cpp * 100) / 100;
    this.cppSettingsService.setCppValuation(summary.program, rounded);
    this.toastService.success(`${summary.program} now valued at ${this.formatCpp(rounded)} per point`);
  }
}

/** Cents per point */
function cpp(cashValue: number, points: number): number {
  return (cashValue / points) * 100;
}
