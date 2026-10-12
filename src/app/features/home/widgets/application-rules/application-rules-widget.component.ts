import { Component, computed, inject, input, output } from '@angular/core';
import { UserCardsService } from '../../../../core/services/user-cards.service';
import { StorageService } from '../../../../core/services/storage.service';
import { FEATURED_ISSUERS, VELOCITY_RULES } from '../../../../core/data/issuer-rules';
import { getApplications, getRuleStatus } from '../../../../core/utils/applications.utils';
import { formatDate, toIsoDate } from '../../../../core/utils/date.utils';
import {
  ChecklistPickerComponent,
  isGroupDefault,
  resetGroup,
  type ChecklistGroup
} from '../../../../shared/checklist-picker/checklist-picker.component';

/** Rules shown until the user picks their own */
const DEFAULT_RULE_IDS = VELOCITY_RULES.filter(rule => FEATURED_ISSUERS.includes(rule.issuer)).map(rule => rule.id);

/** The application rules you choose, blocked ones first */
@Component({
  selector: 'app-application-rules-widget',
  imports: [ChecklistPickerComponent],
  templateUrl: './application-rules-widget.component.html',
  styleUrl: '../widget.scss'
})
export class ApplicationRulesWidgetComponent {
  private readonly userCardsService = inject(UserCardsService);
  private readonly storage = inject(StorageService);

  /** The Home page opens the rule picker from the widget's header */
  readonly optionsOpen = input(false);
  readonly optionsClosed = output<void>();

  readonly selected = computed(() => this.storage.state().homeSettings?.applicationRuleIds ?? DEFAULT_RULE_IDS);

  readonly rules = computed(() => {
    const applications = getApplications(this.userCardsService.cards());
    const selected = new Set(this.selected());
    return VELOCITY_RULES.filter(rule => selected.has(rule.id))
      .map(rule => ({ rule, status: getRuleStatus(rule, applications) }))
      .sort(
        (a, b) =>
          Number(a.status.canApply) - Number(b.status.canApply) ||
          b.status.counted.length / b.rule.max - a.status.counted.length / a.rule.max
      );
  });

  /** Rules by issuer, in the order the rule list has them */
  readonly pickerGroups = computed<ChecklistGroup[]>(() => {
    const checked = this.selected();
    const issuers = [...new Set(VELOCITY_RULES.map(rule => rule.issuer))];
    return issuers.map(issuer => {
      const items = VELOCITY_RULES.filter(rule => rule.issuer === issuer).map(rule => ({
        id: rule.id,
        label: `${rule.name}: ${rule.description}`
      }));
      const ids = items.map(i => i.id);
      return { key: issuer, title: issuer, items, checked, isDefault: isGroupDefault(checked, ids, DEFAULT_RULE_IDS) };
    });
  });

  toggle(id: string, checked: boolean): void {
    const current = this.selected();
    this.save(checked ? [...current, id] : current.filter(r => r !== id));
  }

  reset(issuer: string): void {
    const ids = VELOCITY_RULES.filter(rule => rule.issuer === issuer).map(rule => rule.id);
    this.save(resetGroup(this.selected(), ids, DEFAULT_RULE_IDS));
  }

  private save(ids: string[]): void {
    this.storage.update('homeSettings', settings => ({ ...settings, applicationRuleIds: ids }));
  }

  formatDay(date: Date | null): string {
    return date ? formatDate(toIsoDate(date)) : '';
  }
}
