import { ClerkAuthProvider } from "@/auth/clerk-auth-provider";
import type { AuthProvider } from "@/auth/provider";

const activeProvider: AuthProvider = new ClerkAuthProvider();

export async function getCurrentUserId(): Promise<string | null> {
  return activeProvider.getCurrentUserId();
}
