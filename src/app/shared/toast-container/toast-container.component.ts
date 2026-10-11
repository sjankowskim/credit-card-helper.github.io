import { Component, inject } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-toast-container',
  imports: [ToastComponent],
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.scss'
})
export class ToastContainerComponent {
  readonly toastService = inject(ToastService);

  readonly toasts = this.toastService.toastsSignal;
}
