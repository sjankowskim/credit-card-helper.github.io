import { Component, computed, inject, input, output } from '@angular/core';
import { UserCardsService } from '../../../../core/services/user-cards.service';
import { CardRankingService } from '../../../../core/services/card-ranking.service';
import { RewardsService } from '../../../../core/services/rewards.service';
import { StorageService } from '../../../../core/services/storage.service';
import { CardStatus, type UserCard } from '../../../../core/models/card.model';
import { ALL_CATEGORIES, CATEGORY_GROUP_LABELS } from '../../../../core/data/category.registry';
import { FALLTHROUGH_CATEGORY } from '../../../../core/utils/reward-rate.utils';
import { formatRate } from '../../../../core/utils/card-display.utils';
import {
  ChecklistPickerComponent,
  isGroupDefault,
  resetGroup,
  type ChecklistGroup
} from '../../../../shared/checklist-picker/checklist-picker.component';

/** Categories shown until the user picks their own; the Best Card page ranks all of them */
const DEFAULT_CATEGORIES = ['dining', 'grocery-stores', 'gas-stations', 'travel', 'online-retail', FALLTHROUGH_CATEGORY];

/** Every category in display order, with "Everything else" last */
const CATEGORY_ORDER = [...ALL_CATEGORIES.map(c => c.id), FALLTHROUGH_CATEGORY];

/** Your top active card for the categories you choose */
@Component({
  selector: 'app-best-cards-widget',
  imports: [ChecklistPickerComponent],
  templateUrl: './best-cards-widget.component.html',
  styleUrl: '../widget.scss'
})
export class BestCardsWidgetComponent {
  private readonly userCardsService = inject(UserCardsService);
  private readonly cardRankingService = inject(CardRankingService);
  private readonly rewardsService = inject(RewardsService);
  private readonly storage = inject(StorageService);

  /** The Home page opens the category picker from the widget's header */
  readonly optionsOpen = input(false);
  readonly optionsClosed = output<void>();

  readonly formatRate = formatRate;

  readonly selected = computed(() => this.storage.state().homeSettings?.bestCardCategories ?? DEFAULT_CATEGORIES);

  readonly rows = computed(() => {
    const active = this.userCardsService.cards().filter(c => c.userData.status === CardStatus.ACTIVE);
    if (active.length === 0) return [];
    const selected = new Set(this.selected());
    // Follows the Best Card page's travel redemption setting
    const applyCpp = this.storage.state().dashboardSettings.travelRedemption;
    return CATEGORY_ORDER.filter(id => selected.has(id)).map(categoryId => ({
      label: this.cardRankingService.getCategoryLabel(categoryId),
      best: this.cardRankingService.rankCategory(categoryId, active, { applyCpp, includeDuplicates: false, limit: 1 })[0]
    }));
  });

  /** Categories by group, with "Everything else" under Everyday */
  readonly pickerGroups = computed<ChecklistGroup[]>(() => {
    const checked = this.selected();
    return Object.entries(CATEGORY_GROUP_LABELS).map(([group, title]) => {
      const items = ALL_CATEGORIES.filter(c => c.group === group).map(c => ({ id: c.id, label: c.name }));
      if (group === 'everyday') items.push({ id: FALLTHROUGH_CATEGORY, label: 'Everything else' });
      const ids = items.map(i => i.id);
      return { key: group, title, items, checked, isDefault: isGroupDefault(checked, ids, DEFAULT_CATEGORIES) };
    });
  });

  toggle(id: string, checked: boolean): void {
    const current = this.selected();
    this.save(checked ? [...current, id] : current.filter(c => c !== id));
  }

  reset(group: string): void {
    const ids = this.pickerGroups().find(g => g.key === group)?.items.map(i => i.id) ?? [];
    this.save(resetGroup(this.selected(), ids, DEFAULT_CATEGORIES));
  }

  private save(categories: string[]): void {
    this.storage.update('homeSettings', settings => ({ ...settings, bestCardCategories: categories }));
  }

  cardName(userCard: UserCard): string {
    return this.rewardsService.getName(userCard);
  }
}
