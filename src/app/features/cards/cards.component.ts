import { Component, signal, computed, inject } from '@angular/core';
import { SearchBarComponent } from '../portfolio/components/search-bar/search-bar.component';
import { CardListComponent } from '../portfolio/components/card-list/card-list.component';
import { CardDetailComponent } from '../portfolio/components/card-detail/card-detail.component';
import { ALL_CARDS } from '../../core/data/cards';
import { UserCardsService } from '../../core/services/user-cards.service';
import { ToastService } from '../../core/services/toast.service';
import type { UserCard } from '../../core/models/card.model';

@Component({
  selector: 'app-cards',
  imports: [SearchBarComponent, CardListComponent, CardDetailComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
  private readonly userCardsService = inject(UserCardsService);
  private readonly toastService = inject(ToastService);
  
  readonly searchQuery = signal('');
  readonly selectedCard = signal<typeof ALL_CARDS[number] | null>(null);

  readonly userCards = this.userCardsService.cards;

  readonly wishlistedCardIds = computed(() => {
    return new Set(this.userCardsService.cards().filter(c => c.isWishlist).map(c => c.cardId));
  });

  readonly portfolioCardIds = computed(() => {
    return new Set(this.userCardsService.cards().filter(c => !c.isWishlist).map(c => c.cardId));
  });

  readonly filteredCards = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) return ALL_CARDS;
    
    return ALL_CARDS.filter(card => 
      card.name.toLowerCase().includes(query) ||
      card.issuer.toLowerCase().includes(query) ||
      card.rewardsCurrency.toLowerCase().includes(query)
    );
  });

  onSearchChange(query: string): void {
    this.searchQuery.set(query);
  }

  onCardClick(data: { card: typeof ALL_CARDS[number]; userCard: UserCard | null }): void {
    if (!data.userCard) {
      // If no userCard, add the card to portfolio as active
      this.userCardsService.addCard(data.card.id, false, 'active');
      this.toastService.success(`Added ${data.card.name} to portfolio`);
    } else {
      // If userCard exists, open the detail dialog
      this.selectedCard.set(data.card);
    }
  }

  onCloseDetail(): void {
    this.selectedCard.set(null);
  }

  onWishlistClick(data: { card: typeof ALL_CARDS[number]; userCard: UserCard | null }): void {
    if (data.userCard) {
      // Toggle wishlist status for existing card
      this.userCardsService.toggleWishlistByUserCardId(data.userCard.id);
      const isWishlisted = this.userCardsService.cards().find(c => c.id === data.userCard!.id)?.isWishlist;
      if (isWishlisted) {
        this.toastService.success(`Added ${data.card.name} to wishlist`);
      } else {
        this.toastService.info(`Removed ${data.card.name} from wishlist`);
      }
    } else {
      // Add new wishlist card
      this.userCardsService.addCard(data.card.id, true);
      this.toastService.success(`Added ${data.card.name} to wishlist`);
    }
  }
}
