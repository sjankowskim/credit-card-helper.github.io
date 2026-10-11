import { Component, ElementRef, afterNextRender, input, output, viewChild } from '@angular/core';

/**
 * Modal dialog built on the native <dialog> element, which provides focus
 * trapping and Escape-to-close. Render it with @if and remove it on `closed`.
 */
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  readonly title = input.required<string>();
  readonly width = input<'narrow' | 'wide'>('narrow');
  readonly closed = output<void>();

  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  constructor() {
    afterNextRender(() => {
      const dialog = this.dialog().nativeElement;
      // jsdom (unit tests) doesn't implement showModal
      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
      } else {
        dialog.setAttribute('open', '');
      }
    });
  }

  close(): void {
    this.closed.emit();
  }

  /** Clicks on the backdrop target the <dialog> itself; clicks on content target its children. */
  onDialogClick(event: MouseEvent): void {
    if (event.target === this.dialog().nativeElement) {
      this.close();
    }
  }

  /** Escape fires `cancel`; let the parent remove the dialog instead of the browser closing it. */
  onCancel(event: Event): void {
    event.preventDefault();
    this.close();
  }
}
