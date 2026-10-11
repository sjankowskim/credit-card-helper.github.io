import { Component, computed, inject, signal } from '@angular/core';
import { BenefitsService, type CreditStatus } from '../../../../core/services/benefits.service';
import { RewardsService } from '../../../../core/services/rewards.service';
import { ToastService } from '../../../../core/services/toast.service';
import { UserCardsService } from '../../../../core/services/user-cards.service';
import { InlineEditFieldComponent } from '../../../../shared/inline-edit-field/inline-edit-field.component';
import type { Benefit } from '../../../../core/models/card.model';
import type { RetentionOffer } from '../../../../core/models/benefits.model';
import { formatCurrency, getAnnualFee } from '../../../../core/utils/card-display.utils';
import { formatDate, toIsoDate, today } from '../../../../core/utils/date.utils';
import { getPeriodLabel } from '../../../../core/utils/benefit.utils';

/** Unused credits ending within this many days show under "Expiring soon" */
const EXPIRING_DAYS = 14;

@Component({
  selector: 'app-benefits-credits',
  imports: [InlineEditFieldComponent],
  templateUrl: './credits.component.html',
  styleUrl: './credits.component.scss'
})
export class CreditsComponent {
  private readonly benefitsService = inject(BenefitsService);
  private readonly rewardsService = inject(RewardsService);
  private readonly toastService = inject(ToastService);
  private readonly userCardsService = inject(UserCardsService);

  readonly formatCurrency = formatCurrency;
  readonly formatDate = formatDate;
  readonly getPeriodLabel = getPeriodLabel;
  readonly EXPIRING_DAYS = EXPIRING_DAYS;
  readonly year = today().getFullYear();

  readonly credits = this.benefitsService.credits;
  readonly retentionOffers = this.benefitsService.retentionOffers;

  readonly cardOptions = computed(() =>
    this.benefitsService.activeCards().map(({ userCard }) => ({ id: userCard.id, name: this.rewardsService.getName(userCard) }))
  );

  readonly expiringSoon = computed(() =>
    this.credits()
      .filter(c => c.remaining > 0 && c.period.daysLeft !== null && c.period.daysLeft <= EXPIRING_DAYS)
      .sort((a, b) => a.period.daysLeft! - b.period.daysLeft!)
  );

  /** Active cards that have credits, each with what they've captured this year */
  readonly cardGroups = computed(() =>
    this.benefitsService.activeCards().flatMap(({ userCard, card }) => {
      const credits = this.credits().filter(c => c.userCard.id === userCard.id);
      if (credits.length === 0) return [];
      return [{
        userCard,
        name: this.rewardsService.getName(userCard),
        credits,
        captured: this.benefitsService.capturedIn(userCard.id, this.year),
        annualFee: getAnnualFee(userCard, card)
      }];
    })
  );

  readonly stats = computed(() => ({
    captured: this.benefitsService.activeCards().reduce((sum, { userCard }) => sum + this.benefitsService.capturedIn(userCard.id, this.year), 0),
    available: this.credits().reduce((sum, c) => sum + c.remaining, 0),
    expiring: this.expiringSoon().reduce((sum, c) => sum + c.remaining, 0)
  }));

  getName(credit: CreditStatus): string {
    return this.rewardsService.getName(credit.userCard);
  }

  describeWindow(credit: CreditStatus): string {
    const { end, daysLeft } = credit.period;
    if (!end || daysLeft === null) return 'No expiration';
    return `Through ${formatDate(toIsoDate(end))} · ${daysLeft} ${daysLeft === 1 ? 'day' : 'days'} left`;
  }

  setUsed(credit: CreditStatus, value: string | number | undefined): void {
    this.benefitsService.setUsed(credit, value === undefined ? undefined : Number(value));
  }

  useAll(credit: CreditStatus): void {
    this.benefitsService.setUsed(credit, credit.benefit.amount);
  }

  removeCustom(credit: CreditStatus): void {
    this.benefitsService.removeCustom(credit.userCard.id, credit.benefit.id);
    this.toastService.info(`Removed ${credit.benefit.name}`);
  }

  // ---- Add credit ----
  readonly creditCardId = signal('');
  readonly creditName = signal('');
  readonly creditAmount = signal('');
  readonly creditPeriod = signal<Benefit['period']>('ONE_TIME');
  readonly creditResetBasis = signal<Benefit['resetBasis']>('CALENDAR');
  readonly creditExpires = signal('');

  readonly canAddCredit = computed(
    () => !!this.creditCardId() && !!this.creditName().trim() && Number(this.creditAmount()) > 0
  );

  addCredit(event: Event): void {
    event.preventDefault();
    if (!this.canAddCredit()) return;
    const period = this.creditPeriod();
    this.benefitsService.addCustom(this.creditCardId(), {
      name: this.creditName().trim(),
      amount: Number(this.creditAmount()),
      period,
      resetBasis: period === 'ONE_TIME' ? 'CALENDAR' : this.creditResetBasis(),
      expiresOn: period === 'ONE_TIME' ? this.creditExpires() || undefined : undefined
    });
    this.creditName.set('');
    this.creditAmount.set('');
    this.creditExpires.set('');
    this.toastService.success('Credit added');
  }

  // ---- Retention offers ----
  readonly offerCardId = signal('');
  readonly offerDate = signal(toIsoDate(today()));
  readonly offerDescription = signal('');
  readonly offerValue = signal('');
  readonly offerAccepted = signal(true);

  readonly canAddOffer = computed(
    () => !!this.offerCardId() && !!this.offerDescription().trim() && this.offerValue() !== '' && Number(this.offerValue()) >= 0
  );

  addOffer(event: Event): void {
    event.preventDefault();
    if (!this.canAddOffer()) return;
    this.benefitsService.addRetentionOffer({
      userCardId: this.offerCardId(),
      date: this.offerDate(),
      description: this.offerDescription().trim(),
      value: Number(this.offerValue()),
      accepted: this.offerAccepted()
    });
    this.offerDescription.set('');
    this.offerValue.set('');
    this.toastService.success('Retention offer logged');
  }

  getOfferCardName(offer: RetentionOffer): string {
    // The card may have closed since; look it up among all cards
    const userCard = this.userCardsService.getById(offer.userCardId);
    return userCard ? this.rewardsService.getName(userCard) : 'Removed card';
  }

  toggleAccepted(offer: RetentionOffer): void {
    this.benefitsService.updateRetentionOffer(offer.id, { accepted: !offer.accepted });
  }

  removeOffer(offer: RetentionOffer): void {
    this.benefitsService.removeRetentionOffer(offer.id);
  }
}
