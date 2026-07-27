import { DemoAvatarProvider } from "@/ai/providers/demo/demo-avatar-provider";
import { DemoTryOnProvider } from "@/ai/providers/demo/demo-tryon-provider";
import { DemoImageProvider, DemoVideoProvider } from "@/ai/providers/demo/demo-content-providers";
import { DemoPromptProvider } from "@/ai/providers/demo/demo-prompt-provider";
import { DemoTrendProvider } from "@/ai/providers/demo/demo-trend-provider";
import { DemoRecommendationProvider } from "@/ai/providers/demo/demo-recommendation-provider";
import { RealAvatarProvider } from "@/ai/providers/real/real-avatar-provider";
import { ShopifyTrendProvider } from "@/ai/providers/real/shopify-trend-provider";
import { isShopifyConfigured } from "@/services/shopify/client";
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
  | "real"
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
  // "real" only implements Avatar so far (via Vercel AI Gateway) — every
  // other slot still falls back to the DEMO implementation until a real
  // backend exists for it too.
  real: () => ({
    avatar: new RealAvatarProvider(),
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

// `preferReal` is a second, independent gate on top of NEXT_PUBLIC_AI_PROVIDER
// — real generation costs real money per call, so callers must explicitly
// confirm the visitor is signed in (see avatar-wizard.tsx) before this
// returns anything other than the demo set, regardless of env config.
export function getProviders(preferReal = false): ProviderSet {
  const set = preferReal ? (registry[getActiveProviderId()] ?? registry.demo!)() : registry.demo!();

  // Trend data carries no per-call cost or abuse risk (unlike AI
  // generation), so it's swapped to the real Shopify-backed provider for
  // every visitor whenever a store is connected — no signed-in gate needed.
  // isShopifyConfigured() reads server-only env vars that are always
  // undefined in client bundles, so this is a no-op if called from the
  // browser.
  if (isShopifyConfigured()) {
    set.trend = new ShopifyTrendProvider();
  }

  return set;
}
