import { Component, computed, inject } from '@angular/core';
import { ContributionsService } from '../../../../core/services/contributions.service';
import { formatCurrency } from '../../../../core/utils/card-display.utils';
import { today } from '../../../../core/utils/date.utils';

/** This year's contributions against each account's limit */
@Component({
  selector: 'app-contributions-widget',
  templateUrl: './contributions-widget.component.html',
  styleUrl: '../widget.scss'
})
export class ContributionsWidgetComponent {
  private readonly contributionsService = inject(ContributionsService);

  readonly formatCurrency = formatCurrency;
  readonly year = today().getFullYear();

  readonly progress = computed(() =>
    this.contributionsService
      .trackers()
      .filter(t => t.year === this.year)
      .map(t => this.contributionsService.getProgress(t))
  );
}
