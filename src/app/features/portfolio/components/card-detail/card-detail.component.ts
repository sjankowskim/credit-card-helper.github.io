import { Component, input, output, inject, computed, signal } from '@angular/core';
import type { Card } from '../../../../core/models/card.model';
import type { UserCard } from '../../../../core/models/card.model';
import { CardStatus } from '../../../../core/models/card.model';
import { UserCardsService } from '../../../../core/services/user-cards.service';
import { CATEGORY_REGISTRY } from '../../../../core/data/category.registry';
import { ALL_CARDS } from '../../../../core/data/cards';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.scss'
})
export class CardDetailComponent {
  private readonly userCardsService = inject(UserCardsService);
  
  readonly card = input.required<Card>();
  readonly userCardId = input<string | null>(null);
  readonly close = output<void>();

  readonly userCard = computed(() => {
    if (!this.userCardId()) return null;
    return this.userCardsService.getUserCardById(this.userCardId()!);
  });

  readonly status = computed(() => {
    return this.userCard()?.userData.status;
  });

  readonly hasAutoTopSpend = computed(() => {
    return this.card().rewardTiers.some(tier => tier.behavior.type === 'AUTO_TOP_SPEND');
  });

  readonly autoTopSpendCategories = computed(() => {
    const tier = this.card().rewardTiers.find(tier => tier.behavior.type === 'AUTO_TOP_SPEND');
    return tier?.eligibleCategories || [];
  });

  readonly selectedCategory = computed(() => {
    return this.userCard()?.userData.autoTopSpendCategory;
  });

  readonly customLabel = computed(() => {
    return this.userCard()?.userData.customLabel;
  });

  readonly accountStartDate = computed(() => {
    return this.userCard()?.userData.accountStartDate;
  });

  readonly hitSub = computed(() => {
    return this.userCard()?.userData.hitSub;
  });

  readonly isChurnCard = computed(() => {
    return this.userCard()?.userData.isChurnCard;
  });

  readonly paymentDueDate = computed(() => {
    return this.userCard()?.userData.activeData?.paymentDueDate;
  });

  readonly creditLimit = computed(() => {
    return this.userCard()?.userData.activeData?.creditLimit;
  });

  readonly closedDate = computed(() => {
    return this.userCard()?.userData.closedData?.closedDate;
  });

  readonly productChangeDate = computed(() => {
    return this.userCard()?.userData.productChangedData?.productChangeDate;
  });

  readonly productChangedToCardId = computed(() => {
    return this.userCard()?.userData.productChangedData?.productChangedToCardId;
  });

  readonly productChangedToCard = computed(() => {
    const cardId = this.productChangedToCardId();
    if (!cardId) return null;
    return ALL_CARDS.find(card => card.id === cardId);
  });

  readonly plannedCloseDate = computed(() => {
    return this.userCard()?.userData.plannedCloseDate;
  });

  readonly isEditingLabel = signal(false);
  readonly isEditingAccountDate = signal(false);
  readonly isEditingPaymentDueDate = signal(false);
  readonly isEditingCreditLimit = signal(false);
  readonly isEditingClosedDate = signal(false);
  readonly isEditingProductChangeDate = signal(false);
  readonly isEditingPlannedCloseDate = signal(false);
  readonly tempLabel = signal('');
  readonly tempAccountDate = signal('');
  readonly tempPaymentDueDate = signal('');
  readonly tempCreditLimit = signal('');
  readonly tempClosedDate = signal('');
  readonly tempProductChangeDate = signal('');
  readonly tempPlannedCloseDate = signal('');
  readonly productChangeCardSearch = signal('');
  readonly isProductChangeDropdownOpen = signal(false);

  readonly filteredCardsForProductChange = computed(() => {
    const search = this.productChangeCardSearch().toLowerCase();
    return ALL_CARDS.filter(card => 
      card.id !== this.card().id && // Exclude the current card
      (card.name.toLowerCase().includes(search) ||
       card.issuer.toLowerCase().includes(search))
    );
  });

  onCategoryChange(categoryId: string): void {
    if (this.userCardId()) {
      this.userCardsService.setAutoTopSpendCategoryByUserCardId(this.userCardId()!, categoryId);
    }
  }

  getCategoryName(categoryId: string): string {
    return CATEGORY_REGISTRY[categoryId]?.name || categoryId;
  }

  onEditLabel(): void {
    this.tempLabel.set(this.customLabel() || '');
    this.isEditingLabel.set(true);
  }

  onSaveLabel(): void {
    if (this.userCardId()) {
      this.userCardsService.setCustomLabelByUserCardId(this.userCardId()!, this.tempLabel() || undefined);
    }
    this.isEditingLabel.set(false);
  }

  onCancelLabel(): void {
    this.isEditingLabel.set(false);
  }

  onUndoLabel(): void {
    if (this.userCardId()) {
      this.userCardsService.setCustomLabelByUserCardId(this.userCardId()!, undefined);
      this.tempLabel.set('');
    }
  }

  onEditAccountDate(): void {
    this.tempAccountDate.set(this.accountStartDate() || '');
    this.isEditingAccountDate.set(true);
  }

  onSaveAccountDate(): void {
    if (this.userCardId()) {
      this.userCardsService.setAccountStartDateByUserCardId(this.userCardId()!, this.tempAccountDate() || undefined);
    }
    this.isEditingAccountDate.set(false);
  }

  onCancelAccountDate(): void {
    this.isEditingAccountDate.set(false);
  }

  onUndoAccountDate(): void {
    if (this.userCardId()) {
      this.userCardsService.setAccountStartDateByUserCardId(this.userCardId()!, undefined);
    }
  }

  onToggleHitSub(): void {
    const current = this.hitSub();
    if (this.userCardId()) {
      this.userCardsService.setHitSubByUserCardId(this.userCardId()!, !current);
    }
  }

  onStatusChange(status: CardStatus): void {
    if (this.userCardId()) {
      const currentStatus = this.status();
      
      // If changing from active to closed or product-changed, clear payment due date and credit limit
      if (currentStatus === CardStatus.ACTIVE && (status === CardStatus.CLOSED || status === CardStatus.PRODUCT_CHANGED)) {
        this.userCardsService.setPaymentDueDateByUserCardId(this.userCardId()!, undefined);
        this.userCardsService.setCreditLimitByUserCardId(this.userCardId()!, undefined);
      }
      
      this.userCardsService.setStatusByUserCardId(this.userCardId()!, status);
    }
  }

  onToggleChurnCard(): void {
    const current = this.isChurnCard();
    if (this.userCardId()) {
      this.userCardsService.setIsChurnCardByUserCardId(this.userCardId()!, !current);
    }
  }

  onEditPaymentDueDate(): void {
    this.tempPaymentDueDate.set(this.paymentDueDate()?.toString() || '');
    this.isEditingPaymentDueDate.set(true);
  }

  onSavePaymentDueDate(): void {
    if (this.userCardId()) {
      const value = this.tempPaymentDueDate() ? parseInt(this.tempPaymentDueDate(), 10) : undefined;
      if (value !== undefined && (value < 1 || value > 31)) {
        return; // Invalid day of month
      }
      this.userCardsService.setPaymentDueDateByUserCardId(this.userCardId()!, value);
    }
    this.isEditingPaymentDueDate.set(false);
  }

  onCancelPaymentDueDate(): void {
    this.isEditingPaymentDueDate.set(false);
  }

  onUndoPaymentDueDate(): void {
    if (this.userCardId()) {
      this.userCardsService.setPaymentDueDateByUserCardId(this.userCardId()!, undefined);
    }
  }

  onEditCreditLimit(): void {
    this.tempCreditLimit.set(this.creditLimit()?.toString() || '');
    this.isEditingCreditLimit.set(true);
  }

  onSaveCreditLimit(): void {
    if (this.userCardId()) {
      const value = this.tempCreditLimit() ? parseFloat(this.tempCreditLimit()) : undefined;
      this.userCardsService.setCreditLimitByUserCardId(this.userCardId()!, value);
    }
    this.isEditingCreditLimit.set(false);
  }

  onCancelCreditLimit(): void {
    this.isEditingCreditLimit.set(false);
  }

  onUndoCreditLimit(): void {
    if (this.userCardId()) {
      this.userCardsService.setCreditLimitByUserCardId(this.userCardId()!, undefined);
    }
  }

  onEditClosedDate(): void {
    this.tempClosedDate.set(this.closedDate() || '');
    this.isEditingClosedDate.set(true);
  }

  onSaveClosedDate(): void {
    if (this.userCardId()) {
      this.userCardsService.setClosedDateByUserCardId(this.userCardId()!, this.tempClosedDate() || undefined);
    }
    this.isEditingClosedDate.set(false);
  }

  onCancelClosedDate(): void {
    this.isEditingClosedDate.set(false);
  }

  onUndoClosedDate(): void {
    if (this.userCardId()) {
      this.userCardsService.setClosedDateByUserCardId(this.userCardId()!, undefined);
    }
  }

  onEditProductChangeDate(): void {
    this.tempProductChangeDate.set(this.productChangeDate() || '');
    this.isEditingProductChangeDate.set(true);
  }

  onSaveProductChangeDate(): void {
    if (this.userCardId()) {
      this.userCardsService.setProductChangeDateByUserCardId(this.userCardId()!, this.tempProductChangeDate() || undefined);
    }
    this.isEditingProductChangeDate.set(false);
  }

  onCancelProductChangeDate(): void {
    this.isEditingProductChangeDate.set(false);
  }

  onUndoProductChangeDate(): void {
    if (this.userCardId()) {
      this.userCardsService.setProductChangeDateByUserCardId(this.userCardId()!, undefined);
    }
  }

  onProductChangeCardSelect(cardId: string): void {
    if (this.userCardId()) {
      this.userCardsService.setProductChangedToCardIdByUserCardId(this.userCardId()!, cardId);
    }
    this.isProductChangeDropdownOpen.set(false);
    this.productChangeCardSearch.set('');
  }

  onProductChangeCardClear(): void {
    if (this.userCardId()) {
      this.userCardsService.setProductChangedToCardIdByUserCardId(this.userCardId()!, undefined);
    }
  }

  toggleProductChangeDropdown(): void {
    this.isProductChangeDropdownOpen.set(!this.isProductChangeDropdownOpen());
  }

  onProductChangeCardSearch(query: string): void {
    this.productChangeCardSearch.set(query);
  }

  onEditPlannedCloseDate(): void {
    this.tempPlannedCloseDate.set(this.plannedCloseDate() || '');
    this.isEditingPlannedCloseDate.set(true);
  }

  onSavePlannedCloseDate(): void {
    if (this.userCardId()) {
      this.userCardsService.setPlannedCloseDateByUserCardId(this.userCardId()!, this.tempPlannedCloseDate() || undefined);
    }
    this.isEditingPlannedCloseDate.set(false);
  }

  onCancelPlannedCloseDate(): void {
    this.isEditingPlannedCloseDate.set(false);
  }

  onUndoPlannedCloseDate(): void {
    if (this.userCardId()) {
      this.userCardsService.setPlannedCloseDateByUserCardId(this.userCardId()!, undefined);
    }
  }
}
