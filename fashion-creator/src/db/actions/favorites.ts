"use server";

import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { favoriteCreators, favoriteProducts } from "@/db/schema";
import { requireUserId } from "@/db/actions/require-user";

export async function getFavoriteProductsRemote(): Promise<string[]> {
  const userId = await requireUserId();
  const rows = await getDb().select().from(favoriteProducts).where(eq(favoriteProducts.userId, userId));
  return rows.map((row) => row.productId);
}

export async function replaceFavoriteProductsRemote(productIds: string[]): Promise<void> {
  const userId = await requireUserId();
  const db = getDb();
  await db.delete(favoriteProducts).where(eq(favoriteProducts.userId, userId));
  if (productIds.length === 0) return;
  await db.insert(favoriteProducts).values(productIds.map((productId) => ({ userId, productId })));
}

export async function getFavoriteCreatorsRemote(): Promise<string[]> {
  const userId = await requireUserId();
  const rows = await getDb().select().from(favoriteCreators).where(eq(favoriteCreators.userId, userId));
  return rows.map((row) => row.creatorId);
}

export async function replaceFavoriteCreatorsRemote(creatorIds: string[]): Promise<void> {
  const userId = await requireUserId();
  const db = getDb();
  await db.delete(favoriteCreators).where(eq(favoriteCreators.userId, userId));
  if (creatorIds.length === 0) return;
  await db.insert(favoriteCreators).values(creatorIds.map((creatorId) => ({ userId, creatorId })));
}
