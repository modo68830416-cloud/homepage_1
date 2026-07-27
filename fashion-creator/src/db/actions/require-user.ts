import { getCurrentUserId } from "@/auth";
import { ensureUserRow } from "@/db/actions/users";

// Every Server Action in src/db/actions calls this first. Guest visitors
// never reach these functions from the UI, but the guard stays here too —
// a Server Action is a public HTTP endpoint regardless of who calls it.
export async function requireUserId(): Promise<string> {
  const userId = await getCurrentUserId();
  if (!userId) throw new Error("Not authenticated");
  await ensureUserRow(userId);
  return userId;
}
