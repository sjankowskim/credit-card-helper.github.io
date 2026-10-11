// Node 22+ defines a global `localStorage` that is undefined unless Node runs with
// --localstorage-file, and it shadows jsdom's implementation. Install an in-memory one.
if (typeof globalThis.localStorage === 'undefined') {
  class MemoryStorage implements Storage {
    private items = new Map<string, string>();
    [name: string]: unknown;

    get length(): number {
      return this.items.size;
    }
    clear(): void {
      this.items.clear();
    }
    getItem(key: string): string | null {
      return this.items.get(key) ?? null;
    }
    key(index: number): string | null {
      return [...this.items.keys()][index] ?? null;
    }
    removeItem(key: string): void {
      this.items.delete(key);
    }
    setItem(key: string, value: string): void {
      this.items.set(key, String(value));
    }
  }

  const storage = new MemoryStorage();
  // Make Object.keys(localStorage) list stored keys, like a real Storage
  const proxy = new Proxy(storage, {
    ownKeys: (target) => [...(target as unknown as { items: Map<string, string> }).items.keys()],
    getOwnPropertyDescriptor: (target, key) =>
      typeof key === 'string' && target.getItem(key) !== null
        ? { enumerable: true, configurable: true, value: target.getItem(key) }
        : undefined
  });
  Object.defineProperty(globalThis, 'localStorage', { value: proxy, configurable: true, writable: true });
}
