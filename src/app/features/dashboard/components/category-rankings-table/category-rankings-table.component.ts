import { Component, input, computed } from '@angular/core';
import type { CardRanking } from '../../../../core/services/card-ranking.service';
import { CATEGORY_REGISTRY } from '../../../../core/data/category.registry';

interface CategoryRankingsEntry {
  categoryId: string;
  rankings: CardRanking[];
}

@Component({
  selector: 'app-category-rankings-table',
  templateUrl: './category-rankings-table.component.html',
  styleUrl: './category-rankings-table.component.scss'
})
export class CategoryRankingsTableComponent {
  readonly rankings = input<Map<string, CardRanking[]>>();
  readonly numColumns = input<number>(1);

  readonly entries = computed(() => {
    const map = this.rankings();
    if (!map) return [];
    return Array.from(map.entries()).map(([categoryId, rankings]) => ({
      categoryId,
      rankings
    }));
  });

  getCategoryName(categoryId: string): string {
    if (categoryId === 'fallthrough') {
      return 'Base Rate (Fallthrough)';
    }
    return CATEGORY_REGISTRY[categoryId]?.name || categoryId;
  }
}
