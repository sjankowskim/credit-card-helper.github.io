import { TestBed } from '@angular/core/testing';
import type { UserCard } from '../models/card.model';
import { CardRankingService, type RankingOptions } from './card-ranking.service';

const QUICKSILVER = 'capital-one-quicksilver-rewards';
const SAVOR = 'capital-one-savor-one-rewards';
const VENTURE_X = 'capital-one-venture-x-rewards';
const CUSTOM_CASH = 'citi-custom-cash';

const OPTIONS: RankingOptions = { applyCpp: false, includeDuplicates: true };

let nextId = 0;
function userCard(cardId: string, userData: UserCard['userData'] = {}): UserCard {
  return { id: `uc-${++nextId}`, cardId, instanceNumber: 1, isWishlist: false, userData };
}

describe('CardRankingService', () => {
  let service: CardRankingService;

  beforeEach(() => {
    localStorage.clear();
    service = TestBed.inject(CardRankingService);
  });

  it('ranks the highest reward rate first', () => {
    const [top, second] = service.rankCategory('dining', [userCard(QUICKSILVER), userCard(SAVOR)], OPTIONS);

    expect(top.card.id).toBe(SAVOR);
    expect(top.rewardRate).toBe(3);
    expect(top.unit).toBe('%');
    expect(second.rewardRate).toBe(1.5);
  });

  it('uses base rates for the fallthrough category', () => {
    const [top] = service.rankCategory('fallthrough', [userCard(SAVOR), userCard(QUICKSILVER)], OPTIONS);
    expect(top.card.id).toBe(QUICKSILVER);
    expect(top.rewardRate).toBe(1.5);
  });

  it('applies a parent category tier to its children', () => {
    const [top] = service.rankCategory('fast-food', [userCard(QUICKSILVER), userCard(SAVOR)], OPTIONS);
    expect(top.card.id).toBe(SAVOR);
    expect(top.rewardRate).toBe(3);
  });

  it('warns when an AUTO_TOP_SPEND card has no category selected', () => {
    const [ranking] = service.rankCategory('dining', [userCard(CUSTOM_CASH)], OPTIONS);
    expect(ranking.rewardRate).toBe(1);
    expect(ranking.warning).toContain('Choose a category');
  });

  it('honors each instance’s own AUTO_TOP_SPEND pick', () => {
    const dining = userCard(CUSTOM_CASH, { autoTopSpendCategory: 'dining' });
    const gas = userCard(CUSTOM_CASH, { autoTopSpendCategory: 'gas-stations' });

    const diningRanks = service.rankCategory('dining', [gas, dining], OPTIONS);
    expect(diningRanks.map(r => [r.userCard.id, r.rewardRate])).toEqual([
      [dining.id, 5],
      [gas.id, 1]
    ]);
    expect(diningRanks[0].tier?.spendingCap?.amount).toBe(500);
  });

  it('keeps only the best instance of each card unless duplicates are included', () => {
    const cards = [
      userCard(CUSTOM_CASH, { autoTopSpendCategory: 'gas-stations' }),
      userCard(CUSTOM_CASH, { autoTopSpendCategory: 'dining' })
    ];

    expect(service.rankCategory('dining', cards, OPTIONS)).toHaveLength(2);

    const deduped = service.rankCategory('dining', cards, { ...OPTIONS, includeDuplicates: false });
    expect(deduped).toHaveLength(1);
    expect(deduped[0].userCard.id).toBe(cards[1].id);
  });

  it('applies CPP to cards that can transfer to a travel partner card', () => {
    const [top] = service.rankCategory('dining', [userCard(SAVOR), userCard(VENTURE_X)], {
      ...OPTIONS,
      applyCpp: true
    });

    // 3x Savor points transferred to Venture X at the default 1.85 CPP
    expect(top.card.id).toBe(SAVOR);
    expect(top.rewardRate).toBe(5.55);
    expect(top.unit).toBe('¢');
  });

  it('limits the number of rankings per category', () => {
    const cards = [userCard(QUICKSILVER), userCard(SAVOR), userCard(VENTURE_X)];
    expect(service.rankCategory('dining', cards, { ...OPTIONS, limit: 2 })).toHaveLength(2);
  });

  it('covers tier categories and their parents in registry order, then fallthrough', () => {
    const rankings = service.rankAllCategories([userCard(SAVOR)], OPTIONS);
    const keys = [...rankings.keys()];

    expect(keys).toEqual(expect.arrayContaining(['dining', 'grocery-stores', 'entertainment', 'streaming']));
    expect(keys.at(-1)).toBe('fallthrough');
    expect(keys.indexOf('dining')).toBeLessThan(keys.indexOf('grocery-stores'));
  });
});
