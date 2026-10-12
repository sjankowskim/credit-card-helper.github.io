import { Injectable, computed, inject } from '@angular/core';
import { StorageService } from './storage.service';
import type { Subscription } from '../models/subscription.model';

/** Recurring charges the user tracks by hand */
@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {
  private readonly storage = inject(StorageService);

  readonly subscriptions = computed(() => this.storage.state().subscriptions ?? []);

  add(subscription: Omit<Subscription, 'id'>): void {
    this.storage.update('subscriptions', list => [...(list ?? []), { ...subscription, id: crypto.randomUUID() }]);
  }

  update(id: string, changes: Partial<Omit<Subscription, 'id'>>): void {
    this.storage.update('subscriptions', list => (list ?? []).map(s => (s.id === id ? { ...s, ...changes } : s)));
  }

  remove(id: string): void {
    this.storage.update('subscriptions', list => (list ?? []).filter(s => s.id !== id));
  }
}
