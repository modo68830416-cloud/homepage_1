import { contentGenerationProvider } from "@/lib/content-provider";
import type { ImageProvider, VideoProvider } from "@/ai/types/provider";

// Image and Video are separate Provider interfaces per the Sprint-03 spec,
// but the DEMO backend for both is the same generator (it already branches
// internally on VIDEO_FORMATS) — a real integration would likely split this
// into two actual API clients, at which point these two classes diverge.
export class DemoImageProvider implements ImageProvider {
  readonly name = "demo";

  async generate(input: Parameters<ImageProvider["generate"]>[0]) {
    return contentGenerationProvider.generate(input.settings, input.sourceLook, input.projectId);
  }
}

export class DemoVideoProvider implements VideoProvider {
  readonly name = "demo";

  async generate(input: Parameters<VideoProvider["generate"]>[0]) {
    return contentGenerationProvider.generate(input.settings, input.sourceLook, input.projectId);
  }
}
