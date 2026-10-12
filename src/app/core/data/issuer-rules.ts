import type { CardIssuer } from '../models/card.model';

/**
 * Issuer application rules: you can be approved while you have fewer than `max`
 * new accounts (counted per `scope`) within the rolling `window`. Issuers don't publish most of these; they're
 * community data points (Doctor of Credit, r/churning) and can change.
 */
export interface VelocityRule {
  id: string;
  issuer: CardIssuer;
  /** Short name used by the community, e.g. '2/30' */
  name: string;
  description: string;
  max: number;
  window: { amount: number; unit: 'days' | 'months' };
  /**
   * Which accounts count: 'issuer' (default) counts only this issuer's cards;
   * 'all-personal' counts personal accounts from any issuer, including authorized-user cards
   */
  scope?: 'issuer' | 'all-personal';
}

/** Issuers whose rules are shown up front; the rest go under "More issuer rules" */
export const FEATURED_ISSUERS: readonly CardIssuer[] = [
  'Chase',
  'American Express',
  'Citi',
  'Capital One'
];

export const VELOCITY_RULES: readonly VelocityRule[] = [
  {
    id: 'chase-5-24',
    issuer: 'Chase',
    name: '5/24',
    description: 'Fewer than 5 new personal cards from any issuer in 24 months',
    max: 5,
    window: { amount: 24, unit: 'months' },
    scope: 'all-personal'
  },
  {
    id: 'chase-2-30',
    issuer: 'Chase',
    name: '2/30',
    description: 'At most 2 Chase cards in 30 days',
    max: 2,
    window: { amount: 30, unit: 'days' }
  },
  {
    id: 'amex-1-5',
    issuer: 'American Express',
    name: '1/5',
    description: 'At most 1 Amex credit card every 5 days',
    max: 1,
    window: { amount: 5, unit: 'days' }
  },
  {
    id: 'amex-2-90',
    issuer: 'American Express',
    name: '2/90',
    description: 'At most 2 Amex credit cards in 90 days',
    max: 2,
    window: { amount: 90, unit: 'days' }
  },
  {
    id: 'citi-1-8',
    issuer: 'Citi',
    name: '1/8',
    description: 'At most 1 Citi card every 8 days',
    max: 1,
    window: { amount: 8, unit: 'days' }
  },
  {
    id: 'citi-2-65',
    issuer: 'Citi',
    name: '2/65',
    description: 'At most 2 Citi cards in 65 days',
    max: 2,
    window: { amount: 65, unit: 'days' }
  },
  {
    id: 'capital-one-1-6',
    issuer: 'Capital One',
    name: '1/6mo',
    description: 'At most 1 Capital One card every 6 months',
    max: 1,
    window: { amount: 6, unit: 'months' }
  },
  {
    id: 'boa-2-2',
    issuer: 'Bank of America',
    name: '2/3/4 (2 mo)',
    description: 'At most 2 Bank of America cards in 2 months',
    max: 2,
    window: { amount: 2, unit: 'months' }
  },
  {
    id: 'boa-3-12',
    issuer: 'Bank of America',
    name: '2/3/4 (12 mo)',
    description: 'At most 3 Bank of America cards in 12 months',
    max: 3,
    window: { amount: 12, unit: 'months' }
  },
  {
    id: 'boa-4-24',
    issuer: 'Bank of America',
    name: '2/3/4 (24 mo)',
    description: 'At most 4 Bank of America cards in 24 months',
    max: 4,
    window: { amount: 24, unit: 'months' }
  },
  {
    id: 'navy-federal-1-90',
    issuer: 'Navy Federal',
    name: '1/90',
    description: 'At most 1 new Navy Federal card in 90 days (and at most 3 Navy Federal cards in total)',
    max: 1,
    window: { amount: 90, unit: 'days' }
  }
];
