import { ListRepository, Repository } from "@/repositories/base-repository";
import type { SavedAvatar, SelectedModel } from "@/types/models";

export const selectedModelRepository = new Repository<SelectedModel | null>(
  "fashion-creator:selected-model",
  null,
);

export const savedAvatarsRepository = new ListRepository<SavedAvatar>(
  "fashion-creator:saved-avatars",
  [],
);
