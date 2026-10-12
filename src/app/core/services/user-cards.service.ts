import { Injectable, computed, inject } from '@angular/core';
import type { UserCard, UserCardData, UserSignUpBonus } from '../models/card.model';
import { CardStatus } from '../models/card.model';
import { StorageService } from './storage.service';

type UserDataPatch = Partial<UserCardData> | ((userData: UserCardData) => Partial<UserCardData>);

/** Details for a card entering the wallet */
export interface WalletEntry {
  status?: CardStatus;
  userData?: Partial<UserCardData>;
}

@Injectable({
  providedIn: 'root'
})
export class UserCardsService {
  private readonly storage = inject(StorageService);

  readonly cards = computed(() => this.storage.state().userCards);

  /**
   * Adds a card instance. Owned cards start active unless a status is given;
   * `userData` fields (open date, label, sign-up bonus, ...) are merged in.
   */
  addCard(cardId: string, options: WalletEntry & { isWishlist?: boolean } = {}): UserCard {
    const { isWishlist = false, status = CardStatus.ACTIVE, userData = {} } = options;
    const sameCardInstances = this.cards().filter(c => c.cardId === cardId);
    const nextInstanceNumber = Math.max(0, ...sameCardInstances.map(c => c.instanceNumber)) + 1;

    const newUserCard: UserCard = {
      id: crypto.randomUUID(),
      cardId,
      instanceNumber: nextInstanceNumber,
      isWishlist,
      userData: {
        status: isWishlist ? undefined : status,
        activeData: !isWishlist && status === CardStatus.ACTIVE ? { selectedCategories: {} } : undefined,
        ...userData
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

  /** Merges fields into a card's sign-up bonus; does nothing if it has none. */
  patchSignUpBonus(userCardId: string, patch: Partial<UserSignUpBonus>): void {
    this.patchUserData(userCardId, d => (d.signUpBonus ? { signUpBonus: { ...d.signUpBonus, ...patch } } : {}));
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

  /** Moves a wishlist instance into the wallet, merging in the given details. */
  moveToWallet(userCardId: string, { status = CardStatus.ACTIVE, userData = {} }: WalletEntry = {}): void {
    this.update(userCardId, c => ({
      ...c,
      isWishlist: false,
      userData: {
        ...c.userData,
        status,
        activeData: status === CardStatus.ACTIVE ? { selectedCategories: {}, ...c.userData.activeData } : undefined,
        ...userData
      }
    }));
  }

  toggleWishlist(userCardId: string): void {
    const userCard = this.getById(userCardId);
    if (!userCard) return;

    const newIsWishlist = !userCard.isWishlist;

    if (!newIsWishlist && !userCard.userData.status) {
      // If the instance is neither wishlisted nor in the wallet, remove it
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
   * Records that `userCardId` was product-changed to `newCardId`.
   * Creates (or retargets) a linked active instance that keeps the original open date,
   * since a product change doesn't open a new account.
   */
  productChange(userCardId: string, newCardId: string): void {
    const original = this.getById(userCardId);
    if (!original) return;

    this.patchUserData(userCardId, d => ({
      productChangedData: { ...d.productChangedData, productChangedToCardId: newCardId }
    }));

    const linked = this.getProductChangedTo(userCardId);
    if (linked) {
      if (linked.cardId !== newCardId) {
        // Category selections belong to the old card's tiers
        this.update(linked.id, c => ({
          ...c,
          cardId: newCardId,
          userData: {
            ...c.userData,
            autoTopSpendCategory: undefined,
            activeData: { ...c.userData.activeData, selectedCategories: {}, activatedTierIds: [] }
          }
        }));
      }
    } else {
      this.addCard(newCardId, {
        userData: {
          accountStartDate: original.userData.accountStartDate,
          productChangedFromId: userCardId
        }
      });
    }
  }

  /**
   * Clears a product change. The linked instance is removed if the user hasn't
   * added anything to it; otherwise it's kept. Returns whether it was removed.
   */
  clearProductChange(userCardId: string): boolean {
    this.patchUserData(userCardId, d => ({
      productChangedData: { ...d.productChangedData, productChangedToCardId: undefined }
    }));

    const linked = this.getProductChangedTo(userCardId);
    if (!linked) return false;

    const { accountStartDate, productChangedFromId, ...rest } = linked.userData;
    const untouched = !this.hasUserData({ ...linked, userData: rest });
    if (untouched) {
      this.remove(linked.id);
    }
    return untouched;
  }

  /** The instance created by product-changing `userCardId`, if any */
  getProductChangedTo(userCardId: string): UserCard | undefined {
    return this.cards().find(c => c.userData.productChangedFromId === userCardId);
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
      activeData?.lastCliRequestDate !== undefined ||
      Object.values(activeData?.selectedCategories ?? {}).some(selected => selected.length > 0) ||
      Object.values(closedData ?? {}).some(value => value !== undefined) ||
      Object.values(productChangedData ?? {}).some(value => value !== undefined)
    );
  }

  getById(userCardId: string): UserCard | undefined {
    return this.cards().find(c => c.id === userCardId);
  }
}
