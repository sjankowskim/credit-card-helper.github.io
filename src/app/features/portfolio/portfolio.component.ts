import { Component, signal, computed, inject } from '@angular/core';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { CardDetailComponent } from './components/card-detail/card-detail.component';
import { ALL_CARDS } from '../../core/data/cards';
import { UserCardsService } from '../../core/services/user-cards.service';
import { ToastService } from '../../core/services/toast.service';
import { CardStatus, type UserCard } from '../../core/models/card.model';

@Component({
  selector: 'app-portfolio',
  imports: [SearchBarComponent, CardListComponent, CardDetailComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent {
  private readonly userCardsService = inject(UserCardsService);
  private readonly toastService = inject(ToastService);
  
  readonly searchQuery = signal('');
  readonly selectedCard = signal<typeof ALL_CARDS[number] | null>(null);
  readonly selectedUserCardId = signal<string | null>(null);
  readonly cardToRemove = signal<typeof ALL_CARDS[number] | null>(null);
  readonly userCardToRemove = signal<UserCard | null>(null);

  readonly userCards = this.userCardsService.cards;

  readonly portfolioCards = computed(() => {
    return this.userCardsService.cards()
      .filter(c => !c.isWishlist)
      .map(userCard => ({ card: ALL_CARDS.find(card => card.id === userCard.cardId), userCard }))
      .filter((item): item is { card: typeof ALL_CARDS[number]; userCard: UserCard } => item.card !== undefined)
      .sort((a, b) => {
        // Sort by card name first, then by instance number
        const nameCompare = a.card.name.localeCompare(b.card.name);
        if (nameCompare !== 0) return nameCompare;
        return a.userCard.instanceNumber - b.userCard.instanceNumber;
      });
  });

  readonly filteredPortfolioCards = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const instances = this.portfolioCards();
    
    if (!query) return instances;
    
    return instances.filter(item => 
      item.card.name.toLowerCase().includes(query) ||
      item.card.issuer.toLowerCase().includes(query) ||
      item.card.rewardsCurrency.toLowerCase().includes(query)
    );
  });

  readonly wishlistedCardIds = computed(() => {
    return new Set(this.userCardsService.cards().filter(c => c.isWishlist).map(c => c.cardId));
  });

  readonly portfolioCardIds = computed(() => {
    return new Set(this.userCardsService.cards().filter(c => !c.isWishlist).map(c => c.cardId));
  });

  readonly wishlistCards = computed(() => {
    return this.userCardsService.cards()
      .filter(c => c.isWishlist)
      .map(userCard => ({ card: ALL_CARDS.find(card => card.id === userCard.cardId), userCard }))
      .filter((item): item is { card: typeof ALL_CARDS[number]; userCard: UserCard } => item.card !== undefined)
      .sort((a, b) => {
        // Sort by card name first, then by instance number
        const nameCompare = a.card.name.localeCompare(b.card.name);
        if (nameCompare !== 0) return nameCompare;
        return a.userCard.instanceNumber - b.userCard.instanceNumber;
      });
  });

  readonly filteredWishlistCards = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const instances = this.wishlistCards();
    
    if (!query) return instances;
    
    return instances.filter(item => 
      item.card.name.toLowerCase().includes(query) ||
      item.card.issuer.toLowerCase().includes(query) ||
      item.card.rewardsCurrency.toLowerCase().includes(query)
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
      this.selectedUserCardId.set(data.userCard.id);
    }
  }

  onCloseDetail(): void {
    this.selectedCard.set(null);
    this.selectedUserCardId.set(null);
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

  onAddToPortfolioClick(data: { card: typeof ALL_CARDS[number]; userCard: UserCard }): void {
    // Move card from wishlist to portfolio by setting isWishlist to false and status to active
    this.userCardsService.setStatusByUserCardId(data.userCard.id, CardStatus.ACTIVE);
    this.userCardsService.toggleWishlistByUserCardId(data.userCard.id);
    this.toastService.success(`Added ${data.card.name} to portfolio`);
  }

  onRemoveClick(data: { card: typeof ALL_CARDS[number]; userCard: UserCard }): void {
    if (this.userCardsService.hasUserData(data.userCard)) {
      this.cardToRemove.set(data.card);
      this.userCardToRemove.set(data.userCard);
    } else {
      this.userCardsService.removeCardByUserCardId(data.userCard.id);
      this.toastService.info(`Removed ${data.card.name} from portfolio`);
    }
  }

  confirmRemoveCard(): void {
    const card = this.cardToRemove();
    const userCard = this.userCardToRemove();
    if (card && userCard) {
      // Remove the specific instance
      this.userCardsService.removeCardByUserCardId(userCard.id);
      this.toastService.info(`Removed ${card.name} from portfolio`);
      this.cardToRemove.set(null);
      this.userCardToRemove.set(null);
    }
  }

  cancelRemoveCard(): void {
    this.cardToRemove.set(null);
    this.userCardToRemove.set(null);
  }
}
