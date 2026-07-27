// Swappable per Sprint-04 — every Server Action reads the current user
// through this interface, never by importing Clerk directly. Swapping auth
// providers later means writing a new class here, not touching call sites.
export interface AuthProvider {
  readonly name: string;
  getCurrentUserId(): Promise<string | null>;
}
