import type { TryOnProvider } from "@/ai/types/provider";

export class DemoTryOnProvider implements TryOnProvider {
  readonly name = "demo";

  async apply(input: Parameters<TryOnProvider["apply"]>[0]) {
    const seed = ["tryon", input.modelPreviewImage, ...input.productIds.slice().sort()].join("-");
    return { previewImage: seed };
  }
}
