import type { Card, UserCard, UserSignUpBonus } from '../models/card.model';
import { addMonths, daysBetween, parseLocalDate, today } from './date.utils';

export type SubState = 'in-progress' | 'earned' | 'missed';

export interface SubProgress {
  userCard: UserCard;
  card: Card;
  bonus: UserSignUpBonus;
  state: SubState;
  spent: number;
  remaining: number;
  /** Open date + spend window; null until the card has an open date */
  deadline: Date | null;
  /** Days until the deadline (negative once passed) */
  daysLeft: number | null;
  /** Average spend per day needed to finish on time, rounded up to whole dollars */
  perDayNeeded: number | null;
  /** Spend you'd have by now spending evenly across the window */
  expectedSpent: number | null;
  behindPace: boolean;
}

/** A blank bonus to start tracking, prefilled from the card's current public offer */
export function createSignUpBonus(card: Card): UserSignUpBonus {
  return card.defaultSignUpBonus
    ? { ...card.defaultSignUpBonus }
    : { amount: 0, currency: card.rewardsCurrency, spendRequired: 0, windowMonths: 3 };
}

export function getSubProgress(userCard: UserCard, card: Card, bonus: UserSignUpBonus, reference: Date = today()): SubProgress {
  const spent = bonus.spent ?? 0;
  const remaining = Math.max(0, bonus.spendRequired - spent);
  const opened = parseLocalDate(userCard.userData.accountStartDate);
  const deadline = opened ? addMonths(opened, bonus.windowMonths) : null;
  const daysLeft = deadline ? daysBetween(reference, deadline) : null;

  let state: SubState = 'in-progress';
  if (bonus.earnedDate) state = 'earned';
  else if (daysLeft !== null && daysLeft < 0 && remaining > 0) state = 'missed';

  let expectedSpent: number | null = null;
  if (opened && deadline) {
    const total = Math.max(1, daysBetween(opened, deadline));
    const elapsed = Math.min(total, Math.max(0, daysBetween(opened, reference)));
    expectedSpent = Math.round((bonus.spendRequired * elapsed) / total);
  }

  return {
    userCard,
    card,
    bonus,
    state,
    spent,
    remaining,
    deadline,
    daysLeft,
    perDayNeeded: daysLeft !== null && daysLeft >= 0 && remaining > 0 ? Math.ceil(remaining / Math.max(1, daysLeft)) : null,
    expectedSpent,
    behindPace: state === 'in-progress' && expectedSpent !== null && spent < expectedSpent
  };
}

/** Most urgent first: closest deadline, then bonuses without an open date */
export function compareUrgency(a: SubProgress, b: SubProgress): number {
  if (a.daysLeft === null || b.daysLeft === null) return Number(a.daysLeft === null) - Number(b.daysLeft === null);
  return a.daysLeft - b.daysLeft;
}

/**
 * Dollar value of a bonus: cash back is already dollars; points are valued at
 * `cppCents` cents each.
 */
export function getBonusValue(bonus: UserSignUpBonus, cppCents: number): number {
  return bonus.currency === 'Cashback' ? bonus.amount : (bonus.amount * cppCents) / 100;
}
