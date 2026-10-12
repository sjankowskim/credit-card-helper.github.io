import { Component, computed, inject } from '@angular/core';
import { UserCardsService } from '../../../../core/services/user-cards.service';
import { FEATURED_ISSUERS, VELOCITY_RULES } from '../../../../core/data/issuer-rules';
import { getApplications, getRuleStatus } from '../../../../core/utils/applications.utils';
import { formatDate, toIsoDate } from '../../../../core/utils/date.utils';

const SHOWN = 5;

/** The application rules you're closest to hitting, blocked ones first */
@Component({
  selector: 'app-application-rules-widget',
  templateUrl: './application-rules-widget.component.html',
  styleUrl: '../widget.scss'
})
export class ApplicationRulesWidgetComponent {
  private readonly userCardsService = inject(UserCardsService);

  readonly rules = computed(() => {
    const applications = getApplications(this.userCardsService.cards());
    return VELOCITY_RULES.filter(rule => FEATURED_ISSUERS.includes(rule.issuer))
      .map(rule => ({ rule, status: getRuleStatus(rule, applications) }))
      .sort(
        (a, b) =>
          Number(a.status.canApply) - Number(b.status.canApply) ||
          b.status.counted.length / b.rule.max - a.status.counted.length / a.rule.max
      )
      .slice(0, SHOWN);
  });

  formatDay(date: Date | null): string {
    return date ? formatDate(toIsoDate(date)) : '';
  }
}
