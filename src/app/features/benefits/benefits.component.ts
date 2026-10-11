import { Component, signal } from '@angular/core';
import { CreditsComponent } from './components/credits/credits.component';
import { ReferralsComponent } from './components/referrals/referrals.component';

type BenefitsTab = 'credits' | 'referrals';

@Component({
  selector: 'app-benefits',
  imports: [CreditsComponent, ReferralsComponent],
  templateUrl: './benefits.component.html'
})
export class BenefitsComponent {
  readonly tabs: { id: BenefitsTab; label: string }[] = [
    { id: 'credits', label: 'Credits & retention' },
    { id: 'referrals', label: 'Referrals' }
  ];
  readonly tab = signal<BenefitsTab>('credits');
}
