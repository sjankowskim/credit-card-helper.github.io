import { Component, signal, computed, inject } from '@angular/core';
import { CategoryRankingsTableComponent } from './components/category-rankings-table/category-rankings-table.component';
import { ModalComponent } from '../../shared/modal/modal.component';
import { CardRankingService } from '../../core/services/card-ranking.service';
import { UserCardsService } from '../../core/services/user-cards.service';
import { CppSettingsService } from '../../core/services/cpp-settings.service';
import { RewardsProgram } from '../../core/models/card.model';
import { CardStatus } from '../../core/models/card.model';
import { CARD_MAP } from '../../core/data/cards';
import { ALL_CATEGORIES } from '../../core/data/category.registry';
import { StorageService } from '../../core/services/storage.service';
import type { DashboardSettings } from '../../core/models/app-state.model';

@Component({
  selector: 'app-dashboard',
  imports: [CategoryRankingsTableComponent, ModalComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private readonly cardRankingService = inject(CardRankingService);
  private readonly userCardsService = inject(UserCardsService);
  private readonly cppSettingsService = inject(CppSettingsService);
  private readonly storage = inject(StorageService);

  private readonly settings = computed(() => this.storage.state().dashboardSettings);

  readonly numCardOptions = [1, 3, 5] as const;
  readonly numCards = computed(() => this.settings().numCards);
  readonly includeWishlisted = computed(() => this.settings().includeWishlisted);
  readonly excludeForeignFee = computed(() => this.settings().excludeForeignFee);
  readonly includeDuplicates = computed(() => this.settings().includeDuplicates);
  // The saved preference is kept, but only takes effect while a travel partner card is present
  readonly travelRedemption = computed(() => this.settings().travelRedemption && this.hasTravelPartnerAccess());
  readonly showCppSettings = signal(false);

  private updateSettings(patch: Partial<DashboardSettings>): void {
    this.storage.update('dashboardSettings', settings => ({ ...settings, ...patch }));
  }

  /** Active cards first, then wishlist cards, so owned cards win ties in rankings */
  readonly candidateCards = computed(() => {
    const userCards = this.userCardsService.cards();
    const candidates = [
      ...userCards.filter(c => c.userData.status === CardStatus.ACTIVE),
      ...(this.includeWishlisted() ? userCards.filter(c => c.isWishlist) : [])
    ];
    return this.excludeForeignFee()
      ? candidates.filter(c => !CARD_MAP.get(c.cardId)?.hasForeignTransactionFee)
      : candidates;
  });

  readonly hasTravelPartnerAccess = computed(() =>
    this.candidateCards().some(c => CARD_MAP.get(c.cardId)?.hasTravelPartnerAccess)
  );

  readonly hasDuplicates = computed(() => {
    const cardIds = this.candidateCards().map(c => c.cardId);
    return new Set(cardIds).size < cardIds.length;
  });

  private readonly rankingOptions = computed(() => ({
    applyCpp: this.travelRedemption(),
    includeDuplicates: this.includeDuplicates()
  }));

  readonly rankings = computed(() => {
    const candidates = this.candidateCards();
    if (candidates.length === 0) return null;
    return this.cardRankingService.rankAllCategories(candidates, { ...this.rankingOptions(), limit: this.numCards() });
  });

  readonly categoryOptions = ALL_CATEGORIES;
  readonly lookupCategoryId = signal('');

  /** Every candidate card ranked for the category picked in "Which card for…?" */
  readonly lookupRankings = computed(() => {
    const categoryId = this.lookupCategoryId();
    if (!categoryId) return null;
    const rankings = this.cardRankingService.rankCategory(categoryId, this.candidateCards(), this.rankingOptions());
    return new Map([[categoryId, rankings]]);
  });

  readonly rewardsPrograms = computed(() => {
    return Object.values(RewardsProgram) as RewardsProgram[];
  });

  setNumCards(n: 1 | 3 | 5): void {
    this.updateSettings({ numCards: n });
  }

  toggleIncludeWishlisted(): void {
    this.updateSettings({ includeWishlisted: !this.includeWishlisted() });
  }

  toggleExcludeForeignFee(): void {
    this.updateSettings({ excludeForeignFee: !this.excludeForeignFee() });
  }

  toggleIncludeDuplicates(): void {
    this.updateSettings({ includeDuplicates: !this.includeDuplicates() });
  }

  toggleTravelRedemption(): void {
    this.updateSettings({ travelRedemption: !this.travelRedemption() });
  }

  toggleCppSettings(): void {
    this.showCppSettings.set(!this.showCppSettings());
  }

  onCppChange(program: RewardsProgram, value: string): void {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      this.cppSettingsService.setCppValuation(program, numValue);
    }
  }

  resetCpp(program: RewardsProgram): void {
    this.cppSettingsService.resetCppValuation(program);
  }

  getCppValue(program: RewardsProgram): number {
    return this.cppSettingsService.getCppValuation(program);
  }

  isCustomCpp(program: RewardsProgram): boolean {
    return this.cppSettingsService.hasCustomValuation(program);
  }
}
