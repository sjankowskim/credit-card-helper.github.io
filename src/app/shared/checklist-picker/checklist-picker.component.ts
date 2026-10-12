import { Component, input, output } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

export interface ChecklistItem {
  id: string;
  label: string;
}

/** One group of checkboxes in the picker, e.g. one table's columns or one issuer's rules */
export interface ChecklistGroup {
  /** Identifies the group in `toggle` and `reset` */
  key: string;
  /** Shown above the checkboxes when the picker has several groups */
  title?: string;
  items: readonly ChecklistItem[];
  checked: readonly string[];
  /** Items that stay checked */
  required?: ReadonlySet<string>;
  isDefault: boolean;
}

export interface ChecklistToggle {
  key: string;
  id: string;
  checked: boolean;
}

/** Modal with groups of checkboxes, used to pick table columns and widget contents */
@Component({
  selector: 'app-checklist-picker',
  imports: [ModalComponent],
  templateUrl: './checklist-picker.component.html',
  styleUrl: './checklist-picker.component.scss'
})
export class ChecklistPickerComponent {
  readonly title = input.required<string>();
  readonly groups = input.required<ChecklistGroup[]>();
  readonly note = input('');

  readonly toggle = output<ChecklistToggle>();
  readonly reset = output<string>();
  readonly closed = output<void>();
}

/** Puts one group's checked items back to its defaults, leaving the other groups alone */
export function resetGroup(checked: readonly string[], groupIds: readonly string[], defaults: readonly string[]): string[] {
  const inGroup = new Set(groupIds);
  return [...checked.filter(id => !inGroup.has(id)), ...defaults.filter(id => inGroup.has(id))];
}

/** Whether one group's checked items match its defaults */
export function isGroupDefault(checked: readonly string[], groupIds: readonly string[], defaults: readonly string[]): boolean {
  const pick = (ids: readonly string[]) => new Set(ids.filter(id => groupIds.includes(id)));
  const a = pick(checked);
  const b = pick(defaults);
  return a.size === b.size && [...a].every(id => b.has(id));
}
