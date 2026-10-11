import { Component, signal, computed, inject, effect } from '@angular/core';
import { CategoryRankingsTableComponent } from './components/category-rankings-table/category-rankings-table.component';
import { CardRankingService } from '../../core/services/card-ranking.service';
import { UserCardsService } from '../../core/services/user-cards.service';
import { CppSettingsService } from '../../core/services/cpp-settings.service';
import { RewardsProgram } from '../../core/models/card.model';
import { CardStatus } from '../../core/models/card.model';
import { DEFAULT_CPP_VALUATIONS } from '../../core/data/cpp-valuations';
import { ALL_CARDS } from '../../core/data/cards';

const DASHBOARD_SETTINGS_KEY = 'dashboard-settings';

interface DashboardSettings {
  numCards: 1 | 3 | 5;
  includeWishlisted: boolean;
  excludeForeignFee: boolean;
  includeDuplicates: boolean;
  travelRedemption: boolean;
}

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

  readonly numCards = signal<1 | 3 | 5>(3);
  readonly includeWishlisted = signal(false);
  readonly excludeForeignFee = signal(false);
  readonly includeDuplicates = signal(false);
  readonly travelRedemption = signal(false);
  readonly showCppSettings = signal(false);

  constructor() {
    this.loadSettings();
    
    effect(() => {
      // Automatically disable travel redemption when no travel partner access cards are available
      if (!this.hasTravelPartnerAccess()) {
        this.travelRedemption.set(false);
      }
    });

    effect(() => {
      this.saveSettings();
    });
  }

  private loadSettings(): void {
    const stored = localStorage.getItem(DASHBOARD_SETTINGS_KEY);
    if (stored) {
      try {
        const settings: DashboardSettings = JSON.parse(stored);
        this.numCards.set(settings.numCards);
        this.includeWishlisted.set(settings.includeWishlisted);
        this.excludeForeignFee.set(settings.excludeForeignFee);
        this.includeDuplicates.set(settings.includeDuplicates);
        this.travelRedemption.set(settings.travelRedemption);
      } catch (e) {
        console.error('Failed to parse dashboard settings from storage', e);
      }
    }
  }

  private saveSettings(): void {
    const settings: DashboardSettings = {
      numCards: this.numCards(),
      includeWishlisted: this.includeWishlisted(),
      excludeForeignFee: this.excludeForeignFee(),
      includeDuplicates: this.includeDuplicates(),
      travelRedemption: this.travelRedemption()
    };
    localStorage.setItem(DASHBOARD_SETTINGS_KEY, JSON.stringify(settings));
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
        const card = ALL_CARDS.find(c => c.id === cardId);
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
      const card = ALL_CARDS.find(c => c.id === cardId);
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
    const applyCpp = this.travelRedemption() && this.hasTravelPartnerAccess();
    if (cardIds.length === 0) return null;
    return this.cardRankingService.getAllCategoryRankings(cardIds, userCards, this.numCards(), applyCpp);
  });

  readonly rewardsPrograms = computed(() => {
    return Object.values(RewardsProgram) as RewardsProgram[];
  });

  setNumCards(n: 1 | 3 | 5): void {
    this.numCards.set(n);
  }

  toggleIncludeWishlisted(): void {
    this.includeWishlisted.set(!this.includeWishlisted());
  }

  toggleExcludeForeignFee(): void {
    this.excludeForeignFee.set(!this.excludeForeignFee());
  }

  toggleIncludeDuplicates(): void {
    this.includeDuplicates.set(!this.includeDuplicates());
  }

  toggleTravelRedemption(): void {
    this.travelRedemption.set(!this.travelRedemption());
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
