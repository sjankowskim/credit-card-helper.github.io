import { Component, signal, computed, inject } from '@angular/core';
import { SearchBarComponent } from '../wallet/components/search-bar/search-bar.component';
import { CardListComponent, type CardListItem } from '../wallet/components/card-list/card-list.component';
import { CardDetailComponent } from '../wallet/components/card-detail/card-detail.component';
import { AddCardDialogComponent } from '../wallet/components/add-card-dialog/add-card-dialog.component';
import { ALL_CARDS } from '../../core/data/cards';
import { UserCardsService, type WalletEntry } from '../../core/services/user-cards.service';
import { ToastService } from '../../core/services/toast.service';
import type { Card } from '../../core/models/card.model';
import { formatCurrency } from '../../core/utils/card-display.utils';

export interface CardFilters {
  issuer: string;
  network: string;
  fee: '' | 'none' | 'paid';
  type: '' | 'personal' | 'business';
}

const NO_FILTERS: CardFilters = { issuer: '', network: '', fee: '', type: '' };

@Component({
  selector: 'app-cards',
  imports: [SearchBarComponent, CardListComponent, CardDetailComponent, AddCardDialogComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
  private readonly userCardsService = inject(UserCardsService);
  private readonly toastService = inject(ToastService);

  readonly searchQuery = signal('');
  readonly filters = signal<CardFilters>(NO_FILTERS);
  readonly selected = signal<Card | null>(null);
  readonly adding = signal<Card | null>(null);

  readonly issuers = [...new Set(ALL_CARDS.map(c => c.issuer))].sort();
  readonly networks = [...new Set(ALL_CARDS.map(c => c.network))].sort();

  readonly ownedCardIds = computed(
    () => new Set(this.userCardsService.cards().filter(c => !c.isWishlist).map(c => c.cardId))
  );
  readonly wishlistedCardIds = computed(
    () => new Set(this.userCardsService.cards().filter(c => c.isWishlist).map(c => c.cardId))
  );

  readonly hasFilters = computed(() => Object.values(this.filters()).some(Boolean));

  readonly items = computed<CardListItem[]>(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const { issuer, network, fee, type } = this.filters();

    return ALL_CARDS.filter(card => {
      if (query && ![card.name, card.issuer, card.rewardsCurrency].some(t => t.toLowerCase().includes(query))) return false;
      if (issuer && card.issuer !== issuer) return false;
      if (network && card.network !== network) return false;
      if (fee === 'none' && card.annualFee > 0) return false;
      if (fee === 'paid' && card.annualFee === 0) return false;
      if (type && card.isBusiness !== (type === 'business')) return false;
      return true;
    }).map(card => ({
      card,
      lines: [card.annualFee > 0 ? `${formatCurrency(card.annualFee)} annual fee` : 'No annual fee']
    }));
  });

  setFilter<K extends keyof CardFilters>(key: K, value: CardFilters[K]): void {
    this.filters.update(f => ({ ...f, [key]: value }));
  }

  clearFilters(): void {
    this.filters.set(NO_FILTERS);
  }

  /** The star adds one wishlist entry per card, or removes it if already wishlisted */
  onToggleWishlist({ card }: CardListItem): void {
    const existing = this.userCardsService.cards().find(c => c.isWishlist && c.cardId === card.id);
    if (existing) {
      this.userCardsService.remove(existing.id);
      this.toastService.info(`Removed ${card.name} from your wishlist`);
    } else {
      this.userCardsService.addCard(card.id, { isWishlist: true });
      this.toastService.success(`Added ${card.name} to your wishlist`);
    }
  }

  startAdding(card: Card): void {
    this.selected.set(null);
    this.adding.set(card);
  }

  onAdded(entry: WalletEntry): void {
    const card = this.adding();
    if (!card) return;

    // Adding a wishlisted card moves it out of the wishlist
    const wishlisted = this.userCardsService.cards().find(c => c.isWishlist && c.cardId === card.id);
    if (wishlisted) {
      this.userCardsService.moveToWallet(wishlisted.id, entry);
    } else {
      this.userCardsService.addCard(card.id, entry);
    }
    this.toastService.success(`Added ${card.name} to your wallet`);
    this.adding.set(null);
  }
}
