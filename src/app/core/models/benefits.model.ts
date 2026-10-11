import type { Benefit } from './card.model';

/** A retention offer the issuer made on a card, usually when calling to cancel */
export interface RetentionOffer {
  id: string;
  userCardId: string;
  /** ISO date */
  date: string;
  /** e.g. '20,000 points after $2,000 spend' or '$95 statement credit' */
  description: string;
  /** Dollar value of the offer */
  value: number;
  accepted: boolean;
}

export interface BenefitsState {
  /** Dollars used: usage[userCardId][benefitId][periodKey] */
  usage: Record<string, Record<string, Record<string, number>>>;
  /** Credits the user added to a card (targeted offers, one-offs): custom[userCardId] */
  custom: Record<string, Benefit[]>;
  retentionOffers: RetentionOffer[];
}

export interface Referral {
  id: string;
  /** The user's card whose referral link was used */
  userCardId: string;
  /** ISO date the referral was made */
  date: string;
  /** Who was referred (optional) */
  referredWho?: string;
  /** Bonus in the referring card's rewards currency (dollars for cash back) */
  bonusAmount: number;
  status: 'pending' | 'posted';
  /** ISO date the bonus posted */
  postedDate?: string;
}

export function createDefaultBenefitsState(): BenefitsState {
  return { usage: {}, custom: {}, retentionOffers: [] };
}
