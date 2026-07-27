import type { ContentSourceLook, ContentStudioState, GeneratedContent } from "@/types/content";
import type { AvatarBasicInfo, BodySettings } from "@/types/models";
import type { Product } from "@/types";

// Every Provider interface below is what a real backend (OpenAI, Gemini,
// Flux, Kling, Runway, Fal, Replicate, ...) implements later. The Gateway
// only ever depends on these interfaces — never on a concrete provider — so
// swapping the DEMO implementation for a real one never touches UI code.

export interface AvatarProvider {
  readonly name: string;
  generate(input: {
    basicInfo: AvatarBasicInfo;
    bodySettings: BodySettings;
    // Real providers only — the DEMO provider ignores this and stays
    // seed-based. When present, a real provider edits this photo instead of
    // generating from text alone.
    photoFile?: File;
  }): Promise<{ previewImage: string; steps: string[] }>;
}

export interface TryOnProvider {
  readonly name: string;
  apply(input: { modelPreviewImage: string; productIds: string[] }): Promise<{ previewImage: string }>;
}

export interface ImageProvider {
  readonly name: string;
  generate(input: {
    settings: ContentStudioState;
    sourceLook: ContentSourceLook;
    projectId: string;
  }): Promise<GeneratedContent>;
}

export interface VideoProvider {
  readonly name: string;
  generate(input: {
    settings: ContentStudioState;
    sourceLook: ContentSourceLook;
    projectId: string;
  }): Promise<GeneratedContent>;
}

export type PromptInput = {
  modelName?: string | null;
  productNames: string[];
  style: string;
  background: string;
  camera: string;
  motion?: string;
  durationSeconds?: number | null;
  platform: string;
};

export interface PromptProvider {
  readonly name: string;
  build(input: PromptInput): string;
}

export interface TrendProvider {
  readonly name: string;
  getTrending(limit?: number): Promise<Product[]>;
}

export interface RecommendationProvider {
  readonly name: string;
  recommend(worn: Product[], limit?: number): Promise<Product[]>;
}
