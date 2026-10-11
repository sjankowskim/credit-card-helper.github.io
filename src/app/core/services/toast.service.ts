import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  removing?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts = signal<Toast[]>([]);
  
  readonly TOAST_DURATION = 3000
  readonly toastsSignal = this.toasts.asReadonly();

  show(message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success'): void {
    const toast: Toast = {
      id: crypto.randomUUID(),
      message,
      type
    };

    this.toasts.update(current => [...current, toast]);

    // Auto-remove after 3 seconds
    setTimeout(() => {
      this.startRemoving(toast.id);
    }, this.TOAST_DURATION);
  }

  startRemoving(id: string): void {
    this.toasts.update(current => 
      current.map(toast => toast.id === id ? { ...toast, removing: true } : toast)
    );

    // Actually remove after animation completes (300ms)
    setTimeout(() => {
      this.remove(id);
    }, 300);
  }

  remove(id: string): void {
    this.toasts.update(current => current.filter(toast => toast.id !== id));
  }

  success(message: string): void {
    this.show(message, 'success');
  }

  info(message: string): void {
    this.show(message, 'info');
  }

  warning(message: string): void {
    this.show(message, 'warning');
  }

  error(message: string): void {
    this.show(message, 'error');
  }
}
