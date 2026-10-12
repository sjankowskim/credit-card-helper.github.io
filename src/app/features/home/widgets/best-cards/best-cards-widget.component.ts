import { Component, computed, inject } from '@angular/core';
import { UserCardsService } from '../../../../core/services/user-cards.service';
import { CardRankingService } from '../../../../core/services/card-ranking.service';
import { RewardsService } from '../../../../core/services/rewards.service';
import { StorageService } from '../../../../core/services/storage.service';
import { CardStatus, type UserCard } from '../../../../core/models/card.model';
import { FALLTHROUGH_CATEGORY } from '../../../../core/utils/reward-rate.utils';
import { formatRate } from '../../../../core/utils/card-display.utils';

/** Everyday categories shown on Home; the Best Card page ranks all of them */
const CATEGORIES = ['dining', 'grocery-stores', 'gas-stations', 'travel', 'online-retail', FALLTHROUGH_CATEGORY];

/** Your top active card for a few everyday categories */
@Component({
  selector: 'app-best-cards-widget',
  templateUrl: './best-cards-widget.component.html',
  styleUrl: '../widget.scss'
})
export class BestCardsWidgetComponent {
  private readonly userCardsService = inject(UserCardsService);
  private readonly cardRankingService = inject(CardRankingService);
  private readonly rewardsService = inject(RewardsService);
  private readonly storage = inject(StorageService);

  readonly formatRate = formatRate;

  readonly rows = computed(() => {
    const active = this.userCardsService.cards().filter(c => c.userData.status === CardStatus.ACTIVE);
    if (active.length === 0) return [];
    // Follows the Best Card page's travel redemption setting
    const applyCpp = this.storage.state().dashboardSettings.travelRedemption;
    return CATEGORIES.map(categoryId => ({
      label: this.cardRankingService.getCategoryLabel(categoryId),
      best: this.cardRankingService.rankCategory(categoryId, active, { applyCpp, includeDuplicates: false, limit: 1 })[0]
    }));
  });

  cardName(userCard: UserCard): string {
    return this.rewardsService.getName(userCard);
  }
}
