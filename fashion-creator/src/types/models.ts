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
  // Set only for signed-in users who uploaded a real photo — points at a
  // private Vercel Blob object, never the photo bytes themselves. Absent
  // for Guest Mode and preset-based avatars.
  photoBlobPathname?: string;
  // The real AI-generated avatar image (public Blob URL), when generation
  // ran through the real AI Gateway provider instead of the DEMO seed path.
  previewImageUrl?: string;
};

export type SelectedModelType = "preset" | "avatar";

export type SelectedModel = {
  modelId: string;
  modelType: SelectedModelType;
  modelName: string;
  previewImage: string;
  // Set only when a real AI Gateway generation produced an actual displayable
  // image (signed-in users only — see RealAvatarProvider). previewImage stays
  // the seed used by PlaceholderArt for everyone else / as a fallback.
  previewImageUrl?: string;
  bodyProfileSummary: string;
  styleTags: string[];
};
