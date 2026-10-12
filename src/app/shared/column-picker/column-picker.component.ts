import { Component, input, output } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import type { TableColumn } from '../../core/models/table-column.model';

/** One table's columns in the picker */
export interface ColumnPickerGroup {
  /** Identifies the table in `toggle` and `reset` */
  key: string;
  /** Shown above the checkboxes when the picker covers several tables */
  title?: string;
  columns: readonly TableColumn[];
  shown: readonly string[];
  required: ReadonlySet<string>;
  isDefault: boolean;
}

export interface ColumnToggle {
  key: string;
  id: string;
  shown: boolean;
}

/** Modal with a checkbox per column, for one or more tables */
@Component({
  selector: 'app-column-picker',
  imports: [ModalComponent],
  templateUrl: './column-picker.component.html',
  styleUrl: './column-picker.component.scss'
})
export class ColumnPickerComponent {
  readonly groups = input.required<ColumnPickerGroup[]>();
  readonly note = input('Pick the columns the table shows.');

  readonly toggle = output<ColumnToggle>();
  readonly reset = output<string>();
  readonly closed = output<void>();
}
