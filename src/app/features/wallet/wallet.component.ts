import { Component, signal, computed, inject } from '@angular/core';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CardListComponent, type CardListItem } from './components/card-list/card-list.component';
import { CardDetailComponent } from './components/card-detail/card-detail.component';
import { WalletTableComponent } from './components/wallet-table/wallet-table.component';
import {
  DEFAULT_WALLET_COLUMNS,
  REQUIRED_COLUMNS,
  WALLET_TABLE_TITLES,
  getAvailableColumns,
  getVisibleColumns,
  type WalletColumn,
  type WalletColumnId,
  type WalletTableKind
} from '../../core/data/wallet-columns';
import { AddCardDialogComponent } from './components/add-card-dialog/add-card-dialog.component';
import { ModalComponent } from '../../shared/modal/modal.component';
import { ChecklistPickerComponent, type ChecklistGroup } from '../../shared/checklist-picker/checklist-picker.component';
import { CARD_MAP } from '../../core/data/cards';
import { UserCardsService, type WalletEntry } from '../../core/services/user-cards.service';
import { ToastService } from '../../core/services/toast.service';
import { StorageService } from '../../core/services/storage.service';
import type { CatalogView } from '../../core/models/app-state.model';
import { CardStatus, type Card, type UserCard } from '../../core/models/card.model';
import {
  formatCurrency,
  getAnnualFee,
  getCardDisplayName,
  getNextAnniversary
} from '../../core/utils/card-display.utils';
import { formatDate, toIsoDate } from '../../core/utils/date.utils';
import { getAccountChain } from '../../core/utils/card-history.utils';

interface WalletGroup {
  title: string;
  kind: WalletTableKind;
  items: CardListItem[];
}

@Component({
  selector: 'app-wallet',
  imports: [SearchBarComponent, CardListComponent, WalletTableComponent, CardDetailComponent, AddCardDialogComponent, ModalComponent, ChecklistPickerComponent],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.scss'
})
export class WalletComponent {
  private readonly userCardsService = inject(UserCardsService);
  private readonly toastService = inject(ToastService);
  private readonly storage = inject(StorageService);

  readonly views: { id: CatalogView; label: string }[] = [
    { id: 'grid', label: 'Grid' },
    { id: 'compact', label: 'Compact' },
    { id: 'table', label: 'Table' }
  ];
  readonly view = computed(() => this.storage.state().walletSettings.view);

  setView(view: CatalogView): void {
    this.storage.update('walletSettings', settings => ({ ...settings, view }));
  }

  // ---- Table columns ----

  readonly tableKinds: WalletTableKind[] = ['active', 'churn', 'history', 'wishlist'];
  readonly editingColumns = signal(false);

  private readonly savedColumns = computed(() => this.storage.state().walletSettings.columns ?? {});

  /** Columns each table shows */
  readonly columns = computed(() => {
    const saved = this.savedColumns();
    return Object.fromEntries(this.tableKinds.map(kind => [kind, getVisibleColumns(kind, saved[kind])])) as Record<
      WalletTableKind,
      WalletColumn[]
    >;
  });

  readonly columnGroups = computed<ChecklistGroup[]>(() =>
    this.tableKinds.map(kind => ({
      key: kind,
      title: WALLET_TABLE_TITLES[kind],
      items: getAvailableColumns(kind),
      checked: this.columns()[kind].map(c => c.id),
      required: REQUIRED_COLUMNS,
      isDefault: this.isDefaultColumns(kind)
    }))
  );

  toggleColumn(kind: WalletTableKind, id: WalletColumnId, shown: boolean): void {
    const current = this.columns()[kind].map(c => c.id);
    const next = shown ? [...current, id] : current.filter(c => c !== id);
    this.storage.update('walletSettings', settings => ({ ...settings, columns: { ...settings.columns, [kind]: next } }));
  }

  resetColumns(kind: WalletTableKind): void {
    this.storage.update('walletSettings', settings => {
      const { [kind]: _, ...rest } = settings.columns ?? {};
      return { ...settings, columns: rest };
    });
  }

  private isDefaultColumns(kind: WalletTableKind): boolean {
    const shown = this.columns()[kind].map(c => c.id);
    const defaults = DEFAULT_WALLET_COLUMNS[kind];
    return shown.length === defaults.length && shown.every(id => defaults.includes(id));
  }

  readonly searchQuery = signal('');
  readonly selected = signal<CardListItem | null>(null);
  readonly adding = signal<CardListItem | null>(null);
  readonly removing = signal<CardListItem | null>(null);
  /** Cards linked by product change to the one being removed, which are removed with it */
  readonly removingLinked = computed(() => {
    const userCard = this.removing()?.userCard;
    if (!userCard) return [];
    return getAccountChain(userCard.id, this.userCardsService.cards())
      .filter(c => c.id !== userCard.id)
      .map(c => getCardDisplayName(c, CARD_MAP.get(c.cardId)?.name ?? c.cardId));
  });

  /** Every instance with its catalog card, sorted by name then instance number */
  private readonly resolved = computed(() =>
    this.userCardsService
      .cards()
      .flatMap(userCard => {
        const card = CARD_MAP.get(userCard.cardId);
        return card ? [{ card, userCard }] : [];
      })
      .sort((a, b) => a.card.name.localeCompare(b.card.name) || a.userCard.instanceNumber - b.userCard.instanceNumber)
  );

  readonly ownedCards = computed(() => this.resolved().filter(i => !i.userCard.isWishlist).map(i => i.userCard));
  readonly wishlistCards = computed(() => this.resolved().filter(i => i.userCard.isWishlist).map(i => i.userCard));

  private readonly filtered = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    if (!query) return this.resolved();
    return this.resolved().filter(({ card, userCard }) =>
      [card.name, card.issuer, card.rewardsCurrency, userCard.userData.customLabel ?? ''].some(text =>
        text.toLowerCase().includes(query)
      )
    );
  });

  /** Kept cards, churn cards, then closed and product-changed cards (most recent first) */
  readonly ownedGroups = computed<WalletGroup[]>(() => {
    const owned = this.filtered().filter(i => !i.userCard.isWishlist);
    const active = owned.filter(i => i.userCard.userData.status === CardStatus.ACTIVE);
    const history = owned
      .filter(i => i.userCard.userData.status !== CardStatus.ACTIVE)
      .sort((a, b) => (getChangeDate(b.userCard) ?? '').localeCompare(getChangeDate(a.userCard) ?? ''));
    const toItems = (list: typeof owned) => list.map(i => this.toItem(i.card, i.userCard));
    return [
      { kind: 'active' as const, items: toItems(active.filter(i => !i.userCard.userData.isChurnCard)) },
      { kind: 'churn' as const, items: toItems(active.filter(i => i.userCard.userData.isChurnCard)) },
      { kind: 'history' as const, items: toItems(history) }
    ]
      .map(group => ({ ...group, title: WALLET_TABLE_TITLES[group.kind] }))
      .filter(g => g.items.length > 0);
  });

  readonly wishlistItems = computed(() =>
    this.filtered()
      .filter(i => i.userCard.isWishlist)
      .map(({ card, userCard }) => ({ card, userCard, lines: [describeAnnualFee(card.annualFee)] }))
  );

  readonly summary = computed(() => {
    const active = this.resolved().filter(i => i.userCard.userData.status === CardStatus.ACTIVE);
    const fees = active.reduce((sum, i) => sum + getAnnualFee(i.userCard, i.card), 0);
    const limit = active.reduce((sum, i) => sum + (i.userCard.userData.activeData?.creditLimit ?? 0), 0);
    return (
      `${active.length} active ${active.length === 1 ? 'card' : 'cards'} · ${formatCurrency(fees)} in annual fees per year` +
      (limit > 0 ? ` · ${formatCurrency(limit)} total credit` : '')
    );
  });

  readonly hasAnyCards = computed(() => this.resolved().length > 0);
  readonly hasResults = computed(() => this.ownedGroups().length > 0 || this.wishlistItems().length > 0);

  private toItem(card: Card, userCard: UserCard): CardListItem {
    const data = userCard.userData;
    const lines: string[] = [];

    // A card from a product change wasn't opened itself; the account was, as an earlier card
    if (data.accountStartDate) {
      lines.push(`${data.productChangedFromId ? 'Account opened' : 'Opened'} ${formatDate(data.accountStartDate)}`);
    }

    switch (data.status) {
      case CardStatus.ACTIVE: {
        const fee = getAnnualFee(userCard, card);
        const next = fee > 0 ? getNextAnniversary(data.accountStartDate) : null;
        lines.push(describeAnnualFee(fee) + (next ? ` · next ${formatDate(toIsoDate(next))}` : ''));
        break;
      }
      case CardStatus.CLOSED:
        if (data.closedData?.closedDate) lines.push(`Closed ${formatDate(data.closedData.closedDate)}`);
        if (data.closedData?.reason) lines.push(data.closedData.reason);
        break;
      case CardStatus.PRODUCT_CHANGED: {
        const to = data.productChangedData?.productChangedToCardId;
        const on = data.productChangedData?.productChangeDate;
        lines.push(
          (to ? `Changed to ${CARD_MAP.get(to)?.name ?? to}` : 'Pick the card it changed to') + (on ? ` · ${formatDate(on)}` : '')
        );
        if (data.productChangedData?.reason) lines.push(data.productChangedData.reason);
        break;
      }
    }

    const from = data.productChangedFromId ? this.userCardsService.getById(data.productChangedFromId) : undefined;
    const fromCard = from && CARD_MAP.get(from.cardId);
    if (from && fromCard) lines.push(`Product changed from ${getCardDisplayName(from, fromCard.name)}`);

    return { card, userCard, lines };
  }

  onAdded(entry: WalletEntry): void {
    const item = this.adding();
    if (!item?.userCard) return;
    this.userCardsService.moveToWallet(item.userCard.id, entry);
    this.toastService.success(`Added ${item.card.name} to your wallet`);
    this.adding.set(null);
  }

  onUnwishlist(item: CardListItem): void {
    if (!item.userCard) return;
    this.userCardsService.toggleWishlist(item.userCard.id);
    this.toastService.info(`Removed ${item.card.name} from your wishlist`);
  }

  onRemoveFromDetail(item: CardListItem): void {
    this.selected.set(null);
    this.onRemove(item);
  }

  onRemove(item: CardListItem): void {
    const userCard = item.userCard;
    const linked = userCard ? getAccountChain(userCard.id, this.userCardsService.cards()).length > 1 : false;
    if (userCard && (linked || this.userCardsService.hasUserData(userCard))) {
      this.removing.set(item);
    } else {
      this.remove(item);
    }
  }

  remove(item: CardListItem): void {
    if (!item.userCard) return;
    const removed = this.userCardsService.removeAccount(item.userCard.id);
    const where = item.userCard.isWishlist ? 'wishlist' : 'wallet';
    this.toastService.info(
      removed.length > 1
        ? `Removed ${item.card.name} and ${removed.length - 1} linked ${removed.length === 2 ? 'card' : 'cards'} from your ${where}`
        : `Removed ${item.card.name} from your ${where}`
    );
    this.removing.set(null);
  }
}

/** When a closed or product-changed card left the wallet (ISO date) */
function getChangeDate(userCard: UserCard): string | undefined {
  const data = userCard.userData;
  return data.status === CardStatus.CLOSED ? data.closedData?.closedDate : data.productChangedData?.productChangeDate;
}

function describeAnnualFee(fee: number): string {
  return fee > 0 ? `${formatCurrency(fee)} annual fee` : 'No annual fee';
}
