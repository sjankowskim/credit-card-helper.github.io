import type { TableColumn } from '../models/table-column.model';

/** The wallet's tables: kept cards, churn cards, closed and product-changed cards, and the wishlist */
export type WalletTableKind = 'active' | 'churn' | 'history' | 'wishlist';

interface WalletColumnDefinition extends TableColumn {
  width: string;
  /** Tables that can show this column */
  kinds: readonly WalletTableKind[];
}

const OWNED = ['active', 'churn'] as const;
const ALL = ['active', 'churn', 'history', 'wishlist'] as const;

/** Every wallet table column, in the order tables show them. Column ids come from this list. */
export const WALLET_COLUMNS = [
  { id: 'card', label: 'Card', width: '16rem', kinds: ALL },
  { id: 'issuer', label: 'Issuer', width: '9rem', kinds: ALL },
  { id: 'status', label: 'Status', width: '10rem', kinds: ['history'] },
  { id: 'annualFee', label: 'Annual fee', width: '7.5rem', align: 'right', kinds: [...OWNED, 'wishlist'] },
  { id: 'nextAnnualFee', label: 'Next annual fee', width: '8.5rem', kinds: OWNED },
  { id: 'creditLimit', label: 'Credit limit', width: '8.5rem', align: 'right', kinds: OWNED },
  { id: 'opened', label: 'Opened', width: '8.5rem', kinds: [...OWNED, 'history'] },
  { id: 'accountAge', label: 'Account age', width: '7.5rem', kinds: [...OWNED, 'history'] },
  { id: 'lastCliRequest', label: 'Last CLI request', width: '8.5rem', kinds: OWNED },
  { id: 'paymentDue', label: 'Payment due', width: '7.5rem', kinds: OWNED },
  { id: 'plannedClose', label: 'Planned close', width: '8.5rem', kinds: OWNED },
  { id: 'signUpBonus', label: 'Sign-up bonus', width: '8.5rem', kinds: OWNED },
  { id: 'changedOn', label: 'Changed on', width: '8.5rem', kinds: ['history'] },
  { id: 'changedTo', label: 'Changed to', width: '12rem', kinds: ['history'] },
  { id: 'reason', label: 'Reason', width: '16rem', kinds: ['history'] },
  { id: 'currentOffer', label: 'Current offer', width: '16rem', kinds: ['wishlist'] },
  { id: 'rewards', label: 'Rewards', width: '11rem', kinds: ALL },
  { id: 'network', label: 'Network', width: '7.5rem', kinds: ALL }
] as const satisfies readonly WalletColumnDefinition[];

export type WalletColumnId = (typeof WALLET_COLUMNS)[number]['id'];

export interface WalletColumn extends WalletColumnDefinition {
  id: WalletColumnId;
}

/** Columns every table keeps; the card name is how a row is recognized and opened */
export const REQUIRED_COLUMNS: ReadonlySet<WalletColumnId> = new Set<WalletColumnId>(['card']);

export const DEFAULT_WALLET_COLUMNS: Record<WalletTableKind, readonly WalletColumnId[]> = {
  active: ['card', 'issuer', 'annualFee', 'creditLimit', 'opened', 'lastCliRequest', 'paymentDue', 'signUpBonus'],
  churn: ['card', 'issuer', 'annualFee', 'creditLimit', 'opened', 'lastCliRequest', 'paymentDue', 'plannedClose', 'signUpBonus'],
  history: ['card', 'issuer', 'status', 'opened', 'changedOn', 'changedTo', 'reason'],
  wishlist: ['card', 'issuer', 'annualFee', 'currentOffer']
};

export const WALLET_TABLE_TITLES: Record<WalletTableKind, string> = {
  active: 'Active',
  churn: 'Churning',
  history: 'Closed & product changed',
  wishlist: 'Wishlist'
};

/** Columns a table can show */
export function getAvailableColumns(kind: WalletTableKind): WalletColumn[] {
  return (WALLET_COLUMNS as readonly WalletColumn[]).filter(c => c.kinds.includes(kind));
}

/** Columns a table shows, in list order; saved ids that don't apply to the table are skipped */
export function getVisibleColumns(kind: WalletTableKind, saved: readonly WalletColumnId[] | undefined): WalletColumn[] {
  const ids = new Set<WalletColumnId>([...(saved ?? DEFAULT_WALLET_COLUMNS[kind]), ...REQUIRED_COLUMNS]);
  return getAvailableColumns(kind).filter(c => ids.has(c.id));
}
