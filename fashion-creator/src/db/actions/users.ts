"use server";

import { getDb } from "@/db";
import { users } from "@/db/schema";

export async function ensureUserRow(userId: string): Promise<void> {
  await getDb().insert(users).values({ id: userId }).onConflictDoNothing();
}
