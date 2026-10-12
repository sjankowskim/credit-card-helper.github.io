import { Component, input, output } from '@angular/core';
import type { CardListItem } from '../../../wallet/components/card-list/card-list.component';
import type { CatalogSort } from '../../../../core/models/app-state.model';
import {
  formatCurrency,
  formatRate,
  formatSignUpBonus,
  getAvailabilityBadge,
  getBestRate,
  getCardImageUrls,
  getEarnUnit
} from '../../../../core/utils/card-display.utils';
import type { Card } from '../../../../core/models/card.model';

/** Catalog cards as sortable table rows */
@Component({
  selector: 'app-card-table',
  templateUrl: './card-table.component.html',
  styleUrl: './card-table.component.scss'
})
export class CardTableComponent {
  readonly items = input.required<CardListItem[]>();
  readonly sort = input.required<CatalogSort>();
  readonly ownedCardIds = input<ReadonlySet<string>>(new Set());
  readonly wishlistedCardIds = input<ReadonlySet<string>>(new Set());
  readonly emptyMessage = input('No cards found');

  readonly open = output<CardListItem>();
  readonly add = output<CardListItem>();
  readonly toggleWishlist = output<CardListItem>();
  readonly sortChange = output<CatalogSort>();

  readonly formatCurrency = formatCurrency;
  readonly formatSignUpBonus = formatSignUpBonus;
  readonly getAvailabilityBadge = getAvailabilityBadge;

  getThumbnail(card: Card): string | undefined {
    return getCardImageUrls(card)[0];
  }

  formatRate(rate: number, card: Card): string {
    return formatRate(rate, getEarnUnit(card));
  }

  getBestRate(card: Card): number {
    return getBestRate(card);
  }

  /** Clicking the fee header flips between low-to-high and high-to-low */
  sortBy(column: 'name' | 'issuer' | 'fee' | 'best-rate'): void {
    if (column === 'fee') {
      this.sortChange.emit(this.sort() === 'fee-asc' ? 'fee-desc' : 'fee-asc');
    } else {
      this.sortChange.emit(column);
    }
  }

  sortIndicator(column: 'name' | 'issuer' | 'fee' | 'best-rate'): string {
    const sort = this.sort();
    if (column === 'fee') return sort === 'fee-asc' ? '↑' : sort === 'fee-desc' ? '↓' : '';
    if (column === 'best-rate') return sort === 'best-rate' ? '↓' : '';
    return sort === column ? '↑' : '';
  }

  isStarred(item: CardListItem): boolean {
    return this.wishlistedCardIds().has(item.card.id);
  }

  /** Keeps a button click from also opening the row */
  fire(event: Event, emitter: { emit(item: CardListItem): void }, item: CardListItem): void {
    event.stopPropagation();
    emitter.emit(item);
  }
}
