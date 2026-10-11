import { Component, input, output } from '@angular/core';
import { CardStatus, type Card, type UserCard } from '../../../../core/models/card.model';
import {
  getCardDisplayName,
  getCardImageUrl,
  getDisplayInstanceNumber,
  getOriginalCardName
} from '../../../../core/utils/card-display.utils';

export interface CardListItem {
  card: Card;
  /** The user's instance; absent for catalog tiles */
  userCard?: UserCard;
  /** Extra detail lines under the card name (annual fee, product change link, ...) */
  lines?: string[];
}

/**
 * - catalog: every card, with + Add, a wishlist star, and Owned/Wishlisted badges
 * - wallet: owned instances, with a status badge and remove
 * - wishlist: wishlist instances, with + Add and a star to un-wishlist
 */
export type CardListMode = 'catalog' | 'wallet' | 'wishlist';

const STATUS_BADGES: Record<CardStatus, { label: string; class: string }> = {
  [CardStatus.ACTIVE]: { label: 'Active', class: 'badge-success' },
  [CardStatus.CLOSED]: { label: 'Closed', class: '' },
  [CardStatus.PRODUCT_CHANGED]: { label: 'Product changed', class: 'badge-info' }
};

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent {
  readonly items = input.required<CardListItem[]>();
  readonly mode = input.required<CardListMode>();
  /** Cards used to number duplicate instances (#1, #2) */
  readonly contextCards = input<UserCard[]>([]);
  readonly ownedCardIds = input<ReadonlySet<string>>(new Set());
  readonly wishlistedCardIds = input<ReadonlySet<string>>(new Set());
  readonly emptyMessage = input('No cards found');

  readonly open = output<CardListItem>();
  readonly add = output<CardListItem>();
  readonly toggleWishlist = output<CardListItem>();
  readonly remove = output<CardListItem>();

  getDisplayName(item: CardListItem): string {
    return item.userCard ? getCardDisplayName(item.userCard, item.card.name) : item.card.name;
  }

  getOriginalName(item: CardListItem): string | undefined {
    return item.userCard && getOriginalCardName(item.userCard, item.card.name);
  }

  getDisplayNumber(item: CardListItem): number | undefined {
    return item.userCard && getDisplayInstanceNumber(item.userCard, this.contextCards());
  }

  getImageUrl(item: CardListItem): string | undefined {
    return getCardImageUrl(item.card);
  }

  getStatusBadge(item: CardListItem): { label: string; class: string } | undefined {
    const status = item.userCard?.userData.status;
    return status && STATUS_BADGES[status];
  }

  isStarred(item: CardListItem): boolean {
    return this.mode() === 'wishlist' || this.wishlistedCardIds().has(item.card.id);
  }

  /** Enter on the tile opens it; Enter on a button inside it only presses the button */
  onEnter(event: Event, item: CardListItem): void {
    if (event.target === event.currentTarget) {
      this.open.emit(item);
    }
  }

  /** Keeps a button click from also opening the tile */
  fire(event: Event, emitter: { emit(item: CardListItem): void }, item: CardListItem): void {
    event.stopPropagation();
    emitter.emit(item);
  }
}
