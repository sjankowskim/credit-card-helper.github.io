import { CARD_MAP } from '../data/cards';
import type { VelocityRule } from '../data/issuer-rules';
import type { Card, UserCard } from '../models/card.model';
import { addDays, addMonths, isWithin, parseLocalDate, today } from './date.utils';

/** One new account: an owned card instance with an open date that isn't a product change */
export interface Application {
  userCard: UserCard;
  card: Card;
  date: Date;
}

/**
 * Every new account the user has opened, newest first. Product changes keep the
 * original account, so they aren't applications. Closed cards still count.
 */
export function getApplications(userCards: UserCard[]): Application[] {
  return userCards
    .flatMap(userCard => {
      const card = CARD_MAP.get(userCard.cardId);
      const date = parseLocalDate(userCard.userData.accountStartDate);
      const isApplication = !userCard.isWishlist && !userCard.userData.productChangedFromId;
      return card && date && isApplication ? [{ userCard, card, date }] : [];
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

/**
 * Whether an account counts for an 'all-personal' rule like Chase 5/24. Business cards
 * mostly don't report to personal credit (the catalog's affectsChase524 says which do).
 * Authorized-user cards count.
 */
function countsAsPersonalAccount(app: Application): boolean {
  return app.card.affectsChase524;
}

/** First day an account opened on `date` is outside a rolling window */
export function dropOffDate(date: Date, window: VelocityRule['window']): Date {
  const end = window.unit === 'days' ? addDays(date, window.amount) : addMonths(date, window.amount);
  return addDays(end, 1);
}

export interface WindowStatus {
  /** Accounts inside the window, oldest first */
  counted: Application[];
  /** Whether one more account would still be within the limit */
  canApply: boolean;
  /** When the count falls back below the limit, if it's at or over it now */
  eligibleOn: Date | null;
}

/**
 * Counts applications inside a rolling window ending on `reference` and works out
 * when the limit (`max` accounts) frees up again.
 */
export function getWindowStatus(
  apps: Application[],
  window: VelocityRule['window'],
  max: number,
  reference: Date = today()
): WindowStatus {
  const counted = apps
    .filter(app => app.date <= reference && isWithin(app.date, window.amount, window.unit, reference))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const canApply = counted.length < max;
  // Dropping to max - 1 accounts takes the oldest (count - max + 1) dropping off
  const blocker = canApply ? undefined : counted[counted.length - max];

  return {
    counted,
    canApply,
    eligibleOn: blocker ? dropOffDate(blocker.date, window) : null
  };
}

export function getRuleStatus(rule: VelocityRule, apps: Application[], reference: Date = today()): WindowStatus {
  const counted =
    rule.scope === 'all-personal'
      ? apps.filter(countsAsPersonalAccount)
      : // An authorized-user card isn't an application with the issuer
        apps.filter(app => app.card.issuer === rule.issuer && !app.userCard.userData.isAuthorizedUser);
  return getWindowStatus(counted, rule.window, rule.max, reference);
}
