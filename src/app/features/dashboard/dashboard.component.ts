import { Component, signal, computed, inject } from '@angular/core';
import { CategoryRankingsTableComponent } from './components/category-rankings-table/category-rankings-table.component';
import { CardRankingService } from '../../core/services/card-ranking.service';
import { UserCardsService } from '../../core/services/user-cards.service';
import { CppSettingsService } from '../../core/services/cpp-settings.service';
import { RewardsProgram } from '../../core/models/card.model';
import { CardStatus } from '../../core/models/card.model';
import { DEFAULT_CPP_VALUATIONS } from '../../core/data/cpp-valuations';
import { CARD_MAP } from '../../core/data/cards';
import { StorageService } from '../../core/services/storage.service';
import type { DashboardSettings } from '../../core/models/app-state.model';

@Component({
  selector: 'app-dashboard',
  imports: [CategoryRankingsTableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private readonly cardRankingService = inject(CardRankingService);
  private readonly userCardsService = inject(UserCardsService);
  private readonly cppSettingsService = inject(CppSettingsService);
  private readonly storage = inject(StorageService);

  private readonly settings = computed(() => this.storage.state().dashboardSettings);

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

  readonly userCardIds = computed(() => {
    const userCards = this.userCardsService.cards();
    
    // Only include active cards in the dashboard
    let cardIds = userCards.filter(c => c.userData.status === CardStatus.ACTIVE).map(c => c.cardId);
    
    if (this.includeWishlisted()) {
      const wishlistIds = userCards.filter(c => c.isWishlist).map(c => c.cardId);
      cardIds = [...new Set([...cardIds, ...wishlistIds])];
    }
    
    if (this.excludeForeignFee()) {
      cardIds = cardIds.filter(cardId => {
        const card = CARD_MAP.get(cardId);
        return card && !card.hasForeignTransactionFee;
      });
    }
    
    if (!this.includeDuplicates()) {
      cardIds = [...new Set(cardIds)];
    }
    
    return cardIds;
  });

  readonly hasTravelPartnerAccess = computed(() => {
    const cardIds = this.userCardIds();
    return cardIds.some(cardId => {
      const card = CARD_MAP.get(cardId);
      return card?.hasTravelPartnerAccess;
    });
  });

  readonly hasDuplicates = computed(() => {
    const userCards = this.userCardsService.cards();
    const activeCardIds = userCards.filter(c => c.userData.status === CardStatus.ACTIVE).map(c => c.cardId);
    return new Set(activeCardIds).size < activeCardIds.length;
  });

  readonly rankings = computed(() => {
    const cardIds = this.userCardIds();
    const userCards = this.userCardsService.cards();
    const applyCpp = this.travelRedemption();
    if (cardIds.length === 0) return null;
    return this.cardRankingService.getAllCategoryRankings(cardIds, userCards, this.numCards(), applyCpp);
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

  getDefaultCpp(program: RewardsProgram): number {
    return DEFAULT_CPP_VALUATIONS[program];
  }

  isCustomCpp(program: RewardsProgram): boolean {
    return this.cppSettingsService.hasCustomValuation(program);
  }
}
