import { CARD_IMAGE_URLS } from '../data/cards';
import type { Card, RewardTier, SignUpBonus, UserCard } from '../models/card.model';
import type { RateUnit } from '../services/card-ranking.service';
import { addMonths, parseLocalDate, today } from './date.utils';

/**
 * Display name for a card instance: the user's custom label if set, otherwise the catalog name.
 */
export function getCardDisplayName(userCard: UserCard, cardName: string): string {
  return userCard.userData.customLabel || cardName;
}

/**
 * Gets the original card name for display when a custom label is set.
 * Returns undefined if no custom label is set.
 */
export function getOriginalCardName(userCard: UserCard, cardName: string): string | undefined {
  return userCard.userData.customLabel ? cardName : undefined;
}

/**
 * Gets the display instance number for a card within a specific context.
 * Returns undefined if there's only 1 instance in the context.
 *
 * @param userCard - The user card instance
 * @param contextCards - All cards in the current context
 */
export function getDisplayInstanceNumber(userCard: UserCard, contextCards: UserCard[]): number | undefined {
  const matchingCards = contextCards.filter(c => c.cardId === userCard.cardId);
  if (matchingCards.length <= 1) {
    return undefined;
  }
  return matchingCards.findIndex(c => c.id === userCard.id) + 1;
}

/** How a card's earn rate reads before any CPP valuation: '%' cash back or 'x' points */
export function getEarnUnit(card: Card): Exclude<RateUnit, '¢'> {
  return card.rewardsCurrency === 'Cashback' ? '%' : 'x';
}

/** '3x', '3%', or '5.55¢' */
export function formatRate(rate: number, unit: RateUnit): string {
  return `${rate}${unit}`;
}

const CAP_PERIOD_LABELS: Record<NonNullable<RewardTier['spendingCap']>['period'], string> = {
  MONTHLY: 'mo',
  QUARTERLY: 'qtr',
  ANNUAL: 'yr'
};

/** 'up to $500/mo', or '' when the tier has no cap */
export function formatSpendingCap(tier: RewardTier | undefined): string {
  const cap = tier?.spendingCap;
  return cap ? `up to ${formatCurrency(cap.amount)}/${CAP_PERIOD_LABELS[cap.period]}` : '';
}

export function formatCurrency(amount: number): string {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: Number.isInteger(amount) ? 0 : 2
  });
}

/** Annual fee the user pays for this instance */
export function getAnnualFee(userCard: UserCard, card: Card): number {
  return userCard.userData.annualFeeOverride ?? card.annualFee;
}

/**
 * Next account anniversary on or after `reference`, when annual fees usually post.
 * Returns null without an account open date.
 */
export function getNextAnniversary(accountStartDate: string | undefined, reference: Date = today()): Date | null {
  const opened = parseLocalDate(accountStartDate);
  if (!opened) return null;

  let years = Math.max(1, reference.getFullYear() - opened.getFullYear());
  let anniversary = addMonths(opened, 12 * years);
  while (anniversary < reference) {
    anniversary = addMonths(opened, 12 * ++years);
  }
  return anniversary;
}

/**
 * The card's artwork, default design first. Images mirror the card's data file
 * (cards/chase/freedom.ts -> images/cards/chase/freedom.png, freedom-2.png, ...).
 */
export function getCardImageUrls(card: Card): readonly string[] {
  return CARD_IMAGE_URLS.get(card.id) ?? [];
}

/**
 * The card's highest earn rate that applies to a whole category (portal- or merchant-only
 * rates are left out), e.g. 4 for the Amex Gold. Falls back to the base rate.
 */
export function getBestRate(card: Card): number {
  return Math.max(card.baseRewardRate, ...card.rewardTiers.filter(t => !t.onlyWhen).map(t => t.rewardRate));
}

/** '60,000 Ultimate Rewards after $4,000 in 3 mo' or '$200 after $500 in 3 mo' */
export function formatSignUpBonus(bonus: SignUpBonus): string {
  const amount = bonus.currency === 'Cashback' ? formatCurrency(bonus.amount) : `${bonus.amount.toLocaleString('en-US')} ${bonus.currency}`;
  return `${amount} after ${formatCurrency(bonus.spendRequired)} in ${bonus.windowMonths} mo`;
}
