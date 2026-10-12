import { Component, signal, computed, inject } from '@angular/core';
import { SearchBarComponent } from '../wallet/components/search-bar/search-bar.component';
import { CardListComponent, type CardListItem } from '../wallet/components/card-list/card-list.component';
import { CardDetailComponent } from '../wallet/components/card-detail/card-detail.component';
import { AddCardDialogComponent } from '../wallet/components/add-card-dialog/add-card-dialog.component';
import { CardTableComponent } from './components/card-table/card-table.component';
import { RangeSliderComponent } from '../../shared/range-slider/range-slider.component';
import { StorageService } from '../../core/services/storage.service';
import type { CatalogSettings, CatalogSort, CatalogView } from '../../core/models/app-state.model';
import { ALL_CARDS } from '../../core/data/cards';
import { UserCardsService, type WalletEntry } from '../../core/services/user-cards.service';
import { ToastService } from '../../core/services/toast.service';
import type { Card, CreditLevel, NetworkTier } from '../../core/models/card.model';
import { ALL_CATEGORIES, type CategoryId } from '../../core/data/category.registry';
import { formatCurrency, getBestRate } from '../../core/utils/card-display.utils';
import {
  CREDIT_LEVEL_LABELS,
  REWARDS_KIND_LABELS,
  earnsBonusOn,
  getRewardsKind,
  isSecuredCard,
  isStoreOnly,
  isStudentCard,
  qualifiesWith,
  type RewardsKind
} from '../../core/utils/card-filters.utils';

/** Show a kind of card, show only that kind, or hide it */
export type KindFilter = 'any' | 'only' | 'hide';

export interface CardFilters {
  issuer: string;
  network: string;
  /** A tier, or 'unknown' for Visa and Mastercard cards whose tier isn't filled in */
  tier: '' | NetworkTier | 'unknown';
  type: '' | 'personal' | 'business';
  /** Your credit; shows cards you typically qualify for */
  credit: '' | CreditLevel;
  feeMin: number;
  feeMax: number;
  rewards: '' | RewardsKind;
  category: '' | CategoryId;
  student: KindFilter;
  secured: KindFilter;
  storeOnly: KindFilter;
  discontinued: KindFilter;
  noForeignFee: boolean;
  hasBonus: boolean;
  hideOwned: boolean;
}

/** Highest annual fee in the catalog, rounded up to the slider step */
const FEE_STEP = 25;
const MAX_FEE = Math.ceil(Math.max(...ALL_CARDS.map(c => c.annualFee)) / FEE_STEP) * FEE_STEP;

const NO_FILTERS: CardFilters = {
  issuer: '',
  network: '',
  tier: '',
  type: '',
  credit: '',
  feeMin: 0,
  feeMax: MAX_FEE,
  rewards: '',
  category: '',
  student: 'any',
  secured: 'any',
  storeOnly: 'any',
  discontinued: 'any',
  noForeignFee: false,
  hasBonus: false,
  hideOwned: false
};

/** Lowest to highest within each network */
const TIER_ORDER: NetworkTier[] = [
  'Visa Signature',
  'Visa Infinite',
  'Visa Business',
  'Visa Signature Business',
  'Visa Infinite Business',
  'World Mastercard',
  'World Elite Mastercard',
  'World Legend Mastercard'
];

/** Groups tiers under their network and gives each a short label ('Visa Signature' → Visa: 'Signature') */
function groupTiers(tiers: NetworkTier[]): { network: string; tiers: { id: NetworkTier; label: string }[] }[] {
  const groups = new Map<string, { id: NetworkTier; label: string }[]>();
  for (const id of [...tiers].sort((a, b) => TIER_ORDER.indexOf(a) - TIER_ORDER.indexOf(b))) {
    const network = id.startsWith('Visa') ? 'Visa' : 'Mastercard';
    const label = id.replace(/^Visa /, '').replace(/ Mastercard$/, '');
    groups.set(network, [...(groups.get(network) ?? []), { id, label }]);
  }
  return [...groups.entries()].map(([network, list]) => ({ network, tiers: list }));
}

/** Visa and Mastercard cards have a tier; Amex, Discover, and store cards don't use tiers */
function isTierUnknown(card: Card): boolean {
  return !card.networkTier && (card.network === 'VISA' || card.network === 'MASTERCARD');
}

function matchesKind(filter: KindFilter, isKind: boolean): boolean {
  return filter === 'any' || (filter === 'only') === isKind;
}

@Component({
  selector: 'app-cards',
  imports: [SearchBarComponent, CardListComponent, CardTableComponent, CardDetailComponent, AddCardDialogComponent, RangeSliderComponent],
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
  /** Tiers in the catalog grouped by network, e.g. Visa → Signature, Infinite; ordered lowest to highest */
  readonly tierGroups = groupTiers([...new Set(ALL_CARDS.flatMap(c => (c.networkTier ? [c.networkTier] : [])))]);
  readonly creditLevels = Object.entries(CREDIT_LEVEL_LABELS) as [CreditLevel, string][];
  readonly rewardsKinds = Object.entries(REWARDS_KIND_LABELS) as [RewardsKind, string][];
  readonly categories = [...ALL_CATEGORIES].sort((a, b) => a.name.localeCompare(b.name));
  readonly kindFilters: { key: 'student' | 'secured' | 'storeOnly' | 'discontinued'; label: string }[] = [
    { key: 'student', label: 'Student cards' },
    { key: 'secured', label: 'Secured cards' },
    { key: 'storeOnly', label: 'Store-only cards' },
    { key: 'discontinued', label: 'Discontinued cards' }
  ];
  readonly maxFee = MAX_FEE;
  readonly feeStep = FEE_STEP;
  readonly formatFee = (value: number): string => (value === 0 ? '$0' : formatCurrency(value));
  readonly moreOpen = signal(false);

  readonly ownedCardIds = computed(
    () => new Set(this.userCardsService.cards().filter(c => !c.isWishlist).map(c => c.cardId))
  );
  readonly wishlistedCardIds = computed(
    () => new Set(this.userCardsService.cards().filter(c => c.isWishlist).map(c => c.cardId))
  );

  /** Filters that differ from the defaults; the fee range counts once */
  private countActive(keys: (keyof CardFilters)[]): number {
    const f = this.filters();
    const feeChanged = f.feeMin !== NO_FILTERS.feeMin || f.feeMax !== NO_FILTERS.feeMax;
    return keys.filter(k => k !== 'feeMin' && k !== 'feeMax' && f[k] !== NO_FILTERS[k]).length + (feeChanged ? 1 : 0);
  }

  readonly hasFilters = computed(() => this.countActive(Object.keys(NO_FILTERS) as (keyof CardFilters)[]) > 0);

  /** Active filters inside the More filters panel, shown on its button */
  readonly moreCount = computed(() =>
    this.countActive(['tier', 'rewards', 'category', 'student', 'secured', 'storeOnly', 'discontinued', 'noForeignFee', 'hasBonus', 'hideOwned'])
  );

  readonly items = computed<CardListItem[]>(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const f = this.filters();
    const owned = this.ownedCardIds();

    return ALL_CARDS.filter(card => {
      if (query && ![card.name, card.issuer, card.rewardsCurrency].some(t => t.toLowerCase().includes(query))) return false;
      if (f.issuer && card.issuer !== f.issuer) return false;
      if (f.network && card.network !== f.network) return false;
      if (f.tier && (f.tier === 'unknown' ? !isTierUnknown(card) : card.networkTier !== f.tier)) return false;
      if (f.type && card.isBusiness !== (f.type === 'business')) return false;
      if (f.credit && !qualifiesWith(card, f.credit)) return false;
      if (card.annualFee < f.feeMin || card.annualFee > f.feeMax) return false;
      if (f.rewards && getRewardsKind(card) !== f.rewards) return false;
      if (f.category && !earnsBonusOn(card, f.category)) return false;
      if (!matchesKind(f.student, isStudentCard(card))) return false;
      if (!matchesKind(f.secured, isSecuredCard(card))) return false;
      if (!matchesKind(f.storeOnly, isStoreOnly(card))) return false;
      if (!matchesKind(f.discontinued, !!card.discontinued)) return false;
      if (f.noForeignFee && card.hasForeignTransactionFee) return false;
      if (f.hasBonus && !card.defaultSignUpBonus) return false;
      if (f.hideOwned && owned.has(card.id)) return false;
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

  setFeeRange({ low, high }: { low: number; high: number }): void {
    this.filters.update(f => ({ ...f, feeMin: low, feeMax: high }));
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
