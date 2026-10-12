import { Component, computed, input, output } from '@angular/core';
import type { CardListItem } from '../../../wallet/components/card-list/card-list.component';
import type { CatalogSort } from '../../../../core/models/app-state.model';
import { sortIndicator, type CatalogColumn, type CatalogColumnId } from '../../../../core/data/catalog-columns';
import {
  formatCurrency,
  formatRate,
  formatSignUpBonus,
  getAvailabilityBadge,
  getBestRate,
  getCardImageUrls,
  getEarnUnit
} from '../../../../core/utils/card-display.utils';
import { CREDIT_LEVEL_LABELS } from '../../../../core/utils/card-filters.utils';
import type { Card } from '../../../../core/models/card.model';

/** Width of the + Add and wishlist star column, which every table has */
const ACTIONS_WIDTH = '7.5rem';
/** The card column takes the leftover space but never gets narrower than this */
const CARD_MIN_WIDTH = '16rem';

/** Catalog cards as sortable table rows with configurable columns */
@Component({
  selector: 'app-card-table',
  templateUrl: './card-table.component.html',
  styleUrl: './card-table.component.scss'
})
export class CardTableComponent {
  readonly items = input.required<CardListItem[]>();
  readonly columns = input.required<CatalogColumn[]>();
  readonly sort = input.required<CatalogSort>();
  readonly ownedCardIds = input<ReadonlySet<string>>(new Set());
  readonly wishlistedCardIds = input<ReadonlySet<string>>(new Set());
  readonly emptyMessage = input('No cards found');

  readonly open = output<CardListItem>();
  readonly add = output<CardListItem>();
  readonly toggleWishlist = output<CardListItem>();
  readonly sortChange = output<CatalogSort>();

  readonly actionsWidth = ACTIONS_WIDTH;
  readonly getAvailabilityBadge = getAvailabilityBadge;

  /** The table scrolls sideways instead of squeezing columns narrower than their widths */
  readonly minWidth = computed(
    () => `calc(${[...this.columns().map(c => c.width ?? CARD_MIN_WIDTH), ACTIONS_WIDTH].join(' + ')})`
  );

  getThumbnail(card: Card): string | undefined {
    return getCardImageUrls(card)[0];
  }

  /** A plain-text cell's value; '' shows a dash */
  getText(card: Card, column: CatalogColumnId): string {
    switch (column) {
      case 'issuer':
        return card.issuer;
      case 'type':
        return card.isBusiness ? 'Business' : 'Personal';
      case 'annualFee':
        return formatCurrency(card.annualFee);
      case 'baseRate':
        return formatRate(card.baseRewardRate, getEarnUnit(card));
      case 'bestRate':
        return formatRate(getBestRate(card), getEarnUnit(card));
      case 'rewards':
        return card.rewardsCurrency;
      case 'network':
        return card.network;
      case 'networkTier':
        return card.networkTier ?? '';
      case 'creditNeeded':
        return CREDIT_LEVEL_LABELS[card.creditNeeded];
      case 'foreignFee':
        return card.hasForeignTransactionFee ? 'Yes' : 'None';
      case 'currentOffer':
        return card.defaultSignUpBonus ? formatSignUpBonus(card.defaultSignUpBonus) : '';
      default:
        return '';
    }
  }

  /** Clicking the fee header flips between low-to-high and high-to-low */
  sortBy(column: CatalogColumn): void {
    switch (column.sort) {
      case undefined:
        return;
      case 'fee':
        this.sortChange.emit(this.sort() === 'fee-asc' ? 'fee-desc' : 'fee-asc');
        return;
      default:
        this.sortChange.emit(column.sort);
    }
  }

  sortIndicator(column: CatalogColumn): string {
    return sortIndicator(column, this.sort());
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
