import { Component, computed, inject, signal } from '@angular/core';
import { UserCardsService } from '../../core/services/user-cards.service';
import { getCardDisplayName, getDisplayInstanceNumber, getOriginalCardName } from '../../core/utils/card-display.utils';
import { CARD_MAP } from '../../core/data/cards';
import type { UserCard } from '../../core/models/card.model';
import type { Card } from '../../core/models/card.model';
import { CardStatus } from '../../core/models/card.model';
import { isWithin, parseLocalDate } from '../../core/utils/date.utils';

interface AccountRow {
  card: Card;
  userCard: UserCard;
  accountDate: string | null;
  within2Years: boolean;
  within90Days: boolean;
  within60Days: boolean;
  within30Days: boolean;
  affects524: boolean;
}

@Component({
  selector: 'app-account-tracker',
  templateUrl: './account-tracker.component.html',
  styleUrl: './account-tracker.component.scss'
})
export class AccountTrackerComponent {
  private readonly userCardsService = inject(UserCardsService);

  readonly userCards = this.userCardsService.cards;
  readonly ownedCards = computed(() => this.userCardsService.cards().filter(c => c.userData.status === CardStatus.ACTIVE));

  getDisplayName(userCard: UserCard, cardName: string): string {
    return getCardDisplayName(userCard, cardName, this.ownedCards());
  }

  getDisplayNumber(userCard: UserCard): number | undefined {
    return getDisplayInstanceNumber(userCard, this.ownedCards());
  }

  getOriginalCardName(userCard: UserCard, cardName: string): string | undefined {
    return getOriginalCardName(userCard, cardName);
  }
  
  readonly sortColumn = signal<'card' | 'date' | 'within2Years' | 'within90Days' | 'within60Days' | 'within30Days' | 'affects524'>('card');
  readonly sortDirection = signal<'asc' | 'desc'>('asc');
  readonly filterWithin2Years = signal<boolean | null>(null);
  readonly filterWithin90Days = signal<boolean | null>(null);
  readonly filterWithin60Days = signal<boolean | null>(null);
  readonly filterWithin30Days = signal<boolean | null>(null);
  readonly filterAffects524 = signal<boolean | null>(null);

  readonly accountRows = computed(() => {
    const rows: AccountRow[] = [];

    for (const userCard of this.ownedCards()) {
      const card = CARD_MAP.get(userCard.cardId);
      if (!card) continue;

      const accountDate = parseLocalDate(userCard.userData.accountStartDate);

      rows.push({
        card,
        userCard,
        accountDate: userCard.userData.accountStartDate || null,
        within2Years: accountDate ? isWithin(accountDate, 24, 'months') : false,
        within90Days: accountDate ? isWithin(accountDate, 90, 'days') : false,
        within60Days: accountDate ? isWithin(accountDate, 60, 'days') : false,
        within30Days: accountDate ? isWithin(accountDate, 30, 'days') : false,
        affects524: card.affectsChase524
      });
    }

    // Apply filters
    let filteredRows = rows;
    if (this.filterWithin2Years() !== null) {
      filteredRows = filteredRows.filter(r => r.within2Years === this.filterWithin2Years());
    }
    if (this.filterWithin90Days() !== null) {
      filteredRows = filteredRows.filter(r => r.within90Days === this.filterWithin90Days());
    }
    if (this.filterWithin60Days() !== null) {
      filteredRows = filteredRows.filter(r => r.within60Days === this.filterWithin60Days());
    }
    if (this.filterWithin30Days() !== null) {
      filteredRows = filteredRows.filter(r => r.within30Days === this.filterWithin30Days());
    }
    if (this.filterAffects524() !== null) {
      filteredRows = filteredRows.filter(r => r.affects524 === this.filterAffects524());
    }

    // Apply sorting
    const column = this.sortColumn();
    const direction = this.sortDirection();
    
    return filteredRows.sort((a, b) => {
      let comparison = 0;
      
      switch (column) {
        case 'card':
          comparison = a.card.name.localeCompare(b.card.name);
          break;
        case 'date':
          if (!a.accountDate) comparison = 1;
          else if (!b.accountDate) comparison = -1;
          else comparison = a.accountDate.localeCompare(b.accountDate); // ISO dates sort as strings
          break;
        case 'within2Years':
          comparison = Number(a.within2Years) - Number(b.within2Years);
          break;
        case 'within90Days':
          comparison = Number(a.within90Days) - Number(b.within90Days);
          break;
        case 'within60Days':
          comparison = Number(a.within60Days) - Number(b.within60Days);
          break;
        case 'within30Days':
          comparison = Number(a.within30Days) - Number(b.within30Days);
          break;
        case 'affects524':
          comparison = Number(a.affects524) - Number(b.affects524);
          break;
      }
      
      return direction === 'asc' ? comparison : -comparison;
    });
  });

  readonly totals = computed(() => {
    const rows = this.accountRows();
    return {
      within2Years: rows.filter(r => r.within2Years).length,
      within90Days: rows.filter(r => r.within90Days).length,
      within60Days: rows.filter(r => r.within60Days).length,
      within30Days: rows.filter(r => r.within30Days).length,
      affects524: rows.filter(r => r.affects524 && r.within2Years).length
    };
  });

  readonly chase524Status = computed(() => {
    return this.totals().affects524;
  });

  onDateChange(userCardId: string, date: string): void {
    this.userCardsService.patchUserData(userCardId, { accountStartDate: date || undefined });
  }

  onSort(column: 'card' | 'date' | 'within2Years' | 'within90Days' | 'within60Days' | 'within30Days' | 'affects524'): void {
    if (this.sortColumn() === column) {
      // Toggle direction if same column
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      // New column, set to ascending
      this.sortColumn.set(column);
      this.sortDirection.set('asc');
    }
  }

  onFilterWithin2Years(): void {
    const current = this.filterWithin2Years();
    if (current === null) this.filterWithin2Years.set(true);
    else if (current === true) this.filterWithin2Years.set(false);
    else this.filterWithin2Years.set(null);
  }

  onFilterWithin90Days(): void {
    const current = this.filterWithin90Days();
    if (current === null) this.filterWithin90Days.set(true);
    else if (current === true) this.filterWithin90Days.set(false);
    else this.filterWithin90Days.set(null);
  }

  onFilterWithin60Days(): void {
    const current = this.filterWithin60Days();
    if (current === null) this.filterWithin60Days.set(true);
    else if (current === true) this.filterWithin60Days.set(false);
    else this.filterWithin60Days.set(null);
  }

  onFilterWithin30Days(): void {
    const current = this.filterWithin30Days();
    if (current === null) this.filterWithin30Days.set(true);
    else if (current === true) this.filterWithin30Days.set(false);
    else this.filterWithin30Days.set(null);
  }

  onFilterAffects524(): void {
    const current = this.filterAffects524();
    if (current === null) this.filterAffects524.set(true);
    else if (current === true) this.filterAffects524.set(false);
    else this.filterAffects524.set(null);
  }

  resetFilters(): void {
    this.filterWithin2Years.set(null);
    this.filterWithin90Days.set(null);
    this.filterWithin60Days.set(null);
    this.filterWithin30Days.set(null);
    this.filterAffects524.set(null);
  }
}
