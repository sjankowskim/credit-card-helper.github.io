import { Component, signal, computed, inject } from '@angular/core';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CardListComponent, type CardListItem } from './components/card-list/card-list.component';
import { CardDetailComponent } from './components/card-detail/card-detail.component';
import { AddCardDialogComponent } from './components/add-card-dialog/add-card-dialog.component';
import { ModalComponent } from '../../shared/modal/modal.component';
import { CARD_MAP } from '../../core/data/cards';
import { UserCardsService, type WalletEntry } from '../../core/services/user-cards.service';
import { ToastService } from '../../core/services/toast.service';
import { CardStatus, type Card, type UserCard } from '../../core/models/card.model';
import {
  formatCurrency,
  getAnnualFee,
  getCardDisplayName,
  getNextAnniversary
} from '../../core/utils/card-display.utils';
import { formatDate, toIsoDate } from '../../core/utils/date.utils';

interface WalletGroup {
  title: string;
  items: CardListItem[];
}

@Component({
  selector: 'app-wallet',
  imports: [SearchBarComponent, CardListComponent, CardDetailComponent, AddCardDialogComponent, ModalComponent],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.scss'
})
export class WalletComponent {
  private readonly userCardsService = inject(UserCardsService);
  private readonly toastService = inject(ToastService);

  readonly searchQuery = signal('');
  readonly selected = signal<CardListItem | null>(null);
  readonly adding = signal<CardListItem | null>(null);
  readonly removing = signal<CardListItem | null>(null);

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

  readonly ownedGroups = computed<WalletGroup[]>(() => {
    const owned = this.filtered().filter(i => !i.userCard.isWishlist);
    const group = (title: string, status: CardStatus): WalletGroup => ({
      title,
      items: owned.filter(i => i.userCard.userData.status === status).map(i => this.toItem(i.card, i.userCard))
    });
    return [
      group('Active', CardStatus.ACTIVE),
      group('Product changed', CardStatus.PRODUCT_CHANGED),
      group('Closed', CardStatus.CLOSED)
    ].filter(g => g.items.length > 0);
  });

  readonly wishlistItems = computed(() =>
    this.filtered()
      .filter(i => i.userCard.isWishlist)
      .map(({ card, userCard }) => ({ card, userCard, lines: [describeAnnualFee(card.annualFee)] }))
  );

  readonly summary = computed(() => {
    const active = this.resolved().filter(i => i.userCard.userData.status === CardStatus.ACTIVE);
    const fees = active.reduce((sum, i) => sum + getAnnualFee(i.userCard, i.card), 0);
    return `${active.length} active ${active.length === 1 ? 'card' : 'cards'} · ${formatCurrency(fees)} in annual fees per year`;
  });

  readonly hasAnyCards = computed(() => this.resolved().length > 0);
  readonly hasResults = computed(() => this.ownedGroups().length > 0 || this.wishlistItems().length > 0);

  private toItem(card: Card, userCard: UserCard): CardListItem {
    const data = userCard.userData;
    const lines: string[] = [];

    if (data.accountStartDate) lines.push(`Opened ${formatDate(data.accountStartDate)}`);

    switch (data.status) {
      case CardStatus.ACTIVE: {
        const fee = getAnnualFee(userCard, card);
        const next = fee > 0 ? getNextAnniversary(data.accountStartDate) : null;
        lines.push(describeAnnualFee(fee) + (next ? ` · next ${formatDate(toIsoDate(next))}` : ''));
        break;
      }
      case CardStatus.CLOSED:
        if (data.closedData?.closedDate) lines.push(`Closed ${formatDate(data.closedData.closedDate)}`);
        break;
      case CardStatus.PRODUCT_CHANGED: {
        const to = data.productChangedData?.productChangedToCardId;
        lines.push(to ? `Changed to ${CARD_MAP.get(to)?.name ?? to}` : 'Pick the card it changed to');
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
    if (item.userCard && this.userCardsService.hasUserData(item.userCard)) {
      this.removing.set(item);
    } else {
      this.remove(item);
    }
  }

  remove(item: CardListItem): void {
    if (!item.userCard) return;
    this.userCardsService.remove(item.userCard.id);
    this.toastService.info(`Removed ${item.card.name} from your ${item.userCard.isWishlist ? 'wishlist' : 'wallet'}`);
    this.removing.set(null);
  }
}

function describeAnnualFee(fee: number): string {
  return fee > 0 ? `${formatCurrency(fee)} annual fee` : 'No annual fee';
}
