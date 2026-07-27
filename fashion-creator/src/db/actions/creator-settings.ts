"use server";

import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { creatorBrandKit, creatorExportSettings, creatorSubscription } from "@/db/schema";
import { requireUserId } from "@/db/actions/require-user";
import type { BrandKitSettings, CreatorSubscriptionState, DefaultExportSettings } from "@/types/creator-settings";

export async function getBrandKitRemote(): Promise<BrandKitSettings | null> {
  const userId = await requireUserId();
  const [row] = await getDb().select().from(creatorBrandKit).where(eq(creatorBrandKit.userId, userId));
  if (!row) return null;
  return { brandName: row.brandName, color: row.color, ctaCopy: row.ctaCopy, disclosure: row.disclosure };
}

export async function setBrandKitRemote(settings: BrandKitSettings): Promise<void> {
  const userId = await requireUserId();
  await getDb()
    .insert(creatorBrandKit)
    .values({ userId, ...settings })
    .onConflictDoUpdate({ target: creatorBrandKit.userId, set: settings });
}

export async function getExportSettingsRemote(): Promise<DefaultExportSettings | null> {
  const userId = await requireUserId();
  const [row] = await getDb().select().from(creatorExportSettings).where(eq(creatorExportSettings.userId, userId));
  if (!row) return null;
  return {
    aspectRatio: row.aspectRatio as DefaultExportSettings["aspectRatio"],
    channel: row.channel,
    language: row.language,
    watermark: row.watermark,
    hashtags: row.hashtags,
  };
}

export async function setExportSettingsRemote(settings: DefaultExportSettings): Promise<void> {
  const userId = await requireUserId();
  await getDb()
    .insert(creatorExportSettings)
    .values({ userId, ...settings })
    .onConflictDoUpdate({ target: creatorExportSettings.userId, set: settings });
}

export async function getSubscriptionRemote(): Promise<CreatorSubscriptionState | null> {
  const userId = await requireUserId();
  const [row] = await getDb().select().from(creatorSubscription).where(eq(creatorSubscription.userId, userId));
  if (!row) return null;
  return {
    planName: row.planName,
    creditsRemaining: row.creditsRemaining,
    paymentMethod: row.paymentMethod as CreatorSubscriptionState["paymentMethod"],
  };
}

export async function setSubscriptionRemote(state: CreatorSubscriptionState): Promise<void> {
  const userId = await requireUserId();
  await getDb()
    .insert(creatorSubscription)
    .values({
      userId,
      planName: state.planName,
      creditsRemaining: state.creditsRemaining,
      paymentMethod: state.paymentMethod,
    })
    .onConflictDoUpdate({
      target: creatorSubscription.userId,
      set: {
        planName: state.planName,
        creditsRemaining: state.creditsRemaining,
        paymentMethod: state.paymentMethod,
      },
    });
}
