import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  readonly navItems = [
    { path: '/cards', label: 'Cards' },
    { path: '/wallet', label: 'Wallet' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/sub-tracker', label: 'SUB Tracker' },
    { path: '/account-tracker', label: 'Account Tracker' },
    { path: '/settings', label: 'Settings' }
  ];
}
