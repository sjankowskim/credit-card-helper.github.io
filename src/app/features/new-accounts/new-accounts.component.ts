import { Component, computed, inject, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { UserCardsService } from '../../core/services/user-cards.service';
import { CardDetailComponent } from '../wallet/components/card-detail/card-detail.component';
import { CARD_MAP } from '../../core/data/cards';
import { FEATURED_ISSUERS, VELOCITY_RULES, type VelocityRule } from '../../core/data/issuer-rules';
import { CardStatus, type Card, type CardIssuer, type UserCard } from '../../core/models/card.model';
import { getCardDisplayName, getDisplayInstanceNumber } from '../../core/utils/card-display.utils';
import { formatDate, isWithin, toIsoDate, today } from '../../core/utils/date.utils';
import { getApplications, getRuleStatus, type Application, type WindowStatus } from '../../core/utils/applications.utils';

interface IssuerRules {
  issuer: CardIssuer;
  rules: { rule: VelocityRule; status: WindowStatus }[];
}

const RECENT_WINDOWS: { label: string; amount: number; unit: 'days' | 'months' }[] = [
  { label: 'Last 30 days', amount: 30, unit: 'days' },
  { label: 'Last 90 days', amount: 90, unit: 'days' },
  { label: 'Last 12 months', amount: 12, unit: 'months' },
  { label: 'Last 24 months', amount: 24, unit: 'months' }
];

@Component({
  selector: 'app-new-accounts',
  imports: [NgTemplateOutlet, CardDetailComponent],
  templateUrl: './new-accounts.component.html',
  styleUrl: './new-accounts.component.scss'
})
export class NewAccountsComponent {
  private readonly userCardsService = inject(UserCardsService);

  readonly CardStatus = CardStatus;

  /** Card open in the detail popup, where open dates and AU status are edited */
  readonly selected = signal<{ card: Card; userCard: UserCard } | null>(null);

  private readonly ownedCards = computed(() => this.userCardsService.cards().filter(c => !c.isWishlist));

  readonly applications = computed(() => getApplications(this.userCardsService.cards()));

  /** Accounts from the timeline opened in each recent window */
  readonly recentCounts = computed(() => {
    const apps = this.applications();
    return RECENT_WINDOWS.map(window => ({
      label: window.label,
      ...splitAuthorizedUsers(apps.filter(app => app.date <= today() && isWithin(app.date, window.amount, window.unit)))
    }));
  });

  private readonly rulesByIssuer = computed<IssuerRules[]>(() => {
    const groups = new Map<CardIssuer, IssuerRules>();
    for (const rule of VELOCITY_RULES) {
      const group = groups.get(rule.issuer) ?? { issuer: rule.issuer, rules: [] };
      group.rules.push({ rule, status: getRuleStatus(rule, this.applications()) });
      groups.set(rule.issuer, group);
    }
    return [...groups.values()];
  });

  readonly featuredRules = computed(() => this.rulesByIssuer().filter(g => FEATURED_ISSUERS.includes(g.issuer)));
  readonly moreRules = computed(() => this.rulesByIssuer().filter(g => !FEATURED_ISSUERS.includes(g.issuer)));
  readonly moreIssuerNames = computed(() => this.moreRules().map(g => g.issuer).join(', '));

  /** Owned cards that can't be counted until they have an open date */
  readonly missingDates = computed(() =>
    this.ownedCards().filter(c => !c.userData.accountStartDate && !c.userData.productChangedFromId)
  );

  formatDay(date: Date | null): string {
    return date ? formatDate(toIsoDate(date)) : '';
  }

  getName(userCard: UserCard): string {
    const card = CARD_MAP.get(userCard.cardId);
    const name = getCardDisplayName(userCard, card?.name ?? userCard.cardId);
    const number = getDisplayInstanceNumber(userCard, this.ownedCards());
    return number ? `${name} #${number}` : name;
  }

  /** '3 mo', '1 yr 2 mo' */
  getAge(app: Application): string {
    const now = today();
    let months = (now.getFullYear() - app.date.getFullYear()) * 12 + now.getMonth() - app.date.getMonth();
    if (now.getDate() < app.date.getDate()) months--;
    if (months < 1) return '< 1 mo';
    const years = Math.floor(months / 12);
    const rest = months % 12;
    return [years ? `${years} yr` : '', rest ? `${rest} mo` : ''].filter(Boolean).join(' ');
  }

  describeCount(status: WindowStatus, rule: VelocityRule): string {
    const { authorizedUser } = splitAuthorizedUsers(status.counted);
    const au = authorizedUser > 0 ? ` (${authorizedUser} AU)` : '';
    return `${status.counted.length} of ${rule.max} in the last ${rule.window.amount} ${rule.window.unit}${au}`;
  }

  countsAuthorizedUsers(rule: VelocityRule): boolean {
    return rule.scope === 'all-personal';
  }

  open(userCard: UserCard): void {
    const card = CARD_MAP.get(userCard.cardId);
    if (card) this.selected.set({ card, userCard });
  }
}

/** Total accounts, split into the user's own cards and authorized-user cards */
function splitAuthorizedUsers(apps: Application[]): { count: number; own: number; authorizedUser: number } {
  const authorizedUser = apps.filter(app => app.userCard.userData.isAuthorizedUser).length;
  return { count: apps.length, own: apps.length - authorizedUser, authorizedUser };
}
