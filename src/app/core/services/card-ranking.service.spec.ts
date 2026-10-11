import { TestBed } from '@angular/core/testing';
import type { UserCard } from '../models/card.model';
import { CardRankingService } from './card-ranking.service';

const QUICKSILVER = 'capital-one-quicksilver-rewards';
const SAVOR = 'capital-one-savor-one-rewards';
const VENTURE_X = 'capital-one-venture-x-rewards';
const CUSTOM_CASH = 'citi-custom-cash';

function userCard(cardId: string, userData: UserCard['userData'] = {}): UserCard {
  return { id: `${cardId}-1`, cardId, instanceNumber: 1, isWishlist: false, userData };
}

describe('CardRankingService', () => {
  let service: CardRankingService;

  beforeEach(() => {
    localStorage.clear();
    service = TestBed.inject(CardRankingService);
  });

  it('ranks the highest reward rate first', () => {
    const cards = [userCard(QUICKSILVER), userCard(SAVOR)];
    const [top, second] = service.getTopCardsForCategory('dining', [QUICKSILVER, SAVOR], cards, 2);

    expect(top.card.id).toBe(SAVOR);
    expect(top.rewardRate).toBe(3);
    expect(second.rewardRate).toBe(1.5);
  });

  it('uses base rates for the fallthrough category', () => {
    const [top] = service.getTopCardsForCategory('fallthrough', [QUICKSILVER, SAVOR], [], 1);
    expect(top.card.id).toBe(QUICKSILVER);
    expect(top.rewardRate).toBe(1.5);
  });

  it('warns when an AUTO_TOP_SPEND card has no category selected', () => {
    const [ranking] = service.getTopCardsForCategory('dining', [CUSTOM_CASH], [userCard(CUSTOM_CASH)], 1);
    expect(ranking.rewardRate).toBe(1);
    expect(ranking.hasAutoTopSpendWarning).toBe(true);
  });

  it('applies the AUTO_TOP_SPEND rate only to the selected category', () => {
    const cards = [userCard(CUSTOM_CASH, { autoTopSpendCategory: 'dining' })];
    expect(service.getTopCardsForCategory('dining', [CUSTOM_CASH], cards, 1)[0].rewardRate).toBe(5);
    expect(service.getTopCardsForCategory('grocery-stores', [CUSTOM_CASH], cards, 1)[0].rewardRate).toBe(1);
  });

  it('applies CPP to cards that can transfer to a travel partner card', () => {
    const ids = [SAVOR, VENTURE_X];
    const cards = ids.map(id => userCard(id));

    const [top] = service.getTopCardsForCategory('dining', ids, cards, 1, true);

    // 3x Savor points transferred to Venture X at the default 1.85 CPP
    expect(top.card.id).toBe(SAVOR);
    expect(top.rewardRate).toBe(5.55);
  });

  it('covers every tier category plus the fallthrough row', () => {
    const rankings = service.getAllCategoryRankings([SAVOR], [userCard(SAVOR)], 1);
    expect([...rankings.keys()]).toEqual(expect.arrayContaining(['dining', 'grocery-stores', 'fallthrough']));
  });
});
