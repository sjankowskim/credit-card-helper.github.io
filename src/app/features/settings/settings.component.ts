import { Component, computed, inject } from '@angular/core';
import { StorageService } from '../../core/services/storage.service';
import { ToastService } from '../../core/services/toast.service';
import { toIsoDate, today } from '../../core/utils/date.utils';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  private readonly storage = inject(StorageService);
  private readonly toastService = inject(ToastService);

  readonly cardCount = computed(() => this.storage.state().userCards.length);

  onExport(): void {
    const blob = new Blob([this.storage.exportJson()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `credit-card-helper-backup-${toIsoDate(today())}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  async onImport(input: HTMLInputElement): Promise<void> {
    const file = input.files?.[0];
    input.value = ''; // allow re-selecting the same file
    if (!file) return;

    const confirmed = confirm(
      `Replace all current data (${this.cardCount()} cards) with "${file.name}"? This cannot be undone.`
    );
    if (!confirmed) return;

    try {
      this.storage.importJson(await file.text());
      this.toastService.success(`Imported ${this.cardCount()} cards from backup`);
    } catch (e) {
      this.toastService.error(`Import failed: ${e instanceof Error ? e.message : String(e)}`);
    }
  }
}
