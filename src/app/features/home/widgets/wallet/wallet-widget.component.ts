import { Component, computed, inject } from '@angular/core';
import { UserCardsService } from '../../../../core/services/user-cards.service';
import { CARD_MAP } from '../../../../core/data/cards';
import { CardStatus } from '../../../../core/models/card.model';
import { formatCurrency, getAnnualFee } from '../../../../core/utils/card-display.utils';

/** Active cards, fees, credit, and churn cards at a glance */
@Component({
  selector: 'app-wallet-widget',
  templateUrl: './wallet-widget.component.html',
  styleUrl: '../widget.scss'
})
export class WalletWidgetComponent {
  private readonly userCardsService = inject(UserCardsService);

  readonly formatCurrency = formatCurrency;

  readonly stats = computed(() => {
    const owned = this.userCardsService.cards().filter(c => !c.isWishlist);
    const active = owned.flatMap(userCard => {
      const card = CARD_MAP.get(userCard.cardId);
      return card && userCard.userData.status === CardStatus.ACTIVE ? [{ userCard, card }] : [];
    });
    return {
      active: active.length,
      fees: active.reduce((sum, i) => sum + getAnnualFee(i.userCard, i.card), 0),
      creditLimit: active.reduce((sum, i) => sum + (i.userCard.userData.activeData?.creditLimit ?? 0), 0),
      churning: active.filter(i => i.userCard.userData.isChurnCard).length,
      history: owned.length - active.length,
      wishlist: this.userCardsService.cards().filter(c => c.isWishlist).length
    };
  });
}
