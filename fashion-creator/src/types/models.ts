export type GenderPresentation = "feminine" | "masculine" | "androgynous";
export type AgeGroup = "teen" | "20s" | "30s" | "40s" | "50plus";
export type BodyProfile = "slim" | "balanced" | "athletic" | "curvy" | "plus";

export type AiModelPreset = {
  id: string;
  slug: string;
  name: string;
  image: string;
  genderPresentation: GenderPresentation;
  ageGroup: AgeGroup;
  bodyProfile: BodyProfile;
  styleTags: string[];
  recommendedFor: string[];
  isFeatured: boolean;
  isDemo: boolean;
};

export type BodyType = "slim" | "balanced" | "athletic" | "curvy" | "solid";
export type Proportion = "upper-long" | "balanced" | "leg-long";
export type Width = "narrow" | "regular" | "wide";
export type Volume = "slim" | "regular" | "full";

export type BodySettings = {
  bodyType: BodyType;
  proportion: Proportion;
  shoulder: Width;
  arms: Volume;
  abdomen: Volume;
  lowerBody: Volume;
};

export const DEFAULT_BODY_SETTINGS: BodySettings = {
  bodyType: "balanced",
  proportion: "balanced",
  shoulder: "regular",
  arms: "regular",
  abdomen: "regular",
  lowerBody: "regular",
};

export type AvatarBasicInfo = {
  genderPresentation: GenderPresentation;
  ageGroup: AgeGroup;
  height?: number;
  weight?: number;
};

export type SavedAvatar = {
  id: string;
  name: string;
  createdAt: string;
  source: "preset" | "photo";
  previewImage: string;
  genderPresentation: GenderPresentation;
  ageGroup: AgeGroup;
  height?: number;
  weight?: number;
  bodySettings: BodySettings;
  isDemo: true;
};

export type SelectedModelType = "preset" | "avatar";

export type SelectedModel = {
  modelId: string;
  modelType: SelectedModelType;
  modelName: string;
  previewImage: string;
  bodyProfileSummary: string;
  styleTags: string[];
};
