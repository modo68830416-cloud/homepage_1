"use server";

import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { contentProjects } from "@/db/schema";
import { requireUserId } from "@/db/actions/require-user";
import type { ContentProject } from "@/types/content";

export async function getContentProjectsRemote(): Promise<ContentProject[]> {
  const userId = await requireUserId();
  const rows = await getDb().select().from(contentProjects).where(eq(contentProjects.userId, userId));
  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    sourceLookId: row.sourceLookId,
    format: row.format as ContentProject["format"],
    status: row.status as ContentProject["status"],
    thumbnailSeed: row.thumbnailSeed,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    settings: row.settings as ContentProject["settings"],
    output: row.output as ContentProject["output"],
    channelCopies: row.channelCopies as ContentProject["channelCopies"],
    isFavorite: row.isFavorite,
    isDemo: true,
  }));
}

export async function replaceContentProjectsRemote(projects: ContentProject[]): Promise<void> {
  const userId = await requireUserId();
  const db = getDb();
  await db.delete(contentProjects).where(eq(contentProjects.userId, userId));
  if (projects.length === 0) return;
  await db.insert(contentProjects).values(
    projects.map((project) => ({
      id: project.id,
      userId,
      title: project.title,
      sourceLookId: project.sourceLookId,
      format: project.format,
      status: project.status,
      thumbnailSeed: project.thumbnailSeed,
      createdAt: new Date(project.createdAt),
      updatedAt: new Date(project.updatedAt),
      settings: project.settings,
      output: project.output,
      channelCopies: project.channelCopies,
      isFavorite: project.isFavorite,
    })),
  );
}
