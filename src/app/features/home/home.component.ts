import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StorageService } from '../../core/services/storage.service';
import { UserCardsService } from '../../core/services/user-cards.service';
import { DEFAULT_HOME_WIDGETS, HOME_WIDGETS, HOME_WIDGET_MAP, type HomeWidget, type HomeWidgetId } from '../../core/data/home-widgets';
import { createDefaultHomeSettings } from '../../core/models/app-state.model';
import { UpcomingWidgetComponent } from './widgets/upcoming/upcoming-widget.component';
import { WalletWidgetComponent } from './widgets/wallet/wallet-widget.component';
import { SignUpBonusesWidgetComponent } from './widgets/sign-up-bonuses/sign-up-bonuses-widget.component';
import { RewardsWidgetComponent } from './widgets/rewards/rewards-widget.component';
import { CreditsWidgetComponent } from './widgets/credits/credits-widget.component';
import { ApplicationRulesWidgetComponent } from './widgets/application-rules/application-rules-widget.component';
import { BestCardsWidgetComponent } from './widgets/best-cards/best-cards-widget.component';
import { SubscriptionsWidgetComponent } from './widgets/subscriptions/subscriptions-widget.component';
import { LoansWidgetComponent } from './widgets/loans/loans-widget.component';
import { ContributionsWidgetComponent } from './widgets/contributions/contributions-widget.component';

/** The landing page: widgets summarizing the other pages, which the user can add, remove, and reorder */
@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    UpcomingWidgetComponent,
    WalletWidgetComponent,
    SignUpBonusesWidgetComponent,
    RewardsWidgetComponent,
    CreditsWidgetComponent,
    ApplicationRulesWidgetComponent,
    BestCardsWidgetComponent,
    SubscriptionsWidgetComponent,
    LoansWidgetComponent,
    ContributionsWidgetComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private readonly storage = inject(StorageService);
  private readonly userCardsService = inject(UserCardsService);

  readonly editing = signal(false);
  readonly hasCards = computed(() => this.userCardsService.cards().length > 0);

  /** Widgets on the page, in order; ids from an older or newer app version are skipped */
  readonly widgets = computed<HomeWidget[]>(() =>
    (this.storage.state().homeSettings?.widgets ?? DEFAULT_HOME_WIDGETS).flatMap(id => {
      const widget = HOME_WIDGET_MAP.get(id);
      return widget ? [widget] : [];
    })
  );

  /** Widgets that can still be added */
  readonly available = computed(() => {
    const shown = new Set(this.widgets().map(w => w.id));
    return (HOME_WIDGETS as readonly HomeWidget[]).filter(w => !shown.has(w.id));
  });

  readonly isDefaultLayout = computed(() => {
    const ids = this.widgets().map(w => w.id);
    return ids.length === DEFAULT_HOME_WIDGETS.length && ids.every((id, i) => id === DEFAULT_HOME_WIDGETS[i]);
  });

  private save(ids: HomeWidgetId[]): void {
    this.storage.update('homeSettings', settings => ({ ...settings, widgets: ids }));
  }

  add(id: HomeWidgetId): void {
    this.save([...this.widgets().map(w => w.id), id]);
  }

  remove(id: HomeWidgetId): void {
    this.save(this.widgets().map(w => w.id).filter(w => w !== id));
  }

  /** Swaps a widget with its neighbor */
  move(index: number, step: -1 | 1): void {
    const ids = this.widgets().map(w => w.id);
    const target = index + step;
    if (target < 0 || target >= ids.length) return;
    [ids[index], ids[target]] = [ids[target], ids[index]];
    this.save(ids);
  }

  reset(): void {
    this.storage.update('homeSettings', () => createDefaultHomeSettings());
  }
}
