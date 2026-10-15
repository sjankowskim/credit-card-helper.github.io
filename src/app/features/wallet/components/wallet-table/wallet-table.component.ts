import { Component, computed, input, output } from '@angular/core';
import type { CardListItem } from '../card-list/card-list.component';
import type { WalletColumn, WalletColumnId, WalletTableKind } from '../../../../core/data/wallet-columns';
import { getSubProgress, type SubState } from '../../../../core/utils/sub.utils';
import { CARD_MAP } from '../../../../core/data/cards';
import { CardStatus, type UserCard } from '../../../../core/models/card.model';
import {
  formatCurrency,
  formatSignUpBonus,
  getAnnualFee,
  getAvailabilityBadge,
  getCardDisplayName,
  getCardImageUrls,
  getDisplayInstanceNumber,
  getNextAnniversary,
  getOriginalCardName
} from '../../../../core/utils/card-display.utils';
import { formatDate, parseLocalDate, toIsoDate, today } from '../../../../core/utils/date.utils';

/** Wallet cards as table rows with configurable columns; clicking a row opens the card's popup for editing */
@Component({
  selector: 'app-wallet-table',
  templateUrl: './wallet-table.component.html',
  styleUrl: './wallet-table.component.scss'
})
export class WalletTableComponent {
  readonly items = input.required<CardListItem[]>();
  readonly kind = input.required<WalletTableKind>();
  readonly columns = input.required<WalletColumn[]>();
  /** Cards used to number duplicate instances (#1, #2) */
  readonly contextCards = input<UserCard[]>([]);

  readonly open = output<CardListItem>();

  readonly CardStatus = CardStatus;
  readonly formatCurrency = formatCurrency;
  readonly formatDate = formatDate;
  readonly formatSignUpBonus = formatSignUpBonus;
  readonly ordinal = ordinal;
  readonly getAvailabilityBadge = getAvailabilityBadge;

  /** Fee and credit limit totals for the kept and churn tables */
  readonly showTotals = computed(() => this.kind() === 'active' || this.kind() === 'churn');

  /** The table scrolls sideways instead of squeezing columns narrower than their widths */
  readonly minWidth = computed(() => `calc(${this.columns().map(c => c.width).join(' + ')})`);

  readonly totals = computed(() => {
    const rows = this.items().filter(i => i.userCard);
    return {
      annualFee: rows.reduce((sum, i) => sum + getAnnualFee(i.userCard!, i.card), 0),
      creditLimit: rows.reduce((sum, i) => sum + (i.userCard!.userData.activeData?.creditLimit ?? 0), 0)
    };
  });

  /** A plain-text cell's value; '' shows a dash */
  getText(item: CardListItem, column: WalletColumnId): string {
    const data = item.userCard?.userData;
    switch (column) {
      case 'issuer':
        return item.card.issuer;
      case 'annualFee':
        return formatCurrency(this.getAnnualFee(item));
      case 'nextAnnualFee':
        return formatDate(this.getNextAnnualFee(item));
      case 'creditLimit': {
        const limit = data?.activeData?.creditLimit;
        return limit === undefined ? '' : formatCurrency(limit);
      }
      case 'opened':
        return formatDate(data?.accountStartDate);
      case 'accountAge':
        return this.getAccountAge(item);
      case 'lastCliRequest':
        return formatDate(data?.activeData?.lastCliRequestDate);
      case 'paymentDue': {
        const day = data?.activeData?.paymentDueDate;
        return day ? ordinal(day) : '';
      }
      case 'plannedClose':
        return formatDate(data?.plannedCloseDate);
      case 'changedOn':
        return formatDate(this.getChangeDate(item));
      case 'changedTo':
        return this.getChangedTo(item) ?? '';
      case 'reason':
        return this.getReason(item) ?? '';
      case 'currentOffer': {
        const bonus = item.card.defaultSignUpBonus;
        return bonus ? formatSignUpBonus(bonus) : '';
      }
      case 'rewards':
        return item.card.rewardsCurrency;
      case 'network':
        return item.card.network;
      default:
        return '';
    }
  }

  getThumbnail(item: CardListItem): string | undefined {
    const images = getCardImageUrls(item.card);
    const design = item.userCard?.userData.cardDesign ?? 0;
    return images[Math.min(design, images.length - 1)];
  }

  getDisplayName(item: CardListItem): string {
    return item.userCard ? getCardDisplayName(item.userCard, item.card.name) : item.card.name;
  }

  getOriginalName(item: CardListItem): string | undefined {
    return item.userCard && getOriginalCardName(item.userCard, item.card.name);
  }

  getDisplayNumber(item: CardListItem): number | undefined {
    return item.userCard && getDisplayInstanceNumber(item.userCard, this.contextCards());
  }

  getAnnualFee(item: CardListItem): number {
    return item.userCard ? getAnnualFee(item.userCard, item.card) : item.card.annualFee;
  }

  /** Next anniversary for cards with a fee (ISO date) */
  getNextAnnualFee(item: CardListItem): string | undefined {
    if (this.getAnnualFee(item) === 0) return undefined;
    const next = getNextAnniversary(item.userCard?.userData.accountStartDate);
    return next ? toIsoDate(next) : undefined;
  }

  /** '3y 2m' from opening until today, or until a closed or product-changed card left the wallet */
  getAccountAge(item: CardListItem): string {
    const opened = parseLocalDate(item.userCard?.userData.accountStartDate);
    if (!opened) return '';
    const end = parseLocalDate(this.getChangeDate(item)) ?? today();
    let months = (end.getFullYear() - opened.getFullYear()) * 12 + end.getMonth() - opened.getMonth();
    if (end.getDate() < opened.getDate()) months--;
    if (months < 0) return '';
    const years = Math.floor(months / 12);
    return years > 0 ? `${years}y ${months % 12}m` : `${months}m`;
  }

  /** The bonus's state, or undefined when no bonus is tracked */
  getBonusState(item: CardListItem): SubState | undefined {
    const bonus = item.userCard?.userData.signUpBonus;
    return item.userCard && bonus ? getSubProgress(item.userCard, item.card, bonus).state : undefined;
  }

  /** When a closed or product-changed card left the wallet (ISO date) */
  getChangeDate(item: CardListItem): string | undefined {
    const data = item.userCard?.userData;
    if (data?.status === CardStatus.CLOSED) return data.closedData?.closedDate;
    if (data?.status === CardStatus.PRODUCT_CHANGED) return data.productChangedData?.productChangeDate;
    return undefined;
  }

  getChangedTo(item: CardListItem): string | undefined {
    const id = item.userCard?.userData.productChangedData?.productChangedToCardId;
    return id ? CARD_MAP.get(id)?.name ?? id : undefined;
  }

  getReason(item: CardListItem): string | undefined {
    const data = item.userCard?.userData;
    return data?.status === CardStatus.CLOSED ? data.closedData?.reason : data?.productChangedData?.reason;
  }
}

/** 1 -> '1st', 22 -> '22nd' */
export function ordinal(day: number): string {
  const suffixes: Record<number, string> = { 1: 'st', 2: 'nd', 3: 'rd' };
  const suffix = day % 100 >= 11 && day % 100 <= 13 ? 'th' : suffixes[day % 10] ?? 'th';
  return `${day}${suffix}`;
}
