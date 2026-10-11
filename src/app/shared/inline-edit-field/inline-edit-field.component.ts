import { Component, ElementRef, computed, effect, input, output, signal, viewChild } from '@angular/core';
import { formatCurrency } from '../../core/utils/card-display.utils';
import { formatDate } from '../../core/utils/date.utils';

export type InlineEditType = 'text' | 'date' | 'number' | 'currency';

/**
 * Shows a value with edit and clear buttons; editing swaps in an input.
 * Emits `saved` with the new value, or undefined when cleared.
 * Enter saves, Escape cancels.
 */
@Component({
  selector: 'app-inline-edit-field',
  templateUrl: './inline-edit-field.component.html',
  styleUrl: './inline-edit-field.component.scss'
})
export class InlineEditFieldComponent {
  readonly value = input<string | number | undefined>();
  readonly type = input<InlineEditType>('text');
  readonly placeholder = input('');
  readonly min = input<number>();
  readonly max = input<number>();
  readonly emptyLabel = input('Not set');
  readonly saved = output<string | number | undefined>();

  readonly isEditing = signal(false);
  readonly draft = signal('');
  readonly error = signal('');

  private readonly editInput = viewChild<ElementRef<HTMLInputElement>>('editInput');

  constructor() {
    // Focus the input as soon as it appears
    effect(() => this.editInput()?.nativeElement.focus());
  }

  readonly inputType = computed(() => (this.type() === 'currency' ? 'number' : this.type()));

  readonly displayValue = computed(() => {
    const value = this.value();
    if (value === undefined || value === '') return '';
    switch (this.type()) {
      case 'date':
        return formatDate(String(value));
      case 'currency':
        return formatCurrency(Number(value));
      case 'number':
        return Number(value).toLocaleString('en-US');
      default:
        return String(value);
    }
  });

  startEditing(): void {
    this.draft.set(this.value()?.toString() ?? '');
    this.error.set('');
    this.isEditing.set(true);
  }

  cancel(): void {
    this.isEditing.set(false);
  }

  save(): void {
    const draft = this.draft().trim();
    if (draft === '') {
      this.emit(undefined);
      return;
    }
    if (this.inputType() !== 'number') {
      this.emit(draft);
      return;
    }

    const parsed = Number(draft);
    const min = this.min();
    const max = this.max();
    if (!Number.isFinite(parsed)) {
      this.error.set('Enter a number');
    } else if (min !== undefined && parsed < min) {
      this.error.set(`Must be at least ${min}`);
    } else if (max !== undefined && parsed > max) {
      this.error.set(`Must be at most ${max}`);
    } else {
      this.emit(parsed);
    }
  }

  clear(): void {
    this.saved.emit(undefined);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.save();
    } else if (event.key === 'Escape') {
      // Keep Escape from also closing a surrounding dialog
      event.preventDefault();
      event.stopPropagation();
      this.cancel();
    }
  }

  private emit(value: string | number | undefined): void {
    this.saved.emit(value);
    this.isEditing.set(false);
  }
}
