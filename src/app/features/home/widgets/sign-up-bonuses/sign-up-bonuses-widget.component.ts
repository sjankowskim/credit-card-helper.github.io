import { Component, computed, inject } from '@angular/core';
import { UserCardsService } from '../../../../core/services/user-cards.service';
import { BankBonusesService } from '../../../../core/services/bank-bonuses.service';
import { RewardsService } from '../../../../core/services/rewards.service';
import { CARD_MAP } from '../../../../core/data/cards';
import { compareUrgency, getSubProgress } from '../../../../core/utils/sub.utils';
import { compareBankBonusUrgency, getBankBonusProgress } from '../../../../core/utils/bank-bonus.utils';
import { formatCurrency } from '../../../../core/utils/card-display.utils';

interface BonusRow {
  name: string;
  detail: string;
  percent: number;
  daysLeft: number | null;
  behindPace: boolean;
}

/** Most bonuses listed before the rest are summarized */
const SHOWN = 4;

/** Card and bank bonuses in progress, most urgent first */
@Component({
  selector: 'app-sign-up-bonuses-widget',
  templateUrl: './sign-up-bonuses-widget.component.html',
  styleUrl: '../widget.scss'
})
export class SignUpBonusesWidgetComponent {
  private readonly userCardsService = inject(UserCardsService);
  private readonly bankBonusesService = inject(BankBonusesService);
  private readonly rewardsService = inject(RewardsService);

  readonly formatCurrency = formatCurrency;

  private readonly cardBonuses = computed(() =>
    this.userCardsService
      .cards()
      .flatMap(userCard => {
        const card = CARD_MAP.get(userCard.cardId);
        const bonus = userCard.userData.signUpBonus;
        return card && bonus && !userCard.isWishlist ? [getSubProgress(userCard, card, bonus)] : [];
      })
      .filter(sub => sub.state === 'in-progress')
      .sort(compareUrgency)
  );

  private readonly bankBonuses = computed(() =>
    this.bankBonusesService
      .bonuses()
      .map(bonus => getBankBonusProgress(bonus))
      .filter(progress => progress.state === 'in-progress')
      .sort(compareBankBonusUrgency)
  );

  readonly spendRemaining = computed(() => this.cardBonuses().reduce((sum, sub) => sum + sub.remaining, 0));

  readonly rows = computed<BonusRow[]>(() => {
    const cards = this.cardBonuses().map(sub => ({
      name: this.rewardsService.getName(sub.userCard),
      detail:
        sub.remaining > 0
          ? `${formatCurrency(sub.spent)} of ${formatCurrency(sub.bonus.spendRequired)} spent`
          : 'Spend met, waiting for the bonus to post',
      percent: sub.bonus.spendRequired > 0 ? Math.min(100, (sub.spent / sub.bonus.spendRequired) * 100) : 100,
      daysLeft: sub.daysLeft,
      behindPace: sub.behindPace
    }));
    const banks = this.bankBonuses().map(progress => ({
      name: `${progress.bonus.bank} ${progress.bonus.accountName}`,
      detail: progress.requirementMet ? 'Requirement met, waiting for the bonus to post' : progress.bonus.requirement,
      percent: progress.percent,
      daysLeft: progress.daysLeft,
      behindPace: progress.behindPace
    }));
    return [...cards, ...banks].sort((a, b) => (a.daysLeft ?? Infinity) - (b.daysLeft ?? Infinity));
  });

  readonly shown = computed(() => this.rows().slice(0, SHOWN));
  readonly hiddenCount = computed(() => this.rows().length - this.shown().length);
}
