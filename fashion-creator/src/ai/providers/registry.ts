import { DemoAvatarProvider } from "@/ai/providers/demo/demo-avatar-provider";
import { DemoTryOnProvider } from "@/ai/providers/demo/demo-tryon-provider";
import { DemoImageProvider, DemoVideoProvider } from "@/ai/providers/demo/demo-content-providers";
import { DemoPromptProvider } from "@/ai/providers/demo/demo-prompt-provider";
import { DemoTrendProvider } from "@/ai/providers/demo/demo-trend-provider";
import { DemoRecommendationProvider } from "@/ai/providers/demo/demo-recommendation-provider";
import type {
  AvatarProvider,
  ImageProvider,
  PromptProvider,
  RecommendationProvider,
  TrendProvider,
  TryOnProvider,
  VideoProvider,
} from "@/ai/types/provider";

export type AiProviderId =
  | "demo"
  | "openai"
  | "gemini"
  | "flux"
  | "kling"
  | "runway"
  | "fal"
  | "replicate";

export type ProviderSet = {
  avatar: AvatarProvider;
  tryOn: TryOnProvider;
  image: ImageProvider;
  video: VideoProvider;
  prompt: PromptProvider;
  trend: TrendProvider;
  recommendation: RecommendationProvider;
};

const registry: Partial<Record<AiProviderId, () => ProviderSet>> = {
  demo: () => ({
    avatar: new DemoAvatarProvider(),
    tryOn: new DemoTryOnProvider(),
    image: new DemoImageProvider(),
    video: new DemoVideoProvider(),
    prompt: new DemoPromptProvider(),
    trend: new DemoTrendProvider(),
    recommendation: new DemoRecommendationProvider(),
  }),
  // openai / gemini / flux / kling / runway / fal / replicate: register a
  // ProviderSet factory here when that integration lands. Until then,
  // selecting one of these ids falls back to "demo" (see getActiveProviderId).
};

export function getActiveProviderId(): AiProviderId {
  const configured = process.env.NEXT_PUBLIC_AI_PROVIDER as AiProviderId | undefined;
  if (configured && registry[configured]) return configured;
  return "demo";
}

export function getProviders(): ProviderSet {
  const id = getActiveProviderId();
  const factory = registry[id] ?? registry.demo!;
  return factory();
}
