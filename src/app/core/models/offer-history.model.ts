/** A web page that supports an offer history entry */
export interface OfferSource {
  url: string;
  title: string;
  /** What the page shows, e.g. 'Announces the 100k offer on Nov 1, 2025' */
  supports?: string;
}

/** One period of a card's public sign-up bonus */
export interface OfferPeriod {
  /** ISO date the offer started */
  start: string;
  /** How exact `start` is; 'month' means only the month is known */
  startPrecision: 'day' | 'month';
  /** ISO date the offer ended, when known; otherwise it ran until the next period */
  end?: string;
  amount: number;
  /** Rewards currency of `amount`, e.g. 'Ultimate Rewards' */
  currency: string;
  spendRequired: number;
  windowMonths: number;
  /** Anything bundled with the bonus, e.g. '$250 travel credit' */
  extras?: string;
  /** A limited-time increase over the usual offer */
  elevated: boolean;
  /** How well the sources pin down this period */
  confidence: 'high' | 'medium' | 'low';
  sources: OfferSource[];
  notes?: string;
}
