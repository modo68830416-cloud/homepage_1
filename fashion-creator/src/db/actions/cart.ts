"use server";

import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { cartItems } from "@/db/schema";
import { requireUserId } from "@/db/actions/require-user";
import type { CartItem } from "@/types/commerce";

export async function getCartItemsRemote(): Promise<CartItem[]> {
  const userId = await requireUserId();
  const rows = await getDb().select().from(cartItems).where(eq(cartItems.userId, userId));
  return rows.map((row) => ({
    productId: row.productId,
    quantity: row.quantity,
    addedAt: row.addedAt.toISOString(),
  }));
}

export async function replaceCartItemsRemote(items: CartItem[]): Promise<void> {
  const userId = await requireUserId();
  const db = getDb();
  await db.delete(cartItems).where(eq(cartItems.userId, userId));
  if (items.length === 0) return;
  await db.insert(cartItems).values(
    items.map((item) => ({
      userId,
      productId: item.productId,
      quantity: item.quantity,
      addedAt: new Date(item.addedAt),
    })),
  );
}
