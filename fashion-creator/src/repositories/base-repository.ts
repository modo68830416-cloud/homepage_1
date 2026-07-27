import { createLocalStore } from "@/lib/local-store";

// Every domain repository sits on top of this — the only file allowed to
// call createLocalStore directly. Screens and services talk to repositories,
// never to localStorage, so the persistence backend can be swapped for a
// real API/database later (Sprint-04) without touching call sites.
export class Repository<T> {
  protected readonly store: ReturnType<typeof createLocalStore<T>>;

  constructor(key: string, fallback: T) {
    this.store = createLocalStore<T>(key, fallback);
  }

  get(): T {
    return this.store.getSnapshot();
  }

  getServerSnapshot(): T {
    return this.store.getServerSnapshot();
  }

  set(value: T): void {
    this.store.set(value);
  }

  clear(): void {
    this.store.clear();
  }

  subscribe(callback: () => void): () => void {
    return this.store.subscribe(callback);
  }
}

export type Identifiable = { id: string };

// Convenience base for the common "array of records with an id" shape.
export class ListRepository<T extends Identifiable> extends Repository<T[]> {
  constructor(key: string, fallback: T[] = []) {
    super(key, fallback);
  }

  getAll(): T[] {
    return this.get();
  }

  getById(id: string): T | undefined {
    return this.get().find((item) => item.id === id);
  }

  add(item: T, position: "start" | "end" = "start"): void {
    const current = this.get();
    this.set(position === "start" ? [item, ...current] : [...current, item]);
  }

  upsert(item: T, position: "start" | "end" = "start"): void {
    const current = this.get();
    const exists = current.some((existing) => existing.id === item.id);
    if (exists) {
      this.set(current.map((existing) => (existing.id === item.id ? item : existing)));
    } else {
      this.add(item, position);
    }
  }

  update(id: string, updater: (item: T) => T): void {
    this.set(this.get().map((item) => (item.id === id ? updater(item) : item)));
  }

  remove(id: string): void {
    this.set(this.get().filter((item) => item.id !== id));
  }
}
