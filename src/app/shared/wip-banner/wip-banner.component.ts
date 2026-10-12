import { Component, signal } from '@angular/core';

/** localStorage key; per device like the theme, so it isn't part of a backup */
const DISMISSED_KEY = 'credit-card-helper.wip-banner-dismissed';

export const ISSUES_URL = 'https://github.com/sjankowskim/credit-card-helper.github.io/issues';

/** Notice that the app is a work in progress, with a link to report problems; can be dismissed */
@Component({
  selector: 'app-wip-banner',
  templateUrl: './wip-banner.component.html',
  styleUrl: './wip-banner.component.scss'
})
export class WipBannerComponent {
  readonly issuesUrl = ISSUES_URL;
  readonly visible = signal(!readDismissed());

  dismiss(): void {
    this.visible.set(false);
    try {
      localStorage.setItem(DISMISSED_KEY, 'true');
    } catch {
      // Private browsing can block storage; the banner just comes back next visit
    }
  }
}

function readDismissed(): boolean {
  try {
    return localStorage.getItem(DISMISSED_KEY) === 'true';
  } catch {
    return false;
  }
}
