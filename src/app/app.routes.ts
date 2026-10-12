import { Routes } from '@angular/router';
import { WalletComponent } from './features/wallet/wallet.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { SubTrackerComponent } from './features/sub-tracker/sub-tracker.component';
import { NewAccountsComponent } from './features/new-accounts/new-accounts.component';
import { CardsComponent } from './features/cards/cards.component';
import { SettingsComponent } from './features/settings/settings.component';
import { RewardsComponent } from './features/rewards/rewards.component';
import { BenefitsComponent } from './features/benefits/benefits.component';
import { ContributionsComponent } from './features/contributions/contributions.component';
import { LoansComponent } from './features/loans/loans.component';
import { SubscriptionsComponent } from './features/subscriptions/subscriptions.component';

export const routes: Routes = [
  { path: 'wallet', component: WalletComponent },
  { path: 'portfolio', redirectTo: '/wallet' },
  { path: 'cards', component: CardsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'sub-tracker', component: SubTrackerComponent },
  { path: 'rewards', component: RewardsComponent },
  { path: 'benefits', component: BenefitsComponent },
  { path: 'new-accounts', component: NewAccountsComponent },
  { path: 'account-tracker', redirectTo: '/new-accounts' },
  { path: 'contributions', component: ContributionsComponent },
  { path: 'loans', component: LoansComponent },
  { path: 'subscriptions', component: SubscriptionsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '', redirectTo: '/cards', pathMatch: 'full' },
  { path: '**', redirectTo: '/cards' }
];
