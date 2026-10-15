import { Component, input, output, inject, computed } from '@angular/core';
import { CardStatus, type Card, type RewardTier, type UserCardData, type UserSignUpBonus } from '../../../../core/models/card.model';
import { UserCardsService } from '../../../../core/services/user-cards.service';
import { ToastService } from '../../../../core/services/toast.service';
import { getCategoryName, type CategoryId } from '../../../../core/data/category.registry';
import { ALL_CARDS, CARD_MAP } from '../../../../core/data/cards';
import { ModalComponent } from '../../../../shared/modal/modal.component';
import { OfferHistoryChartComponent } from '../../../../shared/offer-history-chart/offer-history-chart.component';
import { OFFER_HISTORY } from '../../../../core/data/offer-history';
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
import { CREDIT_LEVEL_LABELS } from '../../../../core/utils/card-filters.utils';
import { getQuarter } from '../../../../core/utils/reward-rate.utils';
import { createSignUpBonus } from '../../../../core/utils/sub.utils';
import { getAccountChain, getCardHistory } from '../../../../core/utils/card-history.utils';
import { getProductChangeTargets } from '../../../../core/utils/product-change.utils';

type FieldValue = string | number | undefined;

/**
 * Card details in a modal. With a `userCardId` it also shows and edits the user's
 * instance (status, dates, bonus categories); without one it shows the catalog card.
 */
@Component({
  selector: 'app-card-detail',
  imports: [ModalComponent, OfferHistoryChartComponent],
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.scss'
})
export class CardDetailComponent {
  readonly creditLabels = CREDIT_LEVEL_LABELS;
  /** Researched sign-up bonus history, when there is any */
  readonly offerHistory = computed(() => OFFER_HISTORY[this.card().id] ?? []);
  /** Visa and Mastercard cards have a network tier; Amex, Discover, and store cards don't */
  readonly usesTiers = computed(() => this.card().network === 'VISA' || this.card().network === 'MASTERCARD');

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

  /** The issuer's other cards, plus the card its accounts were moved to if the issuer transitioned it */
  readonly productChangeOptions = computed(() => getProductChangeTargets(this.card()));

  readonly productChangedTo = computed(() => {
    const id = this.userData().productChangedData?.productChangedToCardId;
    return id ? CARD_MAP.get(id) : undefined;
  });

  /** The wallet card this one was product-changed into, once linked; it can't be swapped from here */
  readonly linkedCardName = computed(() => {
    const id = this.userCardId();
    const linked = id ? this.userCardsService.getProductChangedTo(id) : undefined;
    const card = linked && CARD_MAP.get(linked.cardId);
    return linked && card ? getCardDisplayName(linked, card.name) : undefined;
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

  /** The card this one was product-changed from, for the date it became this card */
  readonly productChangedFromCard = computed(() => {
    const fromId = this.userData().productChangedFromId;
    return fromId ? this.userCardsService.getById(fromId) : undefined;
  });

  /** The card the account was opened as, and its open date, when this card came from a product change */
  readonly openedAs = computed(() => {
    const id = this.userCardId();
    if (!id || !this.userData().productChangedFromId) return undefined;
    const first = getAccountChain(id, this.userCardsService.cards())[0];
    const card = first && CARD_MAP.get(first.cardId);
    return first && card
      ? { name: getCardDisplayName(first, card.name), date: first.userData.accountStartDate }
      : undefined;
  });

  readonly productChangedFrom = computed(() => {
    const fromId = this.userData().productChangedFromId;
    const from = fromId ? this.userCardsService.getById(fromId) : undefined;
    const card = from && CARD_MAP.get(from.cardId);
    return from && card ? getCardDisplayName(from, card.name) : undefined;
  });

  /** Another card in this account's history that holds its sign-up bonus, e.g. the card applied for before a product change */
  readonly bonusTrackedOn = computed(() => {
    const id = this.userCardId();
    if (!id) return undefined;
    const holder = getAccountChain(id, this.userCardsService.cards()).find(c => c.id !== id && c.userData.signUpBonus);
    const card = holder && CARD_MAP.get(holder.cardId);
    return holder && card ? getCardDisplayName(holder, card.name) : undefined;
  });

  /** The account's life across product changes, for owned cards */
  readonly history = computed(() => {
    const id = this.userCardId();
    if (!id || !this.isOwned()) return [];
    return getCardHistory(
      id,
      this.userCardsService.cards(),
      userCard => getCardDisplayName(userCard, CARD_MAP.get(userCard.cardId)?.name ?? userCard.cardId),
      cardId => CARD_MAP.get(cardId)
    );
  });

  // ---- Editing ----

  /** A text or date input's value for saving; empty clears the field */
  text(event: Event): string | undefined {
    return (event.target as HTMLInputElement).value.trim() || undefined;
  }

  /**
   * A number input's value for saving; empty clears the field. Out-of-range values are
   * pulled into range (and shown that way), so a typo like 45 for a due day saves as 31.
   */
  number(event: Event, min?: number, max?: number): number | undefined {
    const input = event.target as HTMLInputElement;
    if (input.value.trim() === '') return undefined;
    let value = Number(input.value);
    if (!Number.isFinite(value)) value = min ?? 0;
    if (min !== undefined) value = Math.max(min, value);
    if (max !== undefined) value = Math.min(max, value);
    input.value = String(value);
    return value;
  }

  private patch(patch: Partial<UserCardData> | ((d: UserCardData) => Partial<UserCardData>)): void {
    const id = this.userCardId();
    if (id) this.userCardsService.patchUserData(id, patch);
  }

  setLabel(value: FieldValue): void {
    this.patch({ customLabel: value === undefined ? undefined : String(value) });
  }

  setOpenDate(value: FieldValue): void {
    const id = this.userCardId();
    if (id) this.userCardsService.patchAccount(id, { accountStartDate: value === undefined ? undefined : String(value) });
  }

  /** On a card from a product change, the date is stored on the card it was changed from */
  setBecameThisCardDate(value: FieldValue): void {
    const fromId = this.userData().productChangedFromId;
    if (!fromId) return;
    this.userCardsService.patchUserData(fromId, d => ({
      productChangedData: { ...d.productChangedData, productChangeDate: value === undefined ? undefined : String(value) }
    }));
  }

  setPlannedCloseDate(value: FieldValue): void {
    this.patch({ plannedCloseDate: value === undefined ? undefined : String(value) });
  }

  setAnnualFeeOverride(value: FieldValue): void {
    this.patch({ annualFeeOverride: value === undefined ? undefined : Number(value) });
  }

  setActiveField(field: 'paymentDueDate' | 'creditLimit', value: FieldValue): void {
    this.patch(d => ({ activeData: { ...d.activeData, [field]: value === undefined ? undefined : Number(value) } }));
  }

  setLastCliRequestDate(value: FieldValue): void {
    this.patch(d => ({
      activeData: { ...d.activeData, lastCliRequestDate: value === undefined ? undefined : String(value) }
    }));
  }

  setClosedDate(value: FieldValue): void {
    this.patch(d => ({ closedData: { ...d.closedData, closedDate: value === undefined ? undefined : String(value) } }));
  }

  setProductChangeDate(value: FieldValue): void {
    this.patch(d => ({
      productChangedData: { ...d.productChangedData, productChangeDate: value === undefined ? undefined : String(value) }
    }));
  }

  setClosedReason(value: FieldValue): void {
    this.patch(d => ({ closedData: { ...d.closedData, reason: value === undefined ? undefined : String(value) } }));
  }

  setProductChangeReason(value: FieldValue): void {
    this.patch(d => ({
      productChangedData: { ...d.productChangedData, reason: value === undefined ? undefined : String(value) }
    }));
  }

  toggle(field: 'isChurnCard' | 'isAuthorizedUser'): void {
    const id = this.userCardId();
    if (!id) return;
    const value = !this.userData()[field] || undefined;
    // Authorized user is about the account, so it follows through product changes
    if (field === 'isAuthorizedUser') this.userCardsService.patchAccount(id, { isAuthorizedUser: value });
    else this.patch({ [field]: value });
  }

  startBonus(): void {
    this.patch({ signUpBonus: createSignUpBonus(this.card()) });
  }

  removeBonus(): void {
    this.patch({ signUpBonus: undefined });
  }

  /** Cleared fields fall back to a safe value; "spent" can be cleared */
  setBonusField(field: 'amount' | 'spendRequired' | 'windowMonths' | 'spent', value: FieldValue): void {
    const id = this.userCardId();
    if (!id) return;
    const number = value === undefined ? undefined : Number(value);
    const fallback = { amount: 0, spendRequired: 0, windowMonths: 1, spent: undefined }[field];
    const patch: Partial<UserSignUpBonus> = { [field]: number ?? fallback };
    this.userCardsService.patchSignUpBonus(id, patch);
  }

  /** Where the tracked bonus stands, for the "Bonus status" field */
  readonly bonusOutcome = computed(() => {
    const bonus = this.userData().signUpBonus;
    return bonus?.earnedDate ? 'earned' : bonus?.notEarned ? 'not-earned' : 'in-progress';
  });

  /** Earned and didn't-get-it start on today; the date or reason can be changed after */
  setBonusOutcome(outcome: string): void {
    const id = this.userCardId();
    if (!id) return;
    const date = toIsoDate(today());
    this.userCardsService.patchSignUpBonus(id, {
      earnedDate: outcome === 'earned' ? date : undefined,
      notEarned: outcome === 'not-earned' ? { date } : undefined
    });
  }

  setNotEarnedReason(value: FieldValue): void {
    const id = this.userCardId();
    const notEarned = this.userData().signUpBonus?.notEarned;
    if (id && notEarned) {
      this.userCardsService.patchSignUpBonus(id, {
        notEarned: { ...notEarned, reason: value === undefined ? undefined : String(value) }
      });
    }
  }

  setBonusEarnedDate(value: FieldValue): void {
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
