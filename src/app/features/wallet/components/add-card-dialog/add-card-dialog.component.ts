import { Component, computed, input, output, signal } from '@angular/core';
import { ModalComponent } from '../../../../shared/modal/modal.component';
import { CardStatus, type Card, type UserCardData } from '../../../../core/models/card.model';
import type { WalletEntry } from '../../../../core/services/user-cards.service';
import { toIsoDate, today } from '../../../../core/utils/date.utils';

type OwnedStatus = typeof CardStatus.ACTIVE | typeof CardStatus.CLOSED;

/**
 * Collects the details for a card entering the wallet (open date, status,
 * sign-up bonus) so it doesn't have to be added first and edited later.
 * The sign-up bonus is prefilled from the catalog when the card has one.
 */
@Component({
  selector: 'app-add-card-dialog',
  imports: [ModalComponent],
  templateUrl: './add-card-dialog.component.html',
  styleUrl: './add-card-dialog.component.scss'
})
export class AddCardDialogComponent {
  readonly card = input.required<Card>();
  readonly added = output<WalletEntry>();
  readonly closed = output<void>();

  readonly maxDate = toIsoDate(today());

  readonly openDate = signal(this.maxDate);
  readonly status = signal<OwnedStatus>(CardStatus.ACTIVE);
  readonly closedDate = signal('');
  readonly label = signal('');

  /** Fields the user has edited; unedited fields show the catalog default */
  private readonly subEdits = signal<{
    track?: boolean;
    amount?: string;
    spendRequired?: string;
    windowMonths?: string;
  }>({});

  readonly trackSub = computed(() => this.subEdits().track ?? this.card().defaultSignUpBonus !== undefined);
  readonly subAmount = computed(() => this.subEdits().amount ?? String(this.card().defaultSignUpBonus?.amount ?? ''));
  readonly subSpend = computed(
    () => this.subEdits().spendRequired ?? String(this.card().defaultSignUpBonus?.spendRequired ?? '')
  );
  readonly subWindow = computed(() => this.subEdits().windowMonths ?? String(this.card().defaultSignUpBonus?.windowMonths ?? 3));
  readonly subCurrency = computed(() => this.card().defaultSignUpBonus?.currency ?? this.card().rewardsCurrency);

  readonly error = computed(() => {
    if (this.status() === CardStatus.CLOSED && this.closedDate() && this.closedDate() < this.openDate()) {
      return 'The closed date is before the open date.';
    }
    if (!this.trackSub()) return '';
    if (!(Number(this.subAmount()) > 0)) return 'Enter the bonus amount.';
    if (this.subSpend() === '' || !(Number(this.subSpend()) >= 0)) return 'Enter the spend required.';
    if (!(Number(this.subWindow()) >= 1)) return 'The spend window must be at least 1 month.';
    return '';
  });

  editSub(field: 'amount' | 'spendRequired' | 'windowMonths', value: string): void {
    this.subEdits.update(edits => ({ ...edits, [field]: value }));
  }

  setTrackSub(track: boolean): void {
    this.subEdits.update(edits => ({ ...edits, track }));
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
    if (this.trackSub()) {
      userData.signUpBonus = {
        amount: Number(this.subAmount()),
        currency: this.subCurrency(),
        spendRequired: Number(this.subSpend()),
        windowMonths: Number(this.subWindow())
      };
    }

    this.added.emit({ status: this.status(), userData });
  }
}
