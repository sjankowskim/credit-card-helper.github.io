import type { UserCard } from '../models/card.model';

/**
 * Computes a user-friendly display name for a card within a specific list context.
 * 
 * @param userCard - The user card instance to display
 * @param cardName - The base card name from the catalog
 * @param contextCards - All cards in the current context (e.g., all owned cards or all wishlist cards)
 * @returns Display name (custom label if set, otherwise base card name)
 */
export function getCardDisplayName(
  userCard: UserCard,
  cardName: string,
  contextCards: UserCard[]
): string {
  // If user set a custom label, show it
  if (userCard.userData.customLabel) {
    return userCard.userData.customLabel;
  }

  // Otherwise, just return the base card name
  return cardName;
}

/**
 * Gets the original card name for display when a custom label is set.
 * Returns undefined if no custom label is set.
 * 
 * @param userCard - The user card instance
 * @param cardName - The base card name from the catalog
 * @returns Original card name or undefined
 */
export function getOriginalCardName(
  userCard: UserCard,
  cardName: string
): string | undefined {
  // Only return original name if custom label is set
  if (userCard.userData.customLabel) {
    return cardName;
  }
  return undefined;
}

/**
 * Gets the display instance number for a card within a specific context.
 * Returns undefined if there's only 1 instance in the context.
 * 
 * @param userCard - The user card instance
 * @param contextCards - All cards in the current context
 * @returns Instance number or undefined
 */
export function getDisplayInstanceNumber(
  userCard: UserCard,
  contextCards: UserCard[]
): number | undefined {
  // Filter the context to only cards of this same type
  const matchingCards = contextCards.filter(c => c.cardId === userCard.cardId);

  // If there's only 1 instance in this list, no number is needed
  if (matchingCards.length <= 1) {
    return undefined;
  }

  // If multiple exist, return the position in THIS list
  const index = matchingCards.findIndex(c => c.id === userCard.id);
  return index + 1;
}
