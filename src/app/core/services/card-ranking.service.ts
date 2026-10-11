import { Injectable, inject } from '@angular/core';
import { ALL_CARDS, CARD_MAP } from '../data/cards';
import { getCategory } from '../data/category.registry';
import { REWARDS_PROGRAM_REGISTRY } from '../data/rewards-program.registry';
import { CppSettingsService } from './cpp-settings.service';
import type { CategoryId } from '../data/category.registry';
import type { Card, UserCard } from '../models/card.model';

export interface CardRanking {
  card: Card;
  rewardRate: number;
  hasAutoTopSpendWarning?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CardRankingService {
  private readonly cppSettingsService = inject(CppSettingsService);

  /**
   * Check if a card can apply CPP multiplier through point transfers
   * Returns true if:
   * - Card has direct travel partner access, OR
   * - Card's rewards program allows transfers AND user owns another card in same program with travel partner access
   */
  private canApplyCppMultiplier(card: Card, cardIds: string[], userCards: UserCard[]): boolean {
    // Direct travel partner access
    if (card.hasTravelPartnerAccess) {
      return true;
    }

    // Check for transferable program with travel partner card
    const program = REWARDS_PROGRAM_REGISTRY[card.rewardsProgram];
    if (!program.allowsTransfers) {
      return false;
    }

    // Check if user owns any card in same program with travel partner access
    // Only check cards that are in the current cardIds (respects wishlist toggle)
    return cardIds.some(cardId => {
      const otherCard = CARD_MAP.get(cardId);
      return (
        otherCard &&
        otherCard.rewardsProgram === card.rewardsProgram &&
        otherCard.hasTravelPartnerAccess
      );
    });
  }

  /**
   * Get the reward rate for a specific card and category
   * Checks reward tiers first, then falls back to base rate
   * For AUTO_TOP_SPEND cards, only applies bonus rate if the category matches the user's selection
   */
  private getCardRewardRate(card: Card, categoryId: CategoryId, userCard?: UserCard, applyCpp: boolean = false, cardIds: string[] = [], allUserCards: UserCard[] = []): { rate: number; hasWarning: boolean } {
    const canApplyCpp = applyCpp && this.canApplyCppMultiplier(card, cardIds, allUserCards);
    
    // Check if card has a reward tier that covers this category
    for (const tier of card.rewardTiers) {
      if (tier.eligibleCategories.includes(categoryId)) {
        // For AUTO_TOP_SPEND cards, only apply bonus rate if this is the selected category
        if (tier.behavior.type === 'AUTO_TOP_SPEND') {
          if (!userCard?.userData.autoTopSpendCategory) {
            // No category selected - this is a warning state
            let rate = card.baseRewardRate;
            if (canApplyCpp) {
              rate *= this.cppSettingsService.getCppValuation(card.rewardsProgram);
            }
            return { rate: parseFloat(rate.toFixed(2)), hasWarning: true };
          }
          if (userCard.userData.autoTopSpendCategory === categoryId) {
            let rate = tier.rewardRate;
            if (canApplyCpp) {
              rate *= this.cppSettingsService.getCppValuation(card.rewardsProgram);
            }
            return { rate: parseFloat(rate.toFixed(2)), hasWarning: false };
          }
          // Not the selected category - use base rate
          let baseRate = card.baseRewardRate;
          if (canApplyCpp) {
            baseRate *= this.cppSettingsService.getCppValuation(card.rewardsProgram);
          }
          return { rate: parseFloat(baseRate.toFixed(2)), hasWarning: false };
        }
        // For USER_CHOICE cards, only apply bonus rate if this category is in the selected categories
        if (tier.behavior.type === 'USER_CHOICE') {
          const selectedCategories = userCard?.userData.activeData?.selectedCategories?.[tier.id] || [];
          if (selectedCategories.length === 0) {
            // No categories selected - this is a warning state
            let rate = card.baseRewardRate;
            if (canApplyCpp) {
              rate *= this.cppSettingsService.getCppValuation(card.rewardsProgram);
            }
            return { rate: parseFloat(rate.toFixed(2)), hasWarning: true };
          }
          if (selectedCategories.includes(categoryId)) {
            let rate = tier.rewardRate;
            if (canApplyCpp) {
              rate *= this.cppSettingsService.getCppValuation(card.rewardsProgram);
            }
            return { rate: parseFloat(rate.toFixed(2)), hasWarning: false };
          }
          // Not in selected categories - use base rate
          let baseRate = card.baseRewardRate;
          if (canApplyCpp) {
            baseRate *= this.cppSettingsService.getCppValuation(card.rewardsProgram);
          }
          return { rate: parseFloat(baseRate.toFixed(2)), hasWarning: false };
        }
        let rate = tier.rewardRate;
        if (canApplyCpp) {
          rate *= this.cppSettingsService.getCppValuation(card.rewardsProgram);
        }
        return { rate: parseFloat(rate.toFixed(2)), hasWarning: false };
      }
    }
    
    // Fall back to base rate
    let baseRate = card.baseRewardRate;
    if (canApplyCpp) {
      baseRate *= this.cppSettingsService.getCppValuation(card.rewardsProgram);
    }
    return { rate: parseFloat(baseRate.toFixed(2)), hasWarning: false };
  }

  /**
   * Get all categories that are covered by the given cards
   * This includes categories explicitly mentioned in reward tiers
   * and their parent categories
   */
  private getCoveredCategories(cardIds: string[]): Set<string> {
    const covered = new Set<string>();
    const cards = ALL_CARDS.filter(card => cardIds.includes(card.id));
    
    for (const card of cards) {
      for (const tier of card.rewardTiers) {
        for (const categoryId of tier.eligibleCategories) {
          covered.add(categoryId);
          
          // Add parent category if it exists
          const category = getCategory(categoryId);
          if (category?.parentId) {
            covered.add(category.parentId);
          }
        }
      }
    }
    
    // Always include fallthrough/base rate category
    covered.add('fallthrough');
    
    return covered;
  }

  /**
   * Get top N cards for a specific category, sorted by reward rate (highest first)
   */
  getTopCardsForCategory(categoryId: string, cardIds: string[], userCards: UserCard[], n: number, applyCpp: boolean = false): CardRanking[] {
    const cards = ALL_CARDS.filter(card => cardIds.includes(card.id));
    
    const rankings = cards.map(card => {
      // For fallthrough category, always use base rate
      if (categoryId === 'fallthrough') {
        let rate = card.baseRewardRate;
        if (applyCpp && this.canApplyCppMultiplier(card, cardIds, userCards)) {
          rate *= this.cppSettingsService.getCppValuation(card.rewardsProgram);
        }
        return {
          card,
          rewardRate: parseFloat(rate.toFixed(2)),
          hasAutoTopSpendWarning: false
        };
      }
      
      const userCard = userCards.find(uc => uc.cardId === card.id);
      const { rate, hasWarning } = this.getCardRewardRate(card, categoryId as CategoryId, userCard, applyCpp, cardIds, userCards);
      return {
        card,
        rewardRate: rate,
        hasAutoTopSpendWarning: hasWarning
      };
    });
    
    // Sort by reward rate descending
    rankings.sort((a, b) => b.rewardRate - a.rewardRate);
    
    return rankings.slice(0, n);
  }

  /**
   * Get rankings for all categories covered by the given cards
   */
  getAllCategoryRankings(cardIds: string[], userCards: UserCard[], n: number, applyCpp: boolean = false): Map<string, CardRanking[]> {
    const rankings = new Map<string, CardRanking[]>();
    const coveredCategories = this.getCoveredCategories(cardIds);
    
    for (const categoryId of coveredCategories) {
      rankings.set(categoryId, this.getTopCardsForCategory(categoryId, cardIds, userCards, n, applyCpp));
    }
    
    return rankings;
  }
}
