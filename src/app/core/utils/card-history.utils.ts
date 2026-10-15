import { CardStatus, type Card, type UserCard } from '../models/card.model';

export type CardHistoryKind = 'opened' | 'bonus' | 'credit-limit' | 'product-change' | 'closed';

export interface CardHistoryEvent {
  kind: CardHistoryKind;
  /** ISO date; undated events stay where they happened in the account's life */
  date?: string;
  title: string;
  detail?: string;
  /** Instances the event belongs to; a product change belongs to both the old and the new card */
  userCardIds: string[];
}

/**
 * Every instance of one account, oldest first: the card it was opened as, then each card it
 * was product-changed to (linked by `productChangedFromId`).
 */
export function getAccountChain(userCardId: string, cards: readonly UserCard[]): UserCard[] {
  const byId = new Map(cards.map(c => [c.id, c]));
  const start = byId.get(userCardId);
  if (!start) return [];

  // Walk back to the original card, then forward; the `includes` checks guard against a loop of links
  const chain = [start];
  for (let from = byId.get(start.userData.productChangedFromId ?? ''); from && !chain.includes(from); ) {
    chain.unshift(from);
    from = byId.get(from.userData.productChangedFromId ?? '');
  }
  for (let next = nextOf(start, cards); next && !chain.includes(next); next = nextOf(next, cards)) {
    chain.push(next);
  }
  return chain;
}

function nextOf(userCard: UserCard, cards: readonly UserCard[]): UserCard | undefined {
  return cards.find(c => c.userData.productChangedFromId === userCard.id);
}

/**
 * The life of the account `userCardId` belongs to: when it was opened, bonuses earned,
 * credit limit increase requests, product changes, and closing. Oldest first.
 */
export function getCardHistory(
  userCardId: string,
  cards: readonly UserCard[],
  nameOf: (userCard: UserCard) => string,
  cardOf: (cardId: string) => Card | undefined
): CardHistoryEvent[] {
  const chain = getAccountChain(userCardId, cards);
  const events: CardHistoryEvent[] = [];

  chain.forEach((userCard, index) => {
    const data = userCard.userData;
    const name = nameOf(userCard);
    const add = (event: Omit<CardHistoryEvent, 'userCardIds'>, alsoUserCardId?: string) =>
      events.push({ ...event, userCardIds: alsoUserCardId ? [userCard.id, alsoUserCardId] : [userCard.id] });

    if (index === 0) {
      add({
        kind: 'opened',
        date: data.accountStartDate,
        title: `Opened ${name}`,
        detail: data.isAuthorizedUser ? 'As an authorized user' : undefined
      });
    }

    const bonus = data.signUpBonus;
    if (bonus?.earnedDate) {
      add({
        kind: 'bonus',
        date: bonus.earnedDate,
        title: 'Earned the sign-up bonus',
        detail: `${bonus.amount.toLocaleString()} ${bonus.currency}`
      });
    }

    if (bonus?.notEarned) {
      add({ kind: 'bonus', date: bonus.notEarned.date, title: "Didn't get the sign-up bonus", detail: bonus.notEarned.reason });
    }

    if (data.status === CardStatus.ACTIVE && data.activeData?.lastCliRequestDate) {
      add({ kind: 'credit-limit', date: data.activeData.lastCliRequestDate, title: 'Asked for a credit limit increase' });
    }

    if (data.status === CardStatus.PRODUCT_CHANGED) {
      const next = chain[index + 1];
      const toId = data.productChangedData?.productChangedToCardId;
      const to = toId ? cardOf(toId) : undefined;
      const toName = next ? nameOf(next) : (to?.name ?? 'another card');
      // An issuer moving its accounts to another bank (Barclays to Citi) keeps the account, like a product change
      const from = cardOf(userCard.cardId);
      const moved = from && to && from.issuer !== to.issuer;
      add({
        kind: 'product-change',
        date: data.productChangedData?.productChangeDate,
        title: moved ? `${name} became ${toName}` : `Product changed from ${name} to ${toName}`,
        detail: [moved ? `${from.issuer} moved its accounts to ${to.issuer}` : '', data.productChangedData?.reason ?? '']
          .filter(Boolean)
          .join(' · ') || undefined
      }, next?.id);
    }

    if (data.status === CardStatus.CLOSED) {
      add({ kind: 'closed', date: data.closedData?.closedDate, title: `Closed ${name}`, detail: data.closedData?.reason });
    }
  });

  // Sort by date, keeping an undated event right after the event before it
  let lastDate = '';
  const keyed = events.map((event, order) => {
    lastDate = event.date ?? lastDate;
    return { event, key: lastDate, order };
  });
  return keyed.sort((a, b) => a.key.localeCompare(b.key) || a.order - b.order).map(k => k.event);
}
