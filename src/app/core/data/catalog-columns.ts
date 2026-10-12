import type { TableColumn } from '../models/table-column.model';
import type { CatalogSort } from '../models/app-state.model';

interface CatalogColumnDefinition extends TableColumn {
  /** Clicking the header sorts by this; the fee column flips between low-to-high and high-to-low */
  sort?: 'name' | 'issuer' | 'fee' | 'best-rate';
}

/**
 * Every Cards table column, in the order the table shows them. Column ids come from this list.
 * The card column has no width, so it takes the space the others leave.
 */
export const CATALOG_COLUMNS = [
  { id: 'card', label: 'Card', sort: 'name' },
  { id: 'issuer', label: 'Issuer', width: '9rem', sort: 'issuer' },
  { id: 'type', label: 'Type', width: '7rem' },
  { id: 'annualFee', label: 'Annual fee', width: '8rem', align: 'right', sort: 'fee' },
  { id: 'baseRate', label: 'Base', width: '5.5rem', align: 'right' },
  { id: 'bestRate', label: 'Best rate', width: '7.5rem', align: 'right', sort: 'best-rate' },
  { id: 'rewards', label: 'Rewards', width: '11rem' },
  { id: 'network', label: 'Network', width: '7.5rem' },
  { id: 'networkTier', label: 'Network tier', width: '11rem' },
  { id: 'creditNeeded', label: 'Credit needed', width: '8.5rem' },
  { id: 'foreignFee', label: 'Foreign fee', width: '7rem' },
  { id: 'currentOffer', label: 'Current offer', width: '14rem' }
] as const satisfies readonly CatalogColumnDefinition[];

export type CatalogColumnId = (typeof CATALOG_COLUMNS)[number]['id'];

export interface CatalogColumn extends CatalogColumnDefinition {
  id: CatalogColumnId;
}

/** Columns the table always keeps; the card name is how a row is recognized and opened */
export const REQUIRED_CATALOG_COLUMNS: ReadonlySet<CatalogColumnId> = new Set<CatalogColumnId>(['card']);

export const DEFAULT_CATALOG_COLUMNS: readonly CatalogColumnId[] = [
  'card',
  'issuer',
  'annualFee',
  'baseRate',
  'bestRate',
  'rewards',
  'network',
  'currentOffer'
];

/** Columns the table shows, in list order */
export function getVisibleCatalogColumns(saved: readonly CatalogColumnId[] | undefined): CatalogColumn[] {
  const ids = new Set<CatalogColumnId>([...(saved ?? DEFAULT_CATALOG_COLUMNS), ...REQUIRED_CATALOG_COLUMNS]);
  return (CATALOG_COLUMNS as readonly CatalogColumn[]).filter(c => ids.has(c.id));
}

/** Arrow for a sortable header: ↑ for the active ascending sort, ↓ for descending, '' otherwise */
export function sortIndicator(column: CatalogColumn, sort: CatalogSort): string {
  switch (column.sort) {
    case 'fee':
      return sort === 'fee-asc' ? '↑' : sort === 'fee-desc' ? '↓' : '';
    case 'best-rate':
      return sort === 'best-rate' ? '↓' : '';
    case undefined:
      return '';
    default:
      return sort === column.sort ? '↑' : '';
  }
}
