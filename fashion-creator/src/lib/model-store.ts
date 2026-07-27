"use client";

// TODO before this leaves DEMO mode: signed upload URLs, encrypted private
// storage for photos, an automatic deletion policy, consent versioning, an
// audit log for avatar generation, account-deletion cascade, and a
// biometric/privacy legal review. Right now avatars persist only in
// localStorage as placeholder asset paths + settings — no photo bytes.

import { useSyncExternalStore } from "react";
import { createLocalStore } from "@/lib/local-store";
import type { SavedAvatar, SelectedModel } from "@/types/models";

const selectedModelStore = createLocalStore<SelectedModel | null>(
  "fashion-creator:selected-model",
  null,
);

const savedAvatarsStore = createLocalStore<SavedAvatar[]>("fashion-creator:saved-avatars", []);

export function useSelectedModel() {
  const selectedModel = useSyncExternalStore(
    selectedModelStore.subscribe,
    selectedModelStore.getSnapshot,
    selectedModelStore.getServerSnapshot,
  );

  return {
    selectedModel,
    selectModel: (model: SelectedModel) => selectedModelStore.set(model),
    clearSelection: () => selectedModelStore.clear(),
  };
}

export function useSavedAvatars() {
  const savedAvatars = useSyncExternalStore(
    savedAvatarsStore.subscribe,
    savedAvatarsStore.getSnapshot,
    savedAvatarsStore.getServerSnapshot,
  );

  function saveAvatar(avatar: SavedAvatar) {
    savedAvatarsStore.set([...savedAvatarsStore.getSnapshot(), avatar]);
  }

  function removeAvatar(id: string) {
    savedAvatarsStore.set(savedAvatarsStore.getSnapshot().filter((avatar) => avatar.id !== id));
  }

  return { savedAvatars, saveAvatar, removeAvatar };
}
