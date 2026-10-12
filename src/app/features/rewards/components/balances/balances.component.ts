import { Component, computed, inject, signal } from '@angular/core';
import { RewardsService, type LoyaltyAccountValue, type RewardsPool } from '../../../../core/services/rewards.service';
import { CppSettingsService } from '../../../../core/services/cpp-settings.service';
import { InlineEditFieldComponent } from '../../../../shared/inline-edit-field/inline-edit-field.component';
import type { RewardsProgram } from '../../../../core/models/card.model';
import { formatCurrency } from '../../../../core/utils/card-display.utils';
import { formatDate } from '../../../../core/utils/date.utils';

/** Airline programs offered as suggestions; any other name can be typed */
const AIRLINE_PROGRAMS: readonly RewardsProgram[] = [
  'American Airlines AAdvantage',
  'Delta SkyMiles',
  'United MileagePlus',
  'Southwest Rapid Rewards',
  'JetBlue TrueBlue',
  'Atmos Rewards',
  'Air Canada Aeroplan',
  'Avios',
  'Flying Blue',
  'Emirates Skywards',
  'Miles & More',
  'Asia Miles',
  'Frontier Miles',
  'Sun Country Rewards'
];

@Component({
  selector: 'app-rewards-balances',
  imports: [InlineEditFieldComponent],
  templateUrl: './balances.component.html',
  styleUrl: './balances.component.scss'
})
export class BalancesComponent {
  private readonly rewardsService = inject(RewardsService);
  private readonly cppSettingsService = inject(CppSettingsService);

  readonly pools = this.rewardsService.pools;
  readonly loyaltyAccounts = this.rewardsService.loyaltyAccounts;
  readonly airlinePrograms = AIRLINE_PROGRAMS;
  readonly formatCurrency = formatCurrency;
  readonly formatDate = formatDate;

  readonly loyaltyTotals = computed(() => {
    const counted = this.loyaltyAccounts().filter(a => !a.duplicatesCardPool);
    return {
      value: counted.reduce((sum, a) => sum + a.value, 0),
      allTimeValue: counted.reduce((sum, a) => sum + (a.allTimeValue ?? 0), 0)
    };
  });

  setBalance(pool: RewardsPool, value: string | number | undefined): void {
    this.rewardsService.setBalance(pool.key, value === undefined ? undefined : Number(value));
  }

  // ---- Airline miles ----

  readonly draftName = signal('');
  readonly draftBalance = signal('');
  readonly draftAllTime = signal('');
  readonly draftCpp = signal('');
  readonly draftNote = signal('');

  readonly canAdd = computed(() => !!this.draftName().trim() && Number(this.draftBalance()) >= 0 && this.draftBalance() !== '' && Number(this.draftCpp()) > 0);

  /** Picking a known program fills in its valuation from your CPP settings */
  setDraftName(name: string): void {
    this.draftName.set(name);
    const program = this.matchProgram(name);
    if (program && !this.draftCpp()) this.draftCpp.set(String(this.cppSettingsService.getCppValuation(program)));
  }

  add(event: Event): void {
    event.preventDefault();
    if (!this.canAdd()) return;
    const name = this.draftName().trim();
    this.rewardsService.addLoyaltyAccount({
      name,
      program: this.matchProgram(name),
      balance: Number(this.draftBalance()),
      allTimeEarned: this.draftAllTime() === '' ? undefined : Number(this.draftAllTime()),
      cpp: Number(this.draftCpp()),
      note: this.draftNote().trim() || undefined
    });
    for (const draft of [this.draftName, this.draftBalance, this.draftAllTime, this.draftCpp, this.draftNote]) draft.set('');
  }

  update(row: LoyaltyAccountValue, field: 'balance' | 'allTimeEarned' | 'cpp' | 'note', value: string | number | undefined): void {
    if (field === 'note') {
      this.rewardsService.updateLoyaltyAccount(row.account.id, { note: value === undefined ? undefined : String(value) });
    } else if (field === 'allTimeEarned') {
      this.rewardsService.updateLoyaltyAccount(row.account.id, { allTimeEarned: value === undefined ? undefined : Number(value) });
    } else if (value !== undefined) {
      this.rewardsService.updateLoyaltyAccount(row.account.id, { [field]: Number(value) });
    }
  }

  remove(row: LoyaltyAccountValue): void {
    if (confirm(`Remove ${row.account.name} and its miles activity?`)) this.rewardsService.removeLoyaltyAccount(row.account.id);
  }

  private matchProgram(name: string): RewardsProgram | undefined {
    const lower = name.trim().toLowerCase();
    return AIRLINE_PROGRAMS.find(p => p.toLowerCase() === lower);
  }
}
