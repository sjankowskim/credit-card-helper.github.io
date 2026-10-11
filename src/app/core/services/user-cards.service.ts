import { Injectable, computed, inject } from '@angular/core';
import type { UserCard, UserCardData } from '../models/card.model';
import { CardStatus } from '../models/card.model';
import { StorageService } from './storage.service';

type UserDataPatch = Partial<UserCardData> | ((userData: UserCardData) => Partial<UserCardData>);

@Injectable({
  providedIn: 'root'
})
export class UserCardsService {
  private readonly storage = inject(StorageService);

  readonly cards = computed(() => this.storage.state().userCards);

  addCard(cardId: string, isWishlist: boolean = false, status: CardStatus = CardStatus.ACTIVE): UserCard {
    const sameCardInstances = this.cards().filter(c => c.cardId === cardId);
    const nextInstanceNumber = Math.max(0, ...sameCardInstances.map(c => c.instanceNumber)) + 1;

    const newUserCard: UserCard = {
      id: crypto.randomUUID(),
      cardId,
      instanceNumber: nextInstanceNumber,
      isWishlist,
      userData: {
        status: isWishlist ? undefined : status,
        activeData: isWishlist ? undefined : {
          selectedCategories: {}
        }
      }
    };

    this.storage.update('userCards', cards => [...cards, newUserCard]);
    return newUserCard;
  }

  remove(userCardId: string): void {
    this.storage.update('userCards', cards => cards.filter(c => c.id !== userCardId));
  }

  /** Replaces one card instance with the result of `recipe`. */
  update(userCardId: string, recipe: (userCard: UserCard) => UserCard): void {
    this.storage.update('userCards', cards => cards.map(c => c.id === userCardId ? recipe(c) : c));
  }

  /**
   * Shallow-merges fields into a card's userData.
   * Pass a function to build nested objects from the current value, e.g.
   * `patchUserData(id, d => ({ activeData: { ...d.activeData, creditLimit } }))`.
   */
  patchUserData(userCardId: string, patch: UserDataPatch): void {
    this.update(userCardId, c => ({
      ...c,
      userData: { ...c.userData, ...(typeof patch === 'function' ? patch(c.userData) : patch) }
    }));
  }

  /** Changes status and drops the data that belongs to other statuses. */
  setStatus(userCardId: string, status: CardStatus): void {
    this.patchUserData(userCardId, d => ({
      status,
      activeData: status === CardStatus.ACTIVE ? d.activeData : undefined,
      closedData: status === CardStatus.CLOSED ? d.closedData : undefined,
      productChangedData: status === CardStatus.PRODUCT_CHANGED ? d.productChangedData : undefined
    }));
  }

  toggleWishlist(userCardId: string): void {
    const userCard = this.getById(userCardId);
    if (!userCard) return;

    const newIsWishlist = !userCard.isWishlist;

    if (!newIsWishlist && !userCard.userData.status) {
      // If the instance is neither wishlisted nor in portfolio, remove it
      this.remove(userCardId);
    } else {
      this.update(userCardId, c => ({
        ...c,
        isWishlist: newIsWishlist,
        userData: {
          ...c.userData,
          status: newIsWishlist ? undefined : (c.userData.status || CardStatus.ACTIVE)
        }
      }));
    }
  }

  /**
   * Checks if a user card has any actual user data set.
   * This is computed based on current state, not a dirty bit.
   */
  hasUserData(userCard: UserCard): boolean {
    const { activeData, closedData, productChangedData, status, ...common } = userCard.userData;

    return (
      Object.values(common).some(value => value !== undefined) ||
      activeData?.paymentDueDate !== undefined ||
      activeData?.creditLimit !== undefined ||
      Object.values(activeData?.selectedCategories ?? {}).some(selected => selected.length > 0) ||
      Object.values(closedData ?? {}).some(value => value !== undefined) ||
      Object.values(productChangedData ?? {}).some(value => value !== undefined)
    );
  }

  getById(userCardId: string): UserCard | undefined {
    return this.cards().find(c => c.id === userCardId);
  }
}
