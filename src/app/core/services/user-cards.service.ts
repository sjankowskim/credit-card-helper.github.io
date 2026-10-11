import { Injectable, signal } from '@angular/core';
import type { UserCard } from '../models/card.model';
import { CardStatus } from '../models/card.model';

const STORAGE_KEY = 'user-cards';

@Injectable({
  providedIn: 'root'
})
export class UserCardsService {
  private readonly userCards = signal<UserCard[]>([]);

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        this.userCards.set(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse user cards from storage', e);
      }
    }
  }

  private saveToStorage(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.userCards()));
  }

  readonly cards = this.userCards.asReadonly();

  addCard(cardId: string, isWishlist: boolean = false, status: CardStatus = CardStatus.ACTIVE): void {
    // Get the next instance number for this card
    const sameCardInstances = this.userCards().filter(c => c.cardId === cardId);
    const nextInstanceNumber = sameCardInstances.length + 1;

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

    this.userCards.update(cards => [...cards, newUserCard]);
    this.saveToStorage();
  }

  removeCard(cardId: string): void {
    this.userCards.update(cards => cards.filter(c => c.cardId !== cardId));
    this.saveToStorage();
  }

  removeCardByUserCardId(userCardId: string): void {
    this.userCards.update(cards => cards.filter(c => c.id !== userCardId));
    this.saveToStorage();
  }

  setStatusByUserCardId(userCardId: string, status: CardStatus): void {
    this.userCards.update(cards => 
      cards.map(c => c.id === userCardId ? { 
        ...c, 
        userData: {
          ...c.userData,
          status,
          // Clear all status-specific data
          activeData: status === CardStatus.ACTIVE ? c.userData.activeData : undefined,
          closedData: status === CardStatus.CLOSED ? c.userData.closedData : undefined,
          productChangedData: status === CardStatus.PRODUCT_CHANGED ? c.userData.productChangedData : undefined
        }
      } : c)
    );
    this.saveToStorage();
  }

  toggleWishlistByUserCardId(userCardId: string): void {
    const userCard = this.userCards().find(c => c.id === userCardId);
    if (!userCard) return;

    const newIsWishlist = !userCard.isWishlist;

    if (!newIsWishlist && !userCard.userData.status) {
      // If the instance is neither wishlisted nor in portfolio, remove it
      this.userCards.update(cards => cards.filter(c => c.id !== userCardId));
    } else {
      this.userCards.update(cards => 
        cards.map(c => c.id === userCardId ? { 
          ...c, 
          isWishlist: newIsWishlist, 
          userData: {
            ...c.userData,
            status: newIsWishlist ? undefined : (c.userData.status || CardStatus.ACTIVE)
          }
        } : c)
      );
    }
    this.saveToStorage();
  }

  setAutoTopSpendCategory(cardId: string, categoryId: string | undefined): void {
    this.userCards.update(cards => 
      cards.map(c => c.cardId === cardId ? { ...c, userData: { ...c.userData, autoTopSpendCategory: categoryId } } : c)
    );
    this.saveToStorage();
  }

  setAutoTopSpendCategoryByUserCardId(userCardId: string, categoryId: string | undefined): void {
    this.userCards.update(cards => 
      cards.map(c => c.id === userCardId ? { ...c, userData: { ...c.userData, autoTopSpendCategory: categoryId } } : c)
    );
    this.saveToStorage();
  }

  setAccountStartDate(cardId: string, date: string | undefined): void {
    this.userCards.update(cards => 
      cards.map(c => c.cardId === cardId ? { ...c, userData: { ...c.userData, accountStartDate: date } } : c)
    );
    this.saveToStorage();
  }

  setAccountStartDateByUserCardId(userCardId: string, date: string | undefined): void {
    this.userCards.update(cards => 
      cards.map(c => c.id === userCardId ? { ...c, userData: { ...c.userData, accountStartDate: date } } : c)
    );
    this.saveToStorage();
  }

  setCustomLabel(cardId: string, label: string | undefined): void {
    this.userCards.update(cards => 
      cards.map(c => c.cardId === cardId ? { ...c, userData: { ...c.userData, customLabel: label } } : c)
    );
    this.saveToStorage();
  }

  setCustomLabelByUserCardId(userCardId: string, label: string | undefined): void {
    this.userCards.update(cards => 
      cards.map(c => c.id === userCardId ? { ...c, userData: { ...c.userData, customLabel: label } } : c)
    );
    this.saveToStorage();
  }

  setHitSub(cardId: string, hitSub: boolean): void {
    this.userCards.update(cards => 
      cards.map(c => c.cardId === cardId ? { ...c, userData: { ...c.userData, hitSub } } : c)
    );
    this.saveToStorage();
  }

  setHitSubByUserCardId(userCardId: string, hitSub: boolean): void {
    this.userCards.update(cards => 
      cards.map(c => c.id === userCardId ? { ...c, userData: { ...c.userData, hitSub } } : c)
    );
    this.saveToStorage();
  }

  setIsChurnCardByUserCardId(userCardId: string, isChurnCard: boolean | undefined): void {
    this.userCards.update(cards => 
      cards.map(c => c.id === userCardId ? { ...c, userData: { ...c.userData, isChurnCard } } : c)
    );
    this.saveToStorage();
  }

  setPaymentDueDateByUserCardId(userCardId: string, paymentDueDate: number | undefined): void {
    this.userCards.update(cards => 
      cards.map(c => c.id === userCardId ? { 
        ...c, 
        userData: { 
          ...c.userData, 
          activeData: { 
            ...c.userData.activeData, 
            paymentDueDate 
          } 
        } 
      } : c)
    );
    this.saveToStorage();
  }

  setCreditLimitByUserCardId(userCardId: string, creditLimit: number | undefined): void {
    this.userCards.update(cards => 
      cards.map(c => c.id === userCardId ? { 
        ...c, 
        userData: { 
          ...c.userData, 
          activeData: { 
            ...c.userData.activeData,
            creditLimit 
          } 
        } 
      } : c)
    );
    this.saveToStorage();
  }

  setClosedDateByUserCardId(userCardId: string, closedDate: string | undefined): void {
    this.userCards.update(cards => 
      cards.map(c => c.id === userCardId ? { 
        ...c, 
        userData: { 
          ...c.userData, 
          closedData: { 
            ...c.userData.closedData, 
            closedDate 
          } 
        } 
      } : c)
    );
    this.saveToStorage();
  }

  setProductChangeDateByUserCardId(userCardId: string, productChangeDate: string | undefined): void {
    this.userCards.update(cards => 
      cards.map(c => c.id === userCardId ? { 
        ...c, 
        userData: { 
          ...c.userData, 
          productChangedData: { 
            ...c.userData.productChangedData, 
            productChangeDate 
          } 
        } 
      } : c)
    );
    this.saveToStorage();
  }

  setProductChangedToCardIdByUserCardId(userCardId: string, productChangedToCardId: string | undefined): void {
    this.userCards.update(cards => 
      cards.map(c => c.id === userCardId ? { 
        ...c, 
        userData: { 
          ...c.userData, 
          productChangedData: { 
            ...c.userData.productChangedData, 
            productChangedToCardId 
          } 
        } 
      } : c)
    );
    this.saveToStorage();
  }

  setPlannedCloseDateByUserCardId(userCardId: string, plannedCloseDate: string | undefined): void {
    this.userCards.update(cards => 
      cards.map(c => c.id === userCardId ? { ...c, userData: { ...c.userData, plannedCloseDate } } : c)
    );
    this.saveToStorage();
  }

  /**
   * Checks if a user card has any actual user data set.
   * This is computed based on current state, not a dirty bit.
   */
  hasUserData(userCard: UserCard): boolean {
    const { userData } = userCard;
    
    // Check common fields
    if (userData.customLabel !== undefined) return true;
    if (userData.accountStartDate !== undefined) return true;
    if (userData.hitSub !== undefined) return true;
    if (userData.autoTopSpendCategory !== undefined) return true;
    if (userData.isChurnCard !== undefined) return true;
    if (userData.plannedCloseDate !== undefined) return true;
    
    // Check status-specific data
    if (userData.activeData) {
      if (userData.activeData.paymentDueDate !== undefined) return true;
      if (userData.activeData.creditLimit !== undefined) return true;
    }
    
    if (userData.closedData) {
      if (userData.closedData.closedDate !== undefined) return true;
    }
    
    if (userData.productChangedData) {
      if (userData.productChangedData.productChangeDate !== undefined) return true;
      if (userData.productChangedData.productChangedToCardId !== undefined) return true;
    }
    
    return false;
  }

  isCardInPortfolio(cardId: string): boolean {
    return this.userCards().some(c => c.cardId === cardId && !c.isWishlist);
  }

  isCardWishlisted(cardId: string): boolean {
    return this.userCards().some(c => c.cardId === cardId && c.isWishlist);
  }

  getUserCard(cardId: string): UserCard | undefined {
    return this.userCards().find(c => c.cardId === cardId);
  }

  getUserCardById(userCardId: string): UserCard | undefined {
    return this.userCards().find(c => c.id === userCardId);
  }
}
