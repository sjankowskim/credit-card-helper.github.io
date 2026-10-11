import { Component, input, computed, inject } from '@angular/core';
import { CardRankingService, type CardRanking } from '../../../../core/services/card-ranking.service';
import { getCategory } from '../../../../core/data/category.registry';
import type { UserCard } from '../../../../core/models/card.model';
import {
  formatRate,
  formatSpendingCap,
  getCardDisplayName,
  getDisplayInstanceNumber
} from '../../../../core/utils/card-display.utils';

@Component({
  selector: 'app-category-rankings-table',
  templateUrl: './category-rankings-table.component.html',
  styleUrl: './category-rankings-table.component.scss'
})
export class CategoryRankingsTableComponent {
  private readonly cardRankingService = inject(CardRankingService);

  readonly rankings = input.required<Map<string, CardRanking[]>>();
  /** Cards used to number duplicate instances (#1, #2) */
  readonly contextCards = input<UserCard[]>([]);

  readonly entries = computed(() =>
    Array.from(this.rankings().entries()).map(([categoryId, rankings]) => ({
      categoryId,
      label: this.cardRankingService.getCategoryLabel(categoryId),
      note: getCategory(categoryId)?.note ?? '',
      rankings
    }))
  );

  /** Column indexes, sized to the longest ranking list */
  readonly columns = computed(() => {
    const count = Math.max(0, ...this.entries().map(e => e.rankings.length));
    return Array.from({ length: count }, (_, i) => i);
  });

  readonly formatRate = formatRate;
  readonly formatSpendingCap = formatSpendingCap;

  getDisplayName(ranking: CardRanking): string {
    const name = getCardDisplayName(ranking.userCard, ranking.card.name);
    const number = getDisplayInstanceNumber(ranking.userCard, this.contextCards());
    return number ? `${name} #${number}` : name;
  }
}
