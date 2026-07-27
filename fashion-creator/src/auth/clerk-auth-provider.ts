import { auth } from "@clerk/nextjs/server";
import type { AuthProvider } from "@/auth/provider";

export class ClerkAuthProvider implements AuthProvider {
  readonly name = "clerk";

  async getCurrentUserId(): Promise<string | null> {
    const { userId } = await auth();
    return userId ?? null;
  }
}
