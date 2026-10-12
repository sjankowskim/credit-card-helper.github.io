import { CardStatus, type Card, type UserCard } from '../models/card.model';
import type { BankBonus } from '../models/bank-bonus.model';
import type { Subscription } from '../models/subscription.model';
import type { CreditStatus } from '../services/benefits.service';
import { formatCurrency, getAnnualFee, getNextAnniversary } from './card-display.utils';
import { getSubProgress } from './sub.utils';
import { getBankBonusProgress } from './bank-bonus.utils';
import { getNextPayment } from './subscription.utils';
import { daysBetween, parseLocalDate, today } from './date.utils';

export type UpcomingKind = 'bonus' | 'fee' | 'close' | 'payment' | 'credit' | 'charge';

export interface UpcomingEvent {
  date: Date;
  /** 0 is today */
  daysLeft: number;
  kind: UpcomingKind;
  title: string;
  /** Extra context, left out when the title says it all */
  detail?: string;
  /** Page where the event is managed */
  link: string;
}

/** One-off deadlines show this far ahead */
export const UPCOMING_DAYS = 30;
/**
 * Things that come around every month (payment due days, monthly credits and charges)
 * only show this far ahead, so they don't crowd out the one-off deadlines.
 */
export const RECURRING_DAYS = 7;

export interface UpcomingSources {
  /** Owned cards (not wishlist) with their catalog card */
  cards: { userCard: UserCard; card: Card }[];
  credits: CreditStatus[];
  bankBonuses: BankBonus[];
  subscriptions: Subscription[];
  /** Display name for an owned card, e.g. 'Freedom Flex #2' */
  nameOf: (userCard: UserCard) => string;
}

/** Everything due soon across the app, soonest first */
export function getUpcomingEvents(sources: UpcomingSources, reference: Date = today()): UpcomingEvent[] {
  const events: UpcomingEvent[] = [];
  const add = (date: Date | null, withinDays: number, event: Omit<UpcomingEvent, 'date' | 'daysLeft'>): void => {
    if (!date) return;
    const daysLeft = daysBetween(reference, date);
    if (daysLeft >= 0 && daysLeft <= withinDays) events.push({ ...event, date, daysLeft });
  };

  for (const { userCard, card } of sources.cards) {
    const data = userCard.userData;
    const name = sources.nameOf(userCard);

    const bonus = data.signUpBonus;
    if (bonus) {
      const sub = getSubProgress(userCard, card, bonus, reference);
      if (sub.state === 'in-progress' && sub.remaining > 0) {
        add(sub.deadline, UPCOMING_DAYS, {
          kind: 'bonus',
          title: `${name} sign-up bonus deadline`,
          detail: `${formatCurrency(sub.remaining)} left to spend`,
          link: '/sub-tracker'
        });
      }
    }

    if (data.status !== CardStatus.ACTIVE) continue;

    const fee = getAnnualFee(userCard, card);
    if (fee > 0) {
      add(getNextAnniversary(data.accountStartDate, reference), UPCOMING_DAYS, {
        kind: 'fee',
        title: `${name} annual fee`,
        detail: `${formatCurrency(fee)}, around the account anniversary`,
        link: '/wallet'
      });
    }

    if (data.isChurnCard) {
      add(parseLocalDate(data.plannedCloseDate), UPCOMING_DAYS, {
        kind: 'close',
        title: `Close ${name}`,
        detail: 'Planned close for this churn card',
        link: '/wallet'
      });
    }

    const dueDay = data.activeData?.paymentDueDate;
    if (dueDay) {
      add(nextDayOfMonth(dueDay, reference), RECURRING_DAYS, {
        kind: 'payment',
        title: `${name} payment due`,
        link: '/wallet'
      });
    }
  }

  for (const credit of sources.credits) {
    if (credit.remaining <= 0) continue;
    const recurringMonthly = credit.benefit.period === 'MONTHLY';
    add(credit.period.end, recurringMonthly ? RECURRING_DAYS : UPCOMING_DAYS, {
      kind: 'credit',
      title: `${credit.benefit.name} ${credit.benefit.period === 'ONE_TIME' ? 'expires' : 'resets'}`,
      detail: `${formatCurrency(credit.remaining)} left on ${sources.nameOf(credit.userCard)}`,
      link: '/benefits'
    });
  }

  for (const bankBonus of sources.bankBonuses) {
    const progress = getBankBonusProgress(bankBonus, reference);
    const name = `${bankBonus.bank} ${bankBonus.accountName}`;
    if (progress.state === 'in-progress' && !progress.requirementMet) {
      add(progress.deadline, UPCOMING_DAYS, {
        kind: 'bonus',
        title: `${name} bonus deadline`,
        detail: bankBonus.requirement,
        link: '/sub-tracker'
      });
    }
    add(parseLocalDate(bankBonus.keepOpenUntil), UPCOMING_DAYS, {
      kind: 'close',
      title: `${name} can be closed`,
      detail: 'Safe to close without losing the bonus',
      link: '/sub-tracker'
    });
  }

  for (const subscription of sources.subscriptions) {
    if (!subscription.active) continue;
    const recurringMonthly =
      (subscription.cadenceUnit === 'month' && subscription.cadenceValue === 1) ||
      subscription.cadenceUnit === 'week' ||
      subscription.cadenceUnit === 'day';
    add(getNextPayment(subscription, reference), recurringMonthly ? RECURRING_DAYS : UPCOMING_DAYS, {
      kind: 'charge',
      title: subscription.name,
      detail: `${formatCurrency(subscription.cost)} charge`,
      link: '/subscriptions'
    });
  }

  return events.sort((a, b) => a.date.getTime() - b.date.getTime());
}

/** Next date on or after `reference` that falls on `day`, using the last day in shorter months */
export function nextDayOfMonth(day: number, reference: Date = today()): Date {
  const inMonth = (year: number, month: number) =>
    new Date(year, month, Math.min(day, new Date(year, month + 1, 0).getDate()));
  const thisMonth = inMonth(reference.getFullYear(), reference.getMonth());
  return thisMonth >= reference ? thisMonth : inMonth(reference.getFullYear(), reference.getMonth() + 1);
}

/** 'Today', 'Tomorrow', or 'In 5 days' */
export function describeDaysLeft(daysLeft: number): string {
  if (daysLeft === 0) return 'Today';
  if (daysLeft === 1) return 'Tomorrow';
  return `In ${daysLeft} days`;
}
