"use client";

import { useSyncExternalStore } from "react";
import { createLocalStore } from "@/lib/local-store";
import type { ContentProject, ContentStudioState } from "@/types/content";
import { DEFAULT_STUDIO_STATE } from "@/types/content";

const MAX_PROJECTS = 30;

const projectsStore = createLocalStore<ContentProject[]>("fashion-creator:content-projects", []);

type Draft = { settings: ContentStudioState; updatedAt: string } | null;
const draftStore = createLocalStore<Draft>("fashion-creator:content-draft", null);

export function useContentProjects() {
  const projects = useSyncExternalStore(
    projectsStore.subscribe,
    projectsStore.getSnapshot,
    projectsStore.getServerSnapshot,
  );

  function upsertProject(project: ContentProject) {
    const current = projectsStore.getSnapshot();
    const exists = current.some((item) => item.id === project.id);
    const next = exists
      ? current.map((item) => (item.id === project.id ? project : item))
      : [project, ...current];
    projectsStore.set(next.slice(0, MAX_PROJECTS));
  }

  function removeProject(id: string) {
    projectsStore.set(projectsStore.getSnapshot().filter((item) => item.id !== id));
  }

  function duplicateProject(id: string) {
    const source = projectsStore.getSnapshot().find((item) => item.id === id);
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
    const current = projectsStore.getSnapshot();
    projectsStore.set(
      current.map((item) => (item.id === id ? { ...item, isFavorite: !item.isFavorite } : item)),
    );
  }

  function renameProject(id: string, title: string) {
    const current = projectsStore.getSnapshot();
    projectsStore.set(current.map((item) => (item.id === id ? { ...item, title } : item)));
  }

  return { projects, upsertProject, removeProject, duplicateProject, toggleFavorite, renameProject };
}

export function useContentDraft() {
  const draft = useSyncExternalStore(draftStore.subscribe, draftStore.getSnapshot, draftStore.getServerSnapshot);

  function saveDraft(settings: ContentStudioState) {
    draftStore.set({ settings, updatedAt: new Date().toISOString() });
  }

  function clearDraft() {
    draftStore.clear();
  }

  return { draft, saveDraft, clearDraft, DEFAULT_STUDIO_STATE };
}
