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
    const card = service.addCard('citi-custom-cash', true);
    service.toggleWishlist(card.id);
    expect(service.getById(card.id)).toBeUndefined();
  });

  it('reports whether a card has user data', () => {
    const card = service.addCard('citi-custom-cash');
    expect(service.hasUserData(service.getById(card.id)!)).toBe(false);

    service.patchUserData(card.id, { accountStartDate: '2025-01-01' });
    expect(service.hasUserData(service.getById(card.id)!)).toBe(true);
  });
});
