import { Injectable, inject } from '@angular/core';
import { CARD_MAP } from '../data/cards';
import { ALL_CATEGORIES, getCategory, getCategoryName } from '../data/category.registry';
import { REWARDS_PROGRAM_REGISTRY } from '../data/rewards-program.registry';
import { CppSettingsService } from './cpp-settings.service';
import type { Card, RewardTier, UserCard } from '../models/card.model';
import { FALLTHROUGH_CATEGORY, getRewardRate } from '../utils/reward-rate.utils';
import { today } from '../utils/date.utils';
import { getEarnUnit } from '../utils/card-display.utils';

/** '%' cash back, 'x' points per dollar, '¢' effective cents per dollar after CPP valuation */
export type RateUnit = '%' | 'x' | '¢';

export interface CardRanking {
  userCard: UserCard;
  card: Card;
  rewardRate: number;
  unit: RateUnit;
  /** Tier that produced the rate (for caps and labels); undefined means the base rate */
  tier?: RewardTier;
  /** Explains how to unlock a better rate on this card, if one exists */
  warning?: string;
}

export interface RankingOptions {
  /** Value points at the user's CPP when the card can reach a travel partner */
  applyCpp: boolean;
  /** When false, only the best instance of each catalog card is kept per category */
  includeDuplicates: boolean;
  /** Maximum rankings per category; omit for all */
  limit?: number;
  /** Date used for rotating categories (defaults to today) */
  date?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class CardRankingService {
  private readonly cppSettingsService = inject(CppSettingsService);

  /**
   * Rank card instances for one category, best first.
   * Earlier instances win ties, so pass owned cards before wishlist cards.
   */
  rankCategory(categoryId: string, userCards: UserCard[], options: RankingOptions): CardRanking[] {
    const instances = this.resolveCards(userCards);
    const cardsInPlay = instances.map(i => i.card);
    const date = options.date ?? today();

    const rankings = instances.map(({ userCard, card }) => {
      const { rate, tier, warning } = getRewardRate(card, userCard, categoryId, date);
      const valued = options.applyCpp && this.canTransferToTravelPartner(card, cardsInPlay);
      const multiplier = valued ? this.cppSettingsService.getCppValuation(card.rewardsProgram) : 1;

      return {
        userCard,
        card,
        rewardRate: round(rate * multiplier),
        unit: valued ? '¢' : getEarnUnit(card),
        tier,
        warning: warning && describeWarning(warning.reason, warning.tier)
      } satisfies CardRanking;
    });

    rankings.sort((a, b) => b.rewardRate - a.rewardRate);

    const deduped = options.includeDuplicates
      ? rankings
      : rankings.filter((r, i) => rankings.findIndex(other => other.card.id === r.card.id) === i);

    return options.limit === undefined ? deduped : deduped.slice(0, options.limit);
  }

  /** Rankings for every category the cards earn a bonus in, plus the fallthrough row. */
  rankAllCategories(userCards: UserCard[], options: RankingOptions): Map<string, CardRanking[]> {
    const cards = this.resolveCards(userCards).map(i => i.card);
    return new Map(
      this.getCoveredCategories(cards).map(categoryId => [categoryId, this.rankCategory(categoryId, userCards, options)])
    );
  }

  getCategoryLabel(categoryId: string): string {
    return categoryId === FALLTHROUGH_CATEGORY ? 'Everything Else' : getCategoryName(categoryId);
  }

  /**
   * Categories named by any tier, plus their parents, in registry order, then fallthrough.
   */
  private getCoveredCategories(cards: Card[]): string[] {
    const covered = new Set<string>();
    for (const card of cards) {
      for (const tier of card.rewardTiers) {
        for (const categoryId of tier.eligibleCategories) {
          covered.add(categoryId);
          const parentId = getCategory(categoryId)?.parentId;
          if (parentId) covered.add(parentId);
        }
      }
    }
    return [...ALL_CATEGORIES.map(c => c.id).filter(id => covered.has(id)), FALLTHROUGH_CATEGORY];
  }

  /**
   * A card's points can be valued at CPP if it has travel partners itself, or if its
   * program allows pooling points onto another card in play that does.
   */
  private canTransferToTravelPartner(card: Card, cardsInPlay: Card[]): boolean {
    if (card.hasTravelPartnerAccess) return true;
    if (!REWARDS_PROGRAM_REGISTRY[card.rewardsProgram].allowsTransfers) return false;
    return cardsInPlay.some(other => other.rewardsProgram === card.rewardsProgram && other.hasTravelPartnerAccess);
  }

  private resolveCards(userCards: UserCard[]): { userCard: UserCard; card: Card }[] {
    return userCards.flatMap(userCard => {
      const card = CARD_MAP.get(userCard.cardId);
      return card ? [{ userCard, card }] : [];
    });
  }
}

function describeWarning(reason: 'NEEDS_SELECTION' | 'NEEDS_ACTIVATION', tier: RewardTier): string {
  const action = reason === 'NEEDS_SELECTION' ? 'Choose a category for' : 'Activate';
  return `${action} "${tier.name}" in the card's details to earn ${tier.rewardRate}x here.`;
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}
