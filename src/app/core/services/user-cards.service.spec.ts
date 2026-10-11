import { TestBed } from '@angular/core/testing';
import { CardStatus } from '../models/card.model';
import { UserCardsService } from './user-cards.service';

describe('UserCardsService', () => {
  let service: UserCardsService;

  beforeEach(() => {
    localStorage.clear();
    service = TestBed.inject(UserCardsService);
  });

  it('does not reuse instance numbers after a removal', () => {
    const first = service.addCard('citi-custom-cash');
    service.addCard('citi-custom-cash');
    service.remove(first.id);

    expect(service.addCard('citi-custom-cash').instanceNumber).toBe(3);
  });

  it('patches only the targeted instance', () => {
    const a = service.addCard('citi-custom-cash');
    const b = service.addCard('citi-custom-cash');

    service.patchUserData(a.id, { customLabel: 'Groceries' });
    service.patchUserData(a.id, d => ({ activeData: { ...d.activeData, creditLimit: 5000 } }));

    expect(service.getById(a.id)!.userData.customLabel).toBe('Groceries');
    expect(service.getById(a.id)!.userData.activeData).toEqual({ selectedCategories: {}, creditLimit: 5000 });
    expect(service.getById(b.id)!.userData.customLabel).toBeUndefined();
  });

  it('clears data belonging to the previous status', () => {
    const card = service.addCard('citi-custom-cash');
    service.patchUserData(card.id, d => ({ activeData: { ...d.activeData, creditLimit: 5000 } }));

    service.setStatus(card.id, CardStatus.CLOSED);

    expect(service.getById(card.id)!.userData.status).toBe(CardStatus.CLOSED);
    expect(service.getById(card.id)!.userData.activeData).toBeUndefined();
  });

  it('removes a wishlist-only card when it is un-wishlisted', () => {
    const card = service.addCard('citi-custom-cash', { isWishlist: true });
    service.toggleWishlist(card.id);
    expect(service.getById(card.id)).toBeUndefined();
  });

  it('reports whether a card has user data', () => {
    const card = service.addCard('citi-custom-cash');
    expect(service.hasUserData(service.getById(card.id)!)).toBe(false);

    service.patchUserData(card.id, { accountStartDate: '2025-01-01' });
    expect(service.hasUserData(service.getById(card.id)!)).toBe(true);
  });

  it('moves a wishlist card into the wallet with the given details', () => {
    const card = service.addCard('citi-custom-cash', { isWishlist: true });
    service.moveToWallet(card.id, { status: CardStatus.ACTIVE, userData: { accountStartDate: '2026-01-15' } });

    const moved = service.getById(card.id)!;
    expect(moved.isWishlist).toBe(false);
    expect(moved.userData.status).toBe(CardStatus.ACTIVE);
    expect(moved.userData.accountStartDate).toBe('2026-01-15');
    expect(moved.userData.activeData).toEqual({ selectedCategories: {} });
  });

  describe('product changes', () => {
    it('adds a linked card that keeps the original open date', () => {
      const original = service.addCard('capital-one-savor-one-rewards', { userData: { accountStartDate: '2023-03-10' } });
      service.setStatus(original.id, CardStatus.PRODUCT_CHANGED);
      service.productChange(original.id, 'capital-one-quicksilver-rewards');

      const linked = service.getProductChangedTo(original.id)!;
      expect(linked.cardId).toBe('capital-one-quicksilver-rewards');
      expect(linked.userData.accountStartDate).toBe('2023-03-10');
      expect(linked.userData.productChangedFromId).toBe(original.id);
      expect(service.getById(original.id)!.userData.productChangedData?.productChangedToCardId).toBe(
        'capital-one-quicksilver-rewards'
      );
    });

    it('retargets the linked card instead of adding another', () => {
      const original = service.addCard('capital-one-savor-one-rewards');
      service.productChange(original.id, 'capital-one-quicksilver-rewards');
      const linked = service.getProductChangedTo(original.id)!;
      service.patchUserData(linked.id, { autoTopSpendCategory: 'dining' });

      service.productChange(original.id, 'capital-one-venture-x-rewards');

      expect(service.cards()).toHaveLength(2);
      expect(service.getById(linked.id)!.cardId).toBe('capital-one-venture-x-rewards');
      expect(service.getById(linked.id)!.userData.autoTopSpendCategory).toBeUndefined();
    });

    it('removes an untouched linked card when the product change is cleared', () => {
      const original = service.addCard('capital-one-savor-one-rewards', { userData: { accountStartDate: '2023-03-10' } });
      service.productChange(original.id, 'capital-one-quicksilver-rewards');

      expect(service.clearProductChange(original.id)).toBe(true);
      expect(service.cards()).toHaveLength(1);
    });

    it('keeps a linked card the user has edited', () => {
      const original = service.addCard('capital-one-savor-one-rewards');
      service.productChange(original.id, 'capital-one-quicksilver-rewards');
      const linked = service.getProductChangedTo(original.id)!;
      service.patchUserData(linked.id, { customLabel: 'Daily driver' });

      expect(service.clearProductChange(original.id)).toBe(false);
      expect(service.getById(linked.id)).toBeDefined();
    });
  });
});
