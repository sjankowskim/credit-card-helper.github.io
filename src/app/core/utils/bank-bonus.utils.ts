import type { BankBonus } from '../models/bank-bonus.model';
import { addDays, daysBetween, parseLocalDate, today } from './date.utils';
import type { SubState } from './sub.utils';

export interface BankBonusProgress {
  bonus: BankBonus;
  state: SubState;
  /** 0-100 */
  percent: number;
  requirementMet: boolean;
  /** Open date + window; null until the account has an open date */
  deadline: Date | null;
  /** Days until the deadline (negative once passed) */
  daysLeft: number | null;
  /** Progress you'd have by now moving evenly across the window */
  expectedProgress: number | null;
  behindPace: boolean;
  /** Days until the account can be closed without losing the bonus (0 or less once allowed) */
  daysUntilCanClose: number | null;
}

export function getBankBonusProgress(bonus: BankBonus, reference: Date = today()): BankBonusProgress {
  const requirementMet = bonus.progress >= bonus.goal;
  const opened = parseLocalDate(bonus.openedDate);
  const deadline = opened ? addDays(opened, bonus.windowDays) : null;
  const daysLeft = deadline ? daysBetween(reference, deadline) : null;

  let state: SubState = 'in-progress';
  if (bonus.earnedDate) state = 'earned';
  else if (daysLeft !== null && daysLeft < 0 && !requirementMet) state = 'missed';

  let expectedProgress: number | null = null;
  if (opened && deadline) {
    const total = Math.max(1, bonus.windowDays);
    const elapsed = Math.min(total, Math.max(0, daysBetween(opened, reference)));
    expectedProgress = (bonus.goal * elapsed) / total;
  }

  const keepOpenUntil = parseLocalDate(bonus.keepOpenUntil);
  return {
    bonus,
    state,
    percent: bonus.goal > 0 ? Math.min(100, (bonus.progress / bonus.goal) * 100) : 100,
    requirementMet,
    deadline,
    daysLeft,
    expectedProgress,
    behindPace: state === 'in-progress' && !requirementMet && expectedProgress !== null && bonus.progress < expectedProgress,
    daysUntilCanClose: keepOpenUntil ? daysBetween(reference, keepOpenUntil) : null
  };
}

/** Most urgent first: closest deadline, then bonuses without an open date */
export function compareBankBonusUrgency(a: BankBonusProgress, b: BankBonusProgress): number {
  if (a.daysLeft === null || b.daysLeft === null) return Number(a.daysLeft === null) - Number(b.daysLeft === null);
  return a.daysLeft - b.daysLeft;
}
