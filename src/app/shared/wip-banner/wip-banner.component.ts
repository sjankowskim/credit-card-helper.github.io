import { Component } from '@angular/core';

export const ISSUES_URL = 'https://github.com/sjankowskim/credit-card-helper.github.io/issues';

/** Notice that the app is a work in progress, with a link to report problems */
@Component({
  selector: 'app-wip-banner',
  templateUrl: './wip-banner.component.html',
  styleUrl: './wip-banner.component.scss'
})
export class WipBannerComponent {
  readonly issuesUrl = ISSUES_URL;
}
