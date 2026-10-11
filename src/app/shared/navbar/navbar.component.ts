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
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/sub-tracker', label: 'SUB Tracker' },
    { path: '/account-tracker', label: 'Account Tracker' }
  ];
}
