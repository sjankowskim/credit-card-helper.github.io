import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
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

/** Each page's `title` becomes the browser tab text (see AppTitleStrategy); Home shows just the app name */
export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'wallet', component: WalletComponent, title: 'Wallet' },
  { path: 'portfolio', redirectTo: '/wallet' },
  { path: 'cards', component: CardsComponent, title: 'Cards' },
  { path: 'best-card', component: DashboardComponent, title: 'Best Card by Category' },
  { path: 'dashboard', redirectTo: '/best-card' },
  { path: 'sub-tracker', component: SubTrackerComponent, title: 'SUB Tracker' },
  { path: 'rewards', component: RewardsComponent, title: 'Rewards' },
  { path: 'benefits', component: BenefitsComponent, title: 'Benefits & Bonuses' },
  { path: 'new-accounts', component: NewAccountsComponent, title: 'New Accounts' },
  { path: 'account-tracker', redirectTo: '/new-accounts' },
  { path: 'contributions', component: ContributionsComponent, title: 'Contributions' },
  { path: 'loans', component: LoansComponent, title: 'Loans' },
  { path: 'subscriptions', component: SubscriptionsComponent, title: 'Subscriptions' },
  { path: 'settings', component: SettingsComponent, title: 'Settings' },
  { path: '**', redirectTo: '' }
];
