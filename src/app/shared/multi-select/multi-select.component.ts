import { Component, ElementRef, computed, inject, input, linkedSignal, output, signal } from '@angular/core';

export interface MultiSelectOption {
  value: string;
  label: string;
}

export interface MultiSelectGroup {
  /** Heading above the group's options; leave it out for a flat list */
  label?: string;
  options: MultiSelectOption[];
}

let nextId = 0;

/**
 * A dropdown button that opens a list of checkboxes. With nothing checked it means "all"
 * (`allLabel`); the button names one or two picks and counts more than that.
 */
@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.scss',
  host: {
    '(document:click)': 'onDocumentClick($event)',
    '(keydown.escape)': 'onEscape($event)'
  }
})
export class MultiSelectComponent {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly groups = input.required<MultiSelectGroup[]>();
  readonly selected = input<readonly string[]>([]);
  /** Shown when nothing is checked, e.g. 'All issuers' */
  readonly allLabel = input.required<string>();
  /** Plural noun for the count, e.g. 'issuers' in '3 issuers' */
  readonly countNoun = input('selected');
  /** Accessible name for the button */
  readonly label = input('');
  readonly selectedChange = output<string[]>();

  /** The checked values, updated right away on each click and reset whenever `selected` changes */
  private readonly checked = linkedSignal(() => this.selected());

  readonly panelId = `multi-select-${nextId++}`;
  readonly open = signal(false);

  readonly summary = computed(() => {
    const selected = this.checked();
    if (selected.length === 0) return this.allLabel();
    const labels = this.groups()
      .flatMap(g => g.options)
      .filter(o => selected.includes(o.value))
      .map(o => o.label);
    return labels.length <= 2 ? labels.join(', ') : `${labels.length} ${this.countNoun()}`;
  });

  readonly checkedCount = computed(() => this.checked().length);

  isChecked(value: string): boolean {
    return this.checked().includes(value);
  }

  toggle(value: string, checked: boolean): void {
    const current = this.checked();
    this.set(checked ? [...current, value] : current.filter(v => v !== value));
  }

  clear(): void {
    this.set([]);
  }

  private set(values: string[]): void {
    this.checked.set(values);
    this.selectedChange.emit(values);
  }

  /** Closes when a click lands outside this dropdown */
  onDocumentClick(event: MouseEvent): void {
    if (this.open() && !this.host.nativeElement.contains(event.target as Node)) this.open.set(false);
  }

  onEscape(event: Event): void {
    if (!this.open()) return;
    event.stopPropagation();
    this.open.set(false);
    this.host.nativeElement.querySelector<HTMLButtonElement>('.trigger')?.focus();
  }
}
