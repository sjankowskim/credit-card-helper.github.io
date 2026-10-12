import type { OfferPeriod } from '../../models/offer-history.model';
import { VENTURE_X_REWARDS_OFFERS } from './capital-one/venture-x-rewards';

/**
 * Researched history of public sign-up bonuses, oldest first, by card id. Each period
 * links to the pages that support it. Cards without enough history aren't listed.
 */
export const OFFER_HISTORY: Partial<Record<string, readonly OfferPeriod[]>> = {
  'capital-one-venture-x-rewards': VENTURE_X_REWARDS_OFFERS
};
