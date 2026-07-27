"use client";

import { useSyncExternalStore } from "react";
import { useUser } from "@clerk/nextjs";
import { contentDraftRepository, contentRepository } from "@/repositories/content-repository";
import { useCloudSync } from "@/lib/cloud-sync";
import { getContentProjectsRemote, replaceContentProjectsRemote } from "@/db/actions/content";
import type { ContentProject, ContentStudioState } from "@/types/content";
import { DEFAULT_STUDIO_STATE } from "@/types/content";

export function useContentProjects() {
  const { isSignedIn } = useUser();
  const projects = useSyncExternalStore(
    contentRepository.subscribe.bind(contentRepository),
    contentRepository.getAll.bind(contentRepository),
    contentRepository.getServerSnapshot.bind(contentRepository),
  );

  useCloudSync<ContentProject[]>({
    isSignedIn,
    local: projects,
    setLocal: (value) => contentRepository.set(value),
    isEmpty: (value) => value.length === 0,
    load: getContentProjectsRemote,
    save: replaceContentProjectsRemote,
  });

  function upsertProject(project: ContentProject) {
    contentRepository.upsert(project);
  }

  function removeProject(id: string) {
    contentRepository.remove(id);
  }

  function duplicateProject(id: string) {
    const source = contentRepository.getById(id);
    if (!source) return null;
    const copy: ContentProject = {
      ...source,
      id: `project-${Date.now()}`,
      title: `${source.title} (복사본)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    upsertProject(copy);
    return copy;
  }

  function toggleFavorite(id: string) {
    contentRepository.update(id, (item) => ({ ...item, isFavorite: !item.isFavorite }));
  }

  function renameProject(id: string, title: string) {
    contentRepository.update(id, (item) => ({ ...item, title }));
  }

  return { projects, upsertProject, removeProject, duplicateProject, toggleFavorite, renameProject };
}

export function useContentDraft() {
  const draft = useSyncExternalStore(
    contentDraftRepository.subscribe.bind(contentDraftRepository),
    contentDraftRepository.get.bind(contentDraftRepository),
    contentDraftRepository.getServerSnapshot.bind(contentDraftRepository),
  );

  function saveDraft(settings: ContentStudioState) {
    contentDraftRepository.set({ settings, updatedAt: new Date().toISOString() });
  }

  function clearDraft() {
    contentDraftRepository.clear();
  }

  return { draft, saveDraft, clearDraft, DEFAULT_STUDIO_STATE };
}
