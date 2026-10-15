import { Component, computed, input, output, signal } from '@angular/core';

export interface SearchableSelectOption {
  value: string;
  label: string;
}

export interface SearchableSelectGroup {
  /** Heading above the group's options; left out when there's only one group */
  label?: string;
  options: SearchableSelectOption[];
}

let nextId = 0;

/**
 * A dropdown you can type into to filter its options. The list opens below the input,
 * in the page flow, so it isn't cut off inside a scrolling modal.
 */
@Component({
  selector: 'app-searchable-select',
  templateUrl: './searchable-select.component.html',
  styleUrl: './searchable-select.component.scss'
})
export class SearchableSelectComponent {
  readonly groups = input.required<SearchableSelectGroup[]>();
  readonly value = input('');
  readonly placeholder = input('Search...');
  /** Accessible name for the input, usually the visible label's text */
  readonly label = input('');
  readonly valueChange = output<string>();

  readonly listId = `searchable-select-${nextId++}`;

  readonly open = signal(false);
  readonly query = signal('');
  /** Index into `flatOptions` of the option arrow keys have moved to */
  readonly highlighted = signal(0);

  readonly selectedLabel = computed(
    () => this.groups().flatMap(g => g.options).find(o => o.value === this.value())?.label ?? ''
  );

  /** Every word typed has to appear in the label, in any order */
  readonly filteredGroups = computed(() => {
    const words = this.query().toLowerCase().split(/\s+/).filter(Boolean);
    return this.groups()
      .map(g => ({ ...g, options: g.options.filter(o => words.every(w => o.label.toLowerCase().includes(w))) }))
      .filter(g => g.options.length > 0);
  });

  readonly flatOptions = computed(() => this.filteredGroups().flatMap(g => g.options));

  /** Shows the query while searching and the chosen option otherwise */
  readonly inputText = computed(() => (this.open() ? this.query() : this.selectedLabel()));

  optionId(index: number): string {
    return `${this.listId}-${index}`;
  }

  indexOf(option: SearchableSelectOption): number {
    return this.flatOptions().indexOf(option);
  }

  show(): void {
    if (this.open()) return;
    this.query.set('');
    const selected = this.flatOptions().findIndex(o => o.value === this.value());
    this.highlighted.set(Math.max(0, selected));
    this.open.set(true);
  }

  onInput(text: string): void {
    this.query.set(text);
    this.highlighted.set(0);
    this.open.set(true);
  }

  pick(option: SearchableSelectOption): void {
    this.valueChange.emit(option.value);
    this.open.set(false);
  }

  onKeydown(event: KeyboardEvent): void {
    const count = this.flatOptions().length;
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        event.preventDefault();
        if (!this.open()) return this.show();
        if (count > 0) this.highlighted.update(i => (i + (event.key === 'ArrowDown' ? 1 : -1) + count) % count);
        this.scrollHighlightedIntoView();
        break;
      case 'Enter':
        if (!this.open()) return;
        // Keeps Enter from submitting the form while picking
        event.preventDefault();
        if (this.flatOptions()[this.highlighted()]) this.pick(this.flatOptions()[this.highlighted()]);
        break;
      case 'Escape':
        if (this.open()) {
          // Closes the list without closing the <dialog> around it, which closes on Escape's default action
          event.preventDefault();
          this.open.set(false);
        }
        break;
    }
  }

  private scrollHighlightedIntoView(): void {
    requestAnimationFrame(() => document.getElementById(this.optionId(this.highlighted()))?.scrollIntoView({ block: 'nearest' }));
  }
}
