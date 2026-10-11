import { Component, input, output, inject, computed } from '@angular/core';
import { CardStatus, type Card, type RewardTier, type UserCardData, type UserSignUpBonus } from '../../../../core/models/card.model';
import { UserCardsService } from '../../../../core/services/user-cards.service';
import { ToastService } from '../../../../core/services/toast.service';
import { getCategoryName, type CategoryId } from '../../../../core/data/category.registry';
import { ALL_CARDS, CARD_MAP } from '../../../../core/data/cards';
import { ModalComponent } from '../../../../shared/modal/modal.component';
import { InlineEditFieldComponent } from '../../../../shared/inline-edit-field/inline-edit-field.component';
import {
  formatCurrency,
  formatRate,
  formatSpendingCap,
  getAnnualFee,
  getCardDisplayName,
  getEarnUnit,
  getNextAnniversary
} from '../../../../core/utils/card-display.utils';
import { formatDate, toIsoDate, today } from '../../../../core/utils/date.utils';
import { getQuarter } from '../../../../core/utils/reward-rate.utils';
import { createSignUpBonus } from '../../../../core/utils/sub.utils';

type InlineValue = string | number | undefined;

/**
 * Card details in a modal. With a `userCardId` it also shows and edits the user's
 * instance (status, dates, bonus categories); without one it shows the catalog card.
 */
@Component({
  selector: 'app-card-detail',
  imports: [ModalComponent, InlineEditFieldComponent],
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.scss'
})
export class CardDetailComponent {
  private readonly userCardsService = inject(UserCardsService);
  private readonly toastService = inject(ToastService);

  readonly card = input.required<Card>();
  readonly userCardId = input<string | null>(null);
  readonly closed = output<void>();
  /** Catalog view only: the user asked to add this card */
  readonly add = output<void>();
  /** Shows "Remove from wallet" for the user's card; the parent confirms and removes it */
  readonly allowRemove = input(false);
  readonly remove = output<void>();

  readonly CardStatus = CardStatus;
  readonly formatDate = formatDate;
  readonly formatCurrency = formatCurrency;
  readonly formatSpendingCap = formatSpendingCap;
  readonly getCategoryName = getCategoryName;

  readonly userCard = computed(() => {
    const id = this.userCardId();
    return id ? this.userCardsService.getById(id) : undefined;
  });
  readonly userData = computed<UserCardData>(() => this.userCard()?.userData ?? {});
  readonly status = computed(() => this.userData().status);
  readonly isOwned = computed(() => !!this.userCard() && !this.userCard()!.isWishlist);

  readonly title = computed(() => {
    const userCard = this.userCard();
    return userCard ? getCardDisplayName(userCard, this.card().name) : this.card().name;
  });

  readonly earnUnit = computed(() => getEarnUnit(this.card()));

  readonly annualFee = computed(() => {
    const userCard = this.userCard();
    return userCard ? getAnnualFee(userCard, this.card()) : this.card().annualFee;
  });

  readonly nextAnnualFeeDate = computed(() => {
    if (this.annualFee() === 0) return '';
    const next = getNextAnniversary(this.userData().accountStartDate);
    return next ? formatDate(toIsoDate(next)) : '';
  });

  // ---- Bonus category choices (active cards) ----

  /** A top-spend tier that picks one category (Custom Cash) gets a dropdown */
  readonly autoTopSpendTier = computed(() =>
    this.card().rewardTiers.find(t => t.behavior.type === 'AUTO_TOP_SPEND' && t.behavior.maxCategories === 1)
  );
  /** Pick-your-categories tiers, plus top-spend tiers covering several categories (Business Gold), get checkboxes */
  readonly userChoiceTiers = computed(() =>
    this.card().rewardTiers.filter(
      t => t.behavior.type === 'USER_CHOICE' || (t.behavior.type === 'AUTO_TOP_SPEND' && t.behavior.maxCategories > 1)
    )
  );
  readonly rotatingTiers = computed(() => this.card().rewardTiers.filter(t => t.behavior.type === 'ROTATING'));

  readonly hasCategoryChoices = computed(
    () => !!this.autoTopSpendTier() || this.userChoiceTiers().length > 0 || this.rotatingTiers().length > 0
  );

  // ---- Product change ----

  /** Product changes stay within the issuer */
  readonly productChangeOptions = computed(() =>
    ALL_CARDS.filter(c => c.issuer === this.card().issuer && c.id !== this.card().id)
  );

  readonly productChangedTo = computed(() => {
    const id = this.userData().productChangedData?.productChangedToCardId;
    return id ? CARD_MAP.get(id) : undefined;
  });

  /** The card this one's accounts were moved to, if the issuer transitioned it */
  readonly transitionedTo = computed(() => {
    const transition = this.card().transitionedTo;
    const card = transition && CARD_MAP.get(transition.cardId);
    return card && transition ? { name: card.name, startedOn: formatDate(transition.startedOn) } : undefined;
  });

  /** Cards whose accounts were moved to this one */
  readonly transitionedFrom = computed(() =>
    ALL_CARDS.filter(c => c.transitionedTo?.cardId === this.card().id).map(c => ({
      name: c.name,
      startedOn: formatDate(c.transitionedTo!.startedOn)
    }))
  );

  readonly productChangedFrom = computed(() => {
    const fromId = this.userData().productChangedFromId;
    const from = fromId ? this.userCardsService.getById(fromId) : undefined;
    const card = from && CARD_MAP.get(from.cardId);
    return from && card ? getCardDisplayName(from, card.name) : undefined;
  });

  // ---- Editing ----

  private patch(patch: Partial<UserCardData> | ((d: UserCardData) => Partial<UserCardData>)): void {
    const id = this.userCardId();
    if (id) this.userCardsService.patchUserData(id, patch);
  }

  setLabel(value: InlineValue): void {
    this.patch({ customLabel: value === undefined ? undefined : String(value) });
  }

  setOpenDate(value: InlineValue): void {
    this.patch({ accountStartDate: value === undefined ? undefined : String(value) });
  }

  setPlannedCloseDate(value: InlineValue): void {
    this.patch({ plannedCloseDate: value === undefined ? undefined : String(value) });
  }

  setAnnualFeeOverride(value: InlineValue): void {
    this.patch({ annualFeeOverride: value === undefined ? undefined : Number(value) });
  }

  setActiveField(field: 'paymentDueDate' | 'creditLimit', value: InlineValue): void {
    this.patch(d => ({ activeData: { ...d.activeData, [field]: value === undefined ? undefined : Number(value) } }));
  }

  setClosedDate(value: InlineValue): void {
    this.patch(d => ({ closedData: { ...d.closedData, closedDate: value === undefined ? undefined : String(value) } }));
  }

  setProductChangeDate(value: InlineValue): void {
    this.patch(d => ({
      productChangedData: { ...d.productChangedData, productChangeDate: value === undefined ? undefined : String(value) }
    }));
  }

  toggle(field: 'isChurnCard' | 'isAuthorizedUser'): void {
    this.patch(d => ({ [field]: !d[field] }));
  }

  startBonus(): void {
    this.patch({ signUpBonus: createSignUpBonus(this.card()) });
  }

  removeBonus(): void {
    this.patch({ signUpBonus: undefined });
  }

  /** Cleared fields fall back to a safe value; "spent" can be cleared */
  setBonusField(field: 'amount' | 'spendRequired' | 'windowMonths' | 'spent', value: InlineValue): void {
    const id = this.userCardId();
    if (!id) return;
    const number = value === undefined ? undefined : Number(value);
    const fallback = { amount: 0, spendRequired: 0, windowMonths: 1, spent: undefined }[field];
    const patch: Partial<UserSignUpBonus> = { [field]: number ?? fallback };
    this.userCardsService.patchSignUpBonus(id, patch);
  }

  setBonusEarnedDate(value: InlineValue): void {
    const id = this.userCardId();
    if (id) this.userCardsService.patchSignUpBonus(id, { earnedDate: value === undefined ? undefined : String(value) });
  }

  onStatusChange(value: string): void {
    const id = this.userCardId();
    if (!id) return;
    // A product change is undone by clearing "Changed to" first, so its linked card can be cleaned up
    if (this.status() === CardStatus.PRODUCT_CHANGED && this.productChangedTo()) {
      this.userCardsService.clearProductChange(id);
    }
    this.userCardsService.setStatus(id, value as CardStatus);
  }

  onProductChangeSelect(newCardId: string): void {
    const id = this.userCardId();
    if (!id) return;

    if (!newCardId) {
      const removed = this.userCardsService.clearProductChange(id);
      if (removed) this.toastService.info('Removed the linked card from your wallet');
      return;
    }

    const hadLinked = !!this.userCardsService.getProductChangedTo(id);
    this.userCardsService.productChange(id, newCardId);
    const name = CARD_MAP.get(newCardId)?.name ?? 'the new card';
    this.toastService.success(
      hadLinked ? `Linked card changed to ${name}` : `Added ${name} to your wallet with the same open date`
    );
  }

  onAutoTopSpendChange(categoryId: string): void {
    this.patch({ autoTopSpendCategory: categoryId || undefined });
  }

  getSelectedCategories(tier: RewardTier): CategoryId[] {
    return this.userData().activeData?.selectedCategories?.[tier.id] ?? [];
  }

  getMaxSelections(tier: RewardTier): number {
    switch (tier.behavior.type) {
      case 'USER_CHOICE':
        return tier.behavior.maxSelections;
      case 'AUTO_TOP_SPEND':
        return tier.behavior.maxCategories;
      default:
        return 0;
    }
  }

  toggleChoice(tier: RewardTier, categoryId: CategoryId, checked: boolean): void {
    this.patch(d => {
      const current = d.activeData?.selectedCategories?.[tier.id] ?? [];
      const next = checked ? [...current, categoryId] : current.filter(c => c !== categoryId);
      return {
        activeData: {
          ...d.activeData,
          selectedCategories: { ...d.activeData?.selectedCategories, [tier.id]: next }
        }
      };
    });
  }

  isActivated(tier: RewardTier): boolean {
    return this.userData().activeData?.activatedTierIds?.includes(tier.id) ?? false;
  }

  toggleActivated(tier: RewardTier): void {
    this.patch(d => {
      const current = d.activeData?.activatedTierIds ?? [];
      const next = current.includes(tier.id) ? current.filter(id => id !== tier.id) : [...current, tier.id];
      return { activeData: { ...d.activeData, activatedTierIds: next } };
    });
  }

  // ---- Display helpers ----

  formatTierRate(tier: RewardTier): string {
    return formatRate(tier.rewardRate, this.earnUnit());
  }

  describeBehavior(tier: RewardTier): string {
    const behavior = tier.behavior;
    switch (behavior.type) {
      case 'AUTOMATIC':
        return '';
      case 'USER_CHOICE':
        return `Choose up to ${behavior.maxSelections}`;
      case 'AUTO_TOP_SPEND':
        return `Your top ${behavior.maxCategories === 1 ? 'category' : `${behavior.maxCategories} categories`} each cycle`;
      case 'ROTATING': {
        const current = behavior.year === today().getFullYear() && behavior.quarter === getQuarter(today());
        return `Q${behavior.quarter} ${behavior.year}${current ? ' (this quarter)' : ''}${behavior.requiresActivation ? ', activation required' : ''}`;
      }
    }
  }
}
