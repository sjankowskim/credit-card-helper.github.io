import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';

interface NavLink {
  path: string;
  label: string;
}

/** A top-level entry: a single link, or a menu of links */
type NavEntry = ({ kind: 'link' } & NavLink) | { kind: 'menu'; id: string; label: string; items: NavLink[] };

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private readonly router = inject(Router);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly entries: NavEntry[] = [
    {
      kind: 'menu',
      id: 'cards',
      label: 'Cards',
      items: [
        { path: '/cards', label: 'Cards' },
        { path: '/wallet', label: 'Wallet' },
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/new-accounts', label: 'New Accounts' }
      ]
    },
    {
      kind: 'menu',
      id: 'rewards',
      label: 'Rewards',
      items: [
        { path: '/sub-tracker', label: 'SUB Tracker' },
        { path: '/rewards', label: 'Rewards' },
        { path: '/benefits', label: 'Benefits & Bonuses' }
      ]
    },
    {
      kind: 'menu',
      id: 'money',
      label: 'Money',
      items: [
        { path: '/contributions', label: 'Contributions' },
        { path: '/loans', label: 'Loans' },
        { path: '/subscriptions', label: 'Subscriptions' }
      ]
    },
    { kind: 'link', path: '/settings', label: 'Settings' }
  ];

  /** Id of the open menu, if any */
  readonly openMenu = signal<string | null>(null);

  private readonly url = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(e => e.urlAfterRedirects)
    ),
    { initialValue: this.router.url }
  );

  constructor() {
    // Close any open menu after navigating
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe(() => this.openMenu.set(null));
  }

  /** True when the current page is one of the menu's links */
  isMenuActive(items: NavLink[]): boolean {
    const path = this.url().split(/[?#]/)[0];
    return items.some(item => path === item.path || path.startsWith(item.path + '/'));
  }

  toggle(id: string): void {
    this.openMenu.update(open => (open === id ? null : id));
  }

  /** Opens a menu from the keyboard and focuses its first link */
  openWithKeyboard(id: string, event: Event): void {
    event.preventDefault();
    this.openMenu.set(id);
    setTimeout(() => this.host.nativeElement.querySelector<HTMLElement>(`#menu-${id} a`)?.focus());
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.host.nativeElement.contains(event.target as Node)) this.openMenu.set(null);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    const open = this.openMenu();
    if (!open) return;
    this.openMenu.set(null);
    this.host.nativeElement.querySelector<HTMLElement>(`#menu-button-${open}`)?.focus();
  }
}
