import { Component, computed, inject, input, output, signal } from '@angular/core';
import { ModalComponent } from '../../../../shared/modal/modal.component';
import {
  SearchableSelectComponent,
  type SearchableSelectGroup
} from '../../../../shared/searchable-select/searchable-select.component';
import { CardStatus, type Card, type UserCardData, type UserSignUpBonus } from '../../../../core/models/card.model';
import { UserCardsService, type ProductChangeOrigin, type WalletEntry } from '../../../../core/services/user-cards.service';
import { ALL_CARDS, CARD_MAP } from '../../../../core/data/cards';
import { getProductChangeSources } from '../../../../core/utils/product-change.utils';
import { getCardDisplayName } from '../../../../core/utils/card-display.utils';
import { toIsoDate, today } from '../../../../core/utils/date.utils';

type OwnedStatus = typeof CardStatus.ACTIVE | typeof CardStatus.CLOSED;
/** A new application, or a product change from another card */
type Origin = 'new' | 'product-change';

/** Where a tracked bonus stands */
type BonusOutcome = 'in-progress' | 'earned' | 'not-earned';

/** One product change in the card's history */
interface ChainStep {
  /** Tracks the step in the list */
  key: number;
  /** `wallet:<UserCard.id>` for a card in the wallet, `card:<Card.id>` for a catalog card, '' until picked */
  from: string;
  /** The date typed in; null shows the default */
  dateEdit: string | null;
  reason: string;
}

let nextStepKey = 0;
function newStep(): ChainStep {
  return { key: nextStepKey++, from: '', dateEdit: null, reason: '' };
}

function parseStep(from: string): { kind: 'wallet' | 'card' | ''; id: string } {
  const [kind, id = ''] = from.split(':');
  return kind === 'wallet' || kind === 'card' ? { kind, id } : { kind: '', id: '' };
}

/**
 * Collects the details for a card entering the wallet (open date, status,
 * sign-up bonus) so it doesn't have to be added first and edited later.
 * The sign-up bonus is prefilled from the catalog when the card has one.
 */
@Component({
  selector: 'app-add-card-dialog',
  imports: [ModalComponent, SearchableSelectComponent],
  templateUrl: './add-card-dialog.component.html',
  styleUrl: './add-card-dialog.component.scss'
})
export class AddCardDialogComponent {
  readonly card = input.required<Card>();
  readonly added = output<WalletEntry>();
  readonly closed = output<void>();

  private readonly userCardsService = inject(UserCardsService);

  readonly maxDate = toIsoDate(today());

  readonly origin = signal<Origin>('new');
  /** The product change history, newest first: steps[0] is the card this one was changed from */
  readonly steps = signal<ChainStep[]>([newStep()]);
  /** Lists every issuer's cards, for accounts moved between banks the catalog doesn't know about */
  readonly anyIssuer = signal(false);

  /** Open wallet cards not already changed to another card */
  private readonly openWalletCards = computed(() =>
    this.userCardsService
      .cards()
      .filter(c => !c.isWishlist && c.userData.status !== CardStatus.CLOSED && !this.userCardsService.getProductChangedTo(c.id))
  );

  /** Options, dates, and the card it changed to for each step */
  readonly stepViews = computed(() =>
    this.steps().map((step, index, steps) => {
      // Only the oldest step can be a wallet card, since a wallet card brings its own history
      const isOldest = index === steps.length - 1;
      const newer = index === 0 ? this.card() : CARD_MAP.get(parseStep(steps[index - 1].from).id);
      const sources = !newer
        ? []
        : this.anyIssuer()
          ? ALL_CARDS.filter(c => c.id !== newer.id)
          : getProductChangeSources(newer);

      const wallet = !isOldest
        ? []
        : this.openWalletCards()
            .filter(c => sources.some(source => source.id === c.cardId))
            .map(c => {
              const card = CARD_MAP.get(c.cardId)!;
              return { value: `wallet:${c.id}`, label: this.withIssuer(getCardDisplayName(c, card.name), card) };
            });
      const catalog = sources.map(c => ({ value: `card:${c.id}`, label: this.withIssuer(c.name, c) }));
      const groups: SearchableSelectGroup[] =
        wallet.length > 0
          ? [
              { label: 'In your wallet', options: wallet },
              { label: 'Not in your wallet', options: catalog }
            ]
          : [{ options: catalog }];

      return { step, index, isOldest, groups, newerName: newer?.name ?? 'the next card', date: this.stepDate(step, newer) };
    })
  );

  /** The oldest step's wallet card, when it is one */
  private readonly walletOrigin = computed(() => {
    const oldest = this.steps().at(-1);
    const parsed = oldest ? parseStep(oldest.from) : undefined;
    return parsed?.kind === 'wallet' ? this.userCardsService.getById(parsed.id) : undefined;
  });

  /** Another step can go before the oldest once it's a catalog card */
  readonly canAddEarlier = computed(() => {
    const oldest = this.steps().at(-1);
    return !!oldest && parseStep(oldest.from).kind === 'card';
  });

  /** The open date carries over from a wallet card that has one, since it's the same account */
  readonly openDateLocked = computed(() => this.origin() === 'product-change' && !!this.walletOrigin()?.userData.accountStartDate);
  private readonly openDateEdit = signal<string | null>(null);
  readonly openDate = computed(() => {
    if (this.openDateLocked()) return this.walletOrigin()!.userData.accountStartDate!;
    return this.openDateEdit() ?? (this.origin() === 'new' ? this.maxDate : '');
  });

  /** When this card took over: the newest product change */
  private readonly latestChangeDate = computed(() => (this.origin() === 'product-change' ? this.stepViews()[0]?.date : ''));
  readonly closedMin = computed(() => this.latestChangeDate() || this.openDate());

  readonly status = signal<OwnedStatus>(CardStatus.ACTIVE);
  readonly closedDate = signal('');
  readonly label = signal('');

  /**
   * The card a sign-up bonus belongs to: the card applied for. For a product change that's
   * the oldest card in the history, since getting a card by product change usually rules out
   * its bonus. Undefined when that's a wallet card (its bonus is tracked there) or not picked yet.
   */
  readonly bonusCard = computed(() => {
    if (this.origin() === 'new') return this.card();
    const oldest = this.steps().at(-1);
    const parsed = oldest ? parseStep(oldest.from) : undefined;
    return parsed?.kind === 'card' ? CARD_MAP.get(parsed.id) : undefined;
  });
  /** Name of the wallet card the history starts with, whose bonus is tracked on it */
  readonly walletOriginName = computed(() => {
    const userCard = this.walletOrigin();
    const card = userCard && CARD_MAP.get(userCard.cardId);
    return userCard && card ? getCardDisplayName(userCard, card.name) : '';
  });

  /** Fields the user has edited, for `cardId`; unedited fields show its catalog default */
  private readonly subEdits = signal<{
    cardId?: string;
    track?: boolean;
    amount?: string;
    spendRequired?: string;
    windowMonths?: string;
    outcome?: BonusOutcome;
    earnedDate?: string;
    notEarnedReason?: string;
  }>({});
  /** Edits made for a different bonus card are ignored */
  private readonly currentSubEdits = computed(() => {
    const edits = this.subEdits();
    return edits.cardId === this.bonusCard()?.id ? edits : {};
  });
  private readonly defaultBonus = computed(() => this.bonusCard()?.defaultSignUpBonus);

  /** Starts on for a new card with a public offer; off for a product change's history */
  readonly trackSub = computed(
    () =>
      !!this.bonusCard() &&
      (this.currentSubEdits().track ?? (this.origin() === 'new' && this.defaultBonus() !== undefined))
  );
  readonly subAmount = computed(() => this.currentSubEdits().amount ?? String(this.defaultBonus()?.amount ?? ''));
  readonly subSpend = computed(() => this.currentSubEdits().spendRequired ?? String(this.defaultBonus()?.spendRequired ?? ''));
  readonly subWindow = computed(() => this.currentSubEdits().windowMonths ?? String(this.defaultBonus()?.windowMonths ?? 3));
  readonly subOutcome = computed<BonusOutcome>(() => this.currentSubEdits().outcome ?? 'in-progress');
  readonly subEarnedDate = computed(() => (this.subOutcome() === 'earned' ? (this.currentSubEdits().earnedDate ?? '') : ''));
  readonly subNotEarnedReason = computed(() => this.currentSubEdits().notEarnedReason ?? '');
  readonly subCurrency = computed(() => this.defaultBonus()?.currency ?? this.bonusCard()?.rewardsCurrency ?? '');

  readonly error = computed(() => {
    if (this.origin() === 'product-change') {
      const views = this.stepViews();
      if (views.some(v => !v.step.from)) return views.length > 1 ? 'Choose a card for each product change.' : 'Choose the card you changed from.';
      // Oldest first, each dated change has to come on or after the one before it
      let previous = this.openDate();
      for (const view of [...views].reverse()) {
        if (view.date && previous && view.date < previous) {
          return previous === this.openDate()
            ? 'A product change date is before the account was opened.'
            : 'The product change dates are out of order.';
        }
        previous = view.date || previous;
      }
    }
    const since = this.latestChangeDate() || this.openDate();
    if (this.status() === CardStatus.CLOSED && this.closedDate() && since && this.closedDate() < since) {
      return this.latestChangeDate() ? 'The closed date is before the product change.' : 'The closed date is before the open date.';
    }
    if (!this.trackSub()) return '';
    if (!(Number(this.subAmount()) > 0)) return 'Enter the bonus amount.';
    if (this.subSpend() === '' || !(Number(this.subSpend()) >= 0)) return 'Enter the spend required.';
    if (!(Number(this.subWindow()) >= 1)) return 'The spend window must be at least 1 month.';
    if (this.subOutcome() === 'earned' && !this.subEarnedDate()) return 'Enter when you earned the bonus.';
    if (this.subEarnedDate() && this.openDate() && this.subEarnedDate() < this.openDate()) {
      return 'The bonus was earned before the account was opened.';
    }
    return '';
  });

  editSub(
    field: 'amount' | 'spendRequired' | 'windowMonths' | 'earnedDate' | 'notEarnedReason' | 'outcome' | 'track',
    value: string | boolean
  ): void {
    this.subEdits.set({ ...this.currentSubEdits(), cardId: this.bonusCard()?.id, [field]: value });
  }

  setOpenDate(value: string): void {
    this.openDateEdit.set(value);
  }

  /** Names other issuers' cards' issuer, since names like "Bilt Mastercard" don't say it */
  private withIssuer(name: string, card: Card): string {
    return card.issuer === this.card().issuer ? name : `${name} (${card.issuer})`;
  }

  /** A step's date, defaulting to the day the issuer started moving accounts when its card was moved to the newer one */
  private stepDate(step: ChainStep, newer: Card | undefined): string {
    if (step.dateEdit !== null) return step.dateEdit;
    const { kind, id } = parseStep(step.from);
    const cardId = kind === 'wallet' ? this.userCardsService.getById(id)?.cardId : id;
    const transition = cardId ? CARD_MAP.get(cardId)?.transitionedTo : undefined;
    return transition && transition.cardId === newer?.id ? transition.startedOn : '';
  }

  private updateStep(index: number, patch: Partial<ChainStep>): void {
    this.steps.update(steps => steps.map((step, i) => (i === index ? { ...step, ...patch } : step)));
  }

  setStepCard(index: number, from: string): void {
    // Steps before this one were picked to fit the old card, so they're dropped if it changes
    this.steps.update(steps => {
      const changed = steps[index].from !== from;
      const kept = changed ? steps.slice(0, index + 1) : steps;
      return kept.map((step, i) => (i === index ? { ...step, from } : step));
    });
  }

  setStepDate(index: number, value: string): void {
    this.updateStep(index, { dateEdit: value });
  }

  setStepReason(index: number, reason: string): void {
    this.updateStep(index, { reason });
  }

  addEarlierStep(): void {
    this.steps.update(steps => [...steps, newStep()]);
  }

  /** Removing a step also removes the steps before it, since they were picked to fit it */
  removeStep(index: number): void {
    this.steps.update(steps => steps.slice(0, index));
  }

  setAnyIssuer(anyIssuer: boolean): void {
    this.anyIssuer.set(anyIssuer);
    // Keep the steps up to the first pick that's no longer listed, with that pick cleared
    const views = this.stepViews();
    const firstUnlisted = views.findIndex(v => v.step.from && !v.groups.some(g => g.options.some(o => o.value === v.step.from)));
    if (firstUnlisted >= 0) {
      this.steps.update(steps => [...steps.slice(0, firstUnlisted), { ...steps[firstUnlisted], from: '' }]);
    }
  }

  setOrigin(value: string): void {
    this.origin.set(value === 'product-change' ? 'product-change' : 'new');
  }

  setStatus(value: string): void {
    this.status.set(value === CardStatus.CLOSED ? CardStatus.CLOSED : CardStatus.ACTIVE);
  }

  submit(event: Event): void {
    event.preventDefault();
    if (this.error()) return;

    const userData: Partial<UserCardData> = {
      accountStartDate: this.openDate() || undefined,
      customLabel: this.label().trim() || undefined
    };
    if (this.status() === CardStatus.CLOSED) {
      userData.closedData = { closedDate: this.closedDate() || undefined };
    }
    const signUpBonus: UserSignUpBonus | undefined = this.trackSub()
      ? {
          amount: Number(this.subAmount()),
          currency: this.subCurrency(),
          spendRequired: Number(this.subSpend()),
          windowMonths: Number(this.subWindow()),
          earnedDate: this.subEarnedDate() || undefined,
          notEarned:
            this.subOutcome() === 'not-earned'
              ? { date: toIsoDate(today()), reason: this.subNotEarnedReason().trim() || undefined }
              : undefined
        }
      : undefined;
    if (this.origin() === 'new') userData.signUpBonus = signUpBonus;

    // Nest the steps so each one's `earlier` is the step before it
    const productChange =
      this.origin() !== 'product-change'
        ? undefined
        : this.stepViews().reduceRight<ProductChangeOrigin | undefined>((earlier, view) => {
            const { kind, id } = parseStep(view.step.from);
            return {
              from: kind === 'wallet' ? { userCardId: id } : { cardId: id },
              date: view.date || undefined,
              reason: view.step.reason.trim() || undefined,
              // The bonus goes on the card applied for, the oldest one
              signUpBonus: view.isOldest ? signUpBonus : undefined,
              earlier
            };
          }, undefined);

    this.added.emit({ status: this.status(), userData, productChange });
  }
}
