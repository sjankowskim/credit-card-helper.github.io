import { Component, signal, computed, inject } from '@angular/core';
import { SearchBarComponent } from '../wallet/components/search-bar/search-bar.component';
import { CardListComponent, type CardListItem } from '../wallet/components/card-list/card-list.component';
import { CardDetailComponent } from '../wallet/components/card-detail/card-detail.component';
import { AddCardDialogComponent } from '../wallet/components/add-card-dialog/add-card-dialog.component';
import { CardTableComponent } from './components/card-table/card-table.component';
import { StorageService } from '../../core/services/storage.service';
import type { CatalogSettings, CatalogSort, CatalogView } from '../../core/models/app-state.model';
import { ALL_CARDS } from '../../core/data/cards';
import { UserCardsService, type WalletEntry } from '../../core/services/user-cards.service';
import { ToastService } from '../../core/services/toast.service';
import type { Card } from '../../core/models/card.model';
import { formatCurrency, getBestRate } from '../../core/utils/card-display.utils';

export interface CardFilters {
  issuer: string;
  network: string;
  fee: '' | 'none' | 'paid';
  type: '' | 'personal' | 'business';
}

const NO_FILTERS: CardFilters = { issuer: '', network: '', fee: '', type: '' };

@Component({
  selector: 'app-cards',
  imports: [SearchBarComponent, CardListComponent, CardTableComponent, CardDetailComponent, AddCardDialogComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
  private readonly userCardsService = inject(UserCardsService);
  private readonly toastService = inject(ToastService);
  private readonly storage = inject(StorageService);

  readonly views: { id: CatalogView; label: string }[] = [
    { id: 'grid', label: 'Grid' },
    { id: 'compact', label: 'Compact' },
    { id: 'table', label: 'Table' }
  ];
  readonly sorts: { id: CatalogSort; label: string }[] = [
    { id: 'name', label: 'Name' },
    { id: 'issuer', label: 'Issuer' },
    { id: 'fee-asc', label: 'Annual fee: low to high' },
    { id: 'fee-desc', label: 'Annual fee: high to low' },
    { id: 'best-rate', label: 'Best earn rate' }
  ];

  readonly settings = computed(() => this.storage.state().catalogSettings);

  updateSettings(patch: Partial<CatalogSettings>): void {
    this.storage.update('catalogSettings', settings => ({ ...settings, ...patch }));
  }

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
    })
      .sort(compareCards(this.settings().sort))
      .map(card => ({
        card,
        lines: [card.annualFee > 0 ? `${formatCurrency(card.annualFee)} annual fee` : 'No annual fee']
      }));
  });

  /** One unnamed group, or one per issuer in alphabetical order */
  readonly groups = computed<{ title: string; items: CardListItem[] }[]>(() => {
    const items = this.items();
    // An empty result stays one group so the empty message still shows
    if (!this.settings().groupByIssuer || items.length === 0) return [{ title: '', items }];
    const byIssuer = new Map<string, CardListItem[]>();
    for (const item of items) {
      byIssuer.set(item.card.issuer, [...(byIssuer.get(item.card.issuer) ?? []), item]);
    }
    return [...byIssuer.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([title, groupItems]) => ({ title, items: groupItems }));
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

function compareCards(sort: CatalogSort): (a: Card, b: Card) => number {
  const byName = (a: Card, b: Card) => a.name.localeCompare(b.name);
  switch (sort) {
    case 'name':
      return byName;
    case 'issuer':
      return (a, b) => a.issuer.localeCompare(b.issuer) || byName(a, b);
    case 'fee-asc':
      return (a, b) => a.annualFee - b.annualFee || byName(a, b);
    case 'fee-desc':
      return (a, b) => b.annualFee - a.annualFee || byName(a, b);
    case 'best-rate':
      return (a, b) => getBestRate(b) - getBestRate(a) || byName(a, b);
  }
}
