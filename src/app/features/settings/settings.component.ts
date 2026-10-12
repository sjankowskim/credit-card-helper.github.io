import { Component, computed, inject, signal } from '@angular/core';
import { StorageService } from '../../core/services/storage.service';
import { ToastService } from '../../core/services/toast.service';
import { ThemeService, type ThemePreference } from '../../core/services/theme.service';
import { toIsoDate, today } from '../../core/utils/date.utils';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-settings',
  imports: [ModalComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  private readonly storage = inject(StorageService);
  private readonly toastService = inject(ToastService);
  private readonly themeService = inject(ThemeService);

  readonly theme = this.themeService.preference;
  readonly themes: { id: ThemePreference; label: string }[] = [
    { id: 'system', label: 'System' },
    { id: 'light', label: 'Light' },
    { id: 'dark', label: 'Dark' }
  ];

  setTheme(theme: ThemePreference): void {
    this.themeService.set(theme);
  }

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

  /** The "delete all data" confirmation is open */
  readonly confirmingReset = signal(false);

  resetAll(): void {
    this.storage.resetAll();
    // The theme lives in its own key; this also puts the page back on the system theme
    this.themeService.set('system');
    this.confirmingReset.set(false);
    this.toastService.success('All data deleted. You are starting fresh.');
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
