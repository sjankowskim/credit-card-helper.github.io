import type { Card } from '../models/card.model';
import { ALL_CARDS } from '../data/cards';

/**
 * Cards an account on `card` can be changed to: the issuer's other cards, plus the card the
 * issuer moved its accounts to (e.g. Barclays Aviator Red to Citi AAdvantage Platinum Select).
 */
export function getProductChangeTargets(card: Card): Card[] {
  return ALL_CARDS.filter(c => c.id !== card.id && (c.issuer === card.issuer || c.id === card.transitionedTo?.cardId));
}

/**
 * Cards an account could have been before becoming `card`: the issuer's other cards, plus cards
 * whose accounts were moved to it by another issuer.
 */
export function getProductChangeSources(card: Card): Card[] {
  return ALL_CARDS.filter(c => c.id !== card.id && (c.issuer === card.issuer || c.transitionedTo?.cardId === card.id));
}
