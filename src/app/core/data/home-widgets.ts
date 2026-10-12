/** A widget the Home page can show; the page it summarizes is linked from its header */
interface HomeWidgetDefinition {
  id: string;
  title: string;
  /** Shown when picking widgets to add */
  description: string;
  link: { path: string; label: string };
  /** Set for widgets whose contents the user picks; labels the button that opens the picker */
  optionsLabel?: string;
}

/** Every Home widget, in the order the "Add a widget" list shows them. Widget ids come from this list. */
export const HOME_WIDGETS = [
  {
    id: 'upcoming',
    title: 'Coming up',
    description: 'Bonus deadlines, annual fees, planned closes, payments, credits, and charges in the next few weeks',
    link: { path: '/wallet', label: 'Wallet' }
  },
  {
    id: 'wallet',
    title: 'Wallet',
    description: 'Active cards, annual fees, total credit, and churn cards',
    link: { path: '/wallet', label: 'Wallet' }
  },
  {
    id: 'sign-up-bonuses',
    title: 'Sign-up bonuses',
    description: 'Card and bank bonuses in progress, with spend left and days remaining',
    link: { path: '/sub-tracker', label: 'SUB Tracker' }
  },
  {
    id: 'rewards',
    title: 'Rewards',
    description: 'What your points and cash back are worth, by program',
    link: { path: '/rewards', label: 'Rewards' }
  },
  {
    id: 'credits',
    title: 'Credits',
    description: 'Statement credits left to use this period, soonest to reset first',
    link: { path: '/benefits', label: 'Benefits' }
  },
  {
    id: 'application-rules',
    title: 'Application rules',
    description: 'Chase 5/24 and the issuer rules you choose, blocked ones first',
    link: { path: '/new-accounts', label: 'New Accounts' },
    optionsLabel: 'Choose rules'
  },
  {
    id: 'best-cards',
    title: 'Best card by category',
    description: 'Your top card for the categories you choose, like dining, groceries, and gas',
    link: { path: '/best-card', label: 'All categories' },
    optionsLabel: 'Choose categories'
  },
  {
    id: 'subscriptions',
    title: 'Subscriptions',
    description: 'Monthly and yearly cost, and the next charges',
    link: { path: '/subscriptions', label: 'Subscriptions' }
  },
  {
    id: 'loans',
    title: 'Loans',
    description: 'Balance owed, monthly payments, and average APR',
    link: { path: '/loans', label: 'Loans' }
  },
  {
    id: 'contributions',
    title: 'Contributions',
    description: 'This year’s contributions to 401(k), IRA, HSA, and other accounts against their limits',
    link: { path: '/contributions', label: 'Contributions' }
  }
] as const satisfies readonly HomeWidgetDefinition[];

export type HomeWidgetId = (typeof HOME_WIDGETS)[number]['id'];

export type HomeWidget = HomeWidgetDefinition & { id: HomeWidgetId };

export const HOME_WIDGET_MAP: ReadonlyMap<HomeWidgetId, HomeWidget> = new Map(
  (HOME_WIDGETS as readonly HomeWidget[]).map(w => [w.id, w])
);

export const DEFAULT_HOME_WIDGETS: readonly HomeWidgetId[] = ['upcoming', 'wallet', 'sign-up-bonuses', 'rewards', 'credits'];
