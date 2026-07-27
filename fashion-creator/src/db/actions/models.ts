"use server";

import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { savedAvatars, selectedModel as selectedModelTable } from "@/db/schema";
import { requireUserId } from "@/db/actions/require-user";
import type { SavedAvatar, SelectedModel } from "@/types/models";

export async function getSavedAvatarsRemote(): Promise<SavedAvatar[]> {
  const userId = await requireUserId();
  const rows = await getDb().select().from(savedAvatars).where(eq(savedAvatars.userId, userId));
  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    createdAt: row.createdAt.toISOString(),
    source: row.source as SavedAvatar["source"],
    previewImage: row.previewImage,
    genderPresentation: row.genderPresentation as SavedAvatar["genderPresentation"],
    ageGroup: row.ageGroup as SavedAvatar["ageGroup"],
    height: row.height ?? undefined,
    weight: row.weight ?? undefined,
    bodySettings: row.bodySettings as SavedAvatar["bodySettings"],
    isDemo: true,
    photoBlobPathname: row.photoBlobPathname ?? undefined,
  }));
}

export async function replaceSavedAvatarsRemote(avatars: SavedAvatar[]): Promise<void> {
  const userId = await requireUserId();
  const db = getDb();
  await db.delete(savedAvatars).where(eq(savedAvatars.userId, userId));
  if (avatars.length === 0) return;
  await db.insert(savedAvatars).values(
    avatars.map((avatar) => ({
      id: avatar.id,
      userId,
      name: avatar.name,
      createdAt: new Date(avatar.createdAt),
      source: avatar.source,
      previewImage: avatar.previewImage,
      genderPresentation: avatar.genderPresentation,
      ageGroup: avatar.ageGroup,
      height: avatar.height ?? null,
      weight: avatar.weight ?? null,
      bodySettings: avatar.bodySettings,
      photoBlobPathname: avatar.photoBlobPathname ?? null,
    })),
  );
}

export async function getSelectedModelRemote(): Promise<SelectedModel | null> {
  const userId = await requireUserId();
  const [row] = await getDb().select().from(selectedModelTable).where(eq(selectedModelTable.userId, userId));
  if (!row) return null;
  return {
    modelId: row.modelId,
    modelType: row.modelType as SelectedModel["modelType"],
    modelName: row.modelName,
    previewImage: row.previewImage,
    bodyProfileSummary: row.bodyProfileSummary,
    styleTags: row.styleTags as string[],
  };
}

export async function setSelectedModelRemote(model: SelectedModel): Promise<void> {
  const userId = await requireUserId();
  await getDb()
    .insert(selectedModelTable)
    .values({
      userId,
      modelId: model.modelId,
      modelType: model.modelType,
      modelName: model.modelName,
      previewImage: model.previewImage,
      bodyProfileSummary: model.bodyProfileSummary,
      styleTags: model.styleTags,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: selectedModelTable.userId,
      set: {
        modelId: model.modelId,
        modelType: model.modelType,
        modelName: model.modelName,
        previewImage: model.previewImage,
        bodyProfileSummary: model.bodyProfileSummary,
        styleTags: model.styleTags,
        updatedAt: new Date(),
      },
    });
}
