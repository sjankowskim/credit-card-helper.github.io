import { Routes } from '@angular/router';
import { WalletComponent } from './features/wallet/wallet.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { SubTrackerComponent } from './features/sub-tracker/sub-tracker.component';
import { AccountTrackerComponent } from './features/account-tracker/account-tracker.component';
import { CardsComponent } from './features/cards/cards.component';
import { SettingsComponent } from './features/settings/settings.component';

export const routes: Routes = [
  { path: 'wallet', component: WalletComponent },
  { path: 'portfolio', redirectTo: '/wallet' },
  { path: 'cards', component: CardsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'sub-tracker', component: SubTrackerComponent },
  { path: 'account-tracker', component: AccountTrackerComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '', redirectTo: '/cards', pathMatch: 'full' },
  { path: '**', redirectTo: '/cards' }
];
