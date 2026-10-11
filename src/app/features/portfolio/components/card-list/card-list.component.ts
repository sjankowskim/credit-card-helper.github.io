import { Component, input, output, computed } from '@angular/core';
import type { Card } from '../../../../core/models/card.model';
import type { UserCard } from '../../../../core/models/card.model';
import { CARD_MAP } from '../../../../core/data/cards';
import { getCardDisplayName, getDisplayInstanceNumber, getOriginalCardName } from '../../../../core/utils/card-display.utils';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent {
  readonly cards = input<Card[]>([]);
  readonly userCards = input<UserCard[]>([]);
  readonly contextCards = input<UserCard[]>([]);
  readonly mode = input<'all-cards' | 'instances'>('all-cards');
  readonly cardClick = output<{ card: Card; userCard: UserCard | null }>();
  readonly wishlistClick = output<{ card: Card; userCard: UserCard | null }>();
  readonly removeClick = output<{ card: Card; userCard: UserCard }>();
  readonly addToPortfolioClick = output<{ card: Card; userCard: UserCard }>();
  readonly wishlistedCardIds = input<Set<string>>(new Set());
  readonly portfolioCardIds = input<Set<string>>(new Set());

  readonly cardInstances = computed(() => {
    if (this.mode() === 'all-cards') {
      // In all-cards mode, just map cards to instances with no userCard
      return this.cards().map(card => ({ card, userCard: null as UserCard | null }));
    }
    
    // In instances mode, map userCards to card instances
    const instances: Array<{ card: Card; userCard: UserCard | null }> = [];
    
    for (const userCard of this.userCards()) {
      const card = CARD_MAP.get(userCard.cardId);
      if (card) {
        instances.push({ card, userCard });
      }
    }
    
    return instances;
  });

  getCustomLabel(userCard: UserCard | null): string | undefined {
    if (!userCard) return undefined;
    return userCard.userData.customLabel;
  }

  getDisplayName(userCard: UserCard | null, cardName: string): string {
    if (!userCard) return cardName;
    return getCardDisplayName(userCard, cardName, this.contextCards());
  }

  getDisplayNumber(userCard: UserCard | null): number | undefined {
    if (!userCard) return undefined;
    return getDisplayInstanceNumber(userCard, this.contextCards());
  }

  getOriginalCardName(userCard: UserCard | null, cardName: string): string | undefined {
    if (!userCard) return undefined;
    return getOriginalCardName(userCard, cardName);
  }
}
