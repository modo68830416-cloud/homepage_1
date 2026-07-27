"use client";

// TODO before this leaves DEMO mode: signed upload URLs, an automatic
// deletion policy, consent versioning, an audit log for avatar generation,
// account-deletion cascade, and a biometric/privacy legal review. Signed-in
// avatars now sync to Postgres (settings + seed only) and photo uploads go
// to a private Blob store (see src/services/demo-avatar-service.ts) — but
// none of the TODOs above are implemented yet.

import { useSyncExternalStore } from "react";
import { useUser } from "@clerk/nextjs";
import { savedAvatarsRepository, selectedModelRepository } from "@/repositories/model-repository";
import { useCloudSync } from "@/lib/cloud-sync";
import {
  getSavedAvatarsRemote,
  getSelectedModelRemote,
  replaceSavedAvatarsRemote,
  setSelectedModelRemote,
} from "@/db/actions/models";
import type { SavedAvatar, SelectedModel } from "@/types/models";

export function useSelectedModel() {
  const { isSignedIn } = useUser();
  const selectedModel = useSyncExternalStore(
    selectedModelRepository.subscribe.bind(selectedModelRepository),
    selectedModelRepository.get.bind(selectedModelRepository),
    selectedModelRepository.getServerSnapshot.bind(selectedModelRepository),
  );

  useCloudSync<SelectedModel | null>({
    isSignedIn,
    local: selectedModel,
    setLocal: (value) => selectedModelRepository.set(value),
    isEmpty: (value) => value === null,
    load: getSelectedModelRemote,
    save: (value) => (value ? setSelectedModelRemote(value) : Promise.resolve()),
  });

  return {
    selectedModel,
    selectModel: (model: SelectedModel) => selectedModelRepository.set(model),
    clearSelection: () => selectedModelRepository.clear(),
  };
}

export function useSavedAvatars() {
  const { isSignedIn } = useUser();
  const savedAvatars = useSyncExternalStore(
    savedAvatarsRepository.subscribe.bind(savedAvatarsRepository),
    savedAvatarsRepository.getAll.bind(savedAvatarsRepository),
    savedAvatarsRepository.getServerSnapshot.bind(savedAvatarsRepository),
  );

  useCloudSync<SavedAvatar[]>({
    isSignedIn,
    local: savedAvatars,
    setLocal: (value) => savedAvatarsRepository.set(value),
    isEmpty: (value) => value.length === 0,
    load: getSavedAvatarsRemote,
    save: replaceSavedAvatarsRemote,
  });

  function saveAvatar(avatar: SavedAvatar) {
    savedAvatarsRepository.upsert(avatar, "end");
  }

  function removeAvatar(id: string) {
    savedAvatarsRepository.remove(id);
  }

  return { savedAvatars, saveAvatar, removeAvatar };
}
