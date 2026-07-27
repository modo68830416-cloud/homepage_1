import { analyzeBodyDescription, getAvatarSeed, getGenerationSteps } from "@/lib/avatar-demo";
import { savedAvatarsRepository, selectedModelRepository } from "@/repositories/model-repository";
import type { AvatarBasicInfo, BodySettings, SavedAvatar, SelectedModel } from "@/types/models";

// UI talks to this service, never to the avatar repositories or avatar-demo
// helpers directly — this is the seam a real avatar-generation API slots
// into later without touching AvatarWizard or its steps.
export const DemoAvatarService = {
  getGenerationSteps,
  analyzeBodyDescription,

  buildPreviewSeed(basicInfo: AvatarBasicInfo, bodySettings: BodySettings): string {
    return getAvatarSeed(basicInfo.genderPresentation, bodySettings);
  },

  saveAvatar(input: {
    name: string;
    source: "photo" | "preset";
    basicInfo: AvatarBasicInfo;
    bodySettings: BodySettings;
    photoBlobPathname?: string;
    previewImageUrl?: string;
  }): SavedAvatar {
    const avatar: SavedAvatar = {
      id: `avatar-${Date.now()}`,
      name: input.name,
      createdAt: new Date().toISOString(),
      source: input.source,
      previewImage: getAvatarSeed(input.basicInfo.genderPresentation, input.bodySettings),
      genderPresentation: input.basicInfo.genderPresentation,
      ageGroup: input.basicInfo.ageGroup,
      height: input.basicInfo.height,
      weight: input.basicInfo.weight,
      bodySettings: input.bodySettings,
      isDemo: true,
      photoBlobPathname: input.photoBlobPathname,
      previewImageUrl: input.previewImageUrl,
    };
    savedAvatarsRepository.upsert(avatar, "end");
    return avatar;
  },

  removeAvatar(id: string): void {
    savedAvatarsRepository.remove(id);
  },

  selectAvatarAsModel(avatar: SavedAvatar): SelectedModel {
    const selection: SelectedModel = {
      modelId: avatar.id,
      modelType: "avatar",
      modelName: avatar.name,
      previewImage: avatar.previewImage,
      previewImageUrl: avatar.previewImageUrl,
      bodyProfileSummary: `${avatar.bodySettings.bodyType} · ${avatar.ageGroup}`,
      styleTags: [],
    };
    selectedModelRepository.set(selection);
    return selection;
  },
};
