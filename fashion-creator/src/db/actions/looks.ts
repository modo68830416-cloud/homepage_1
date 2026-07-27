"use server";

import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { savedLooks } from "@/db/schema";
import { requireUserId } from "@/db/actions/require-user";
import type { Look } from "@/types/studio";

export async function getSavedLooksRemote(): Promise<Look[]> {
  const userId = await requireUserId();
  const rows = await getDb().select().from(savedLooks).where(eq(savedLooks.userId, userId));
  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    modelId: row.modelId,
    modelName: row.modelName,
    productIds: row.productIds as string[],
    totalPrice: row.totalPrice,
    createdAt: row.createdAt.toISOString(),
    isDemo: true,
  }));
}

export async function replaceSavedLooksRemote(looks: Look[]): Promise<void> {
  const userId = await requireUserId();
  const db = getDb();
  await db.delete(savedLooks).where(eq(savedLooks.userId, userId));
  if (looks.length === 0) return;
  await db.insert(savedLooks).values(
    looks.map((look) => ({
      id: look.id,
      userId,
      name: look.name,
      modelId: look.modelId,
      modelName: look.modelName,
      productIds: look.productIds,
      totalPrice: look.totalPrice,
      createdAt: new Date(look.createdAt),
    })),
  );
}
