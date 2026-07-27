import type { AiResult } from "@/ai/types/job";
import type { GeneratedContent } from "@/types/content";

// Normalizes whatever a Provider returns into the standard AiResult shape
// (Sprint-03 §6) — jobId/status/previewUrl/downloadUrl/thumbnail/logs/
// provider/createdAt — regardless of which Provider produced it.
export function mapContentResult(jobId: string, provider: string, content: GeneratedContent): AiResult {
  return {
    jobId,
    status: "completed",
    previewUrl: content.mediaSeed,
    downloadUrl: content.mediaSeed,
    thumbnail: content.thumbnailOptions[0] ?? content.mediaSeed,
    logs: [`${provider} generated ${content.type} (${content.format})`],
    provider,
    createdAt: new Date().toISOString(),
  };
}

export function mapAvatarResult(jobId: string, provider: string, previewImage: string): AiResult {
  return {
    jobId,
    status: "completed",
    previewUrl: previewImage,
    downloadUrl: null,
    thumbnail: previewImage,
    logs: [`${provider} generated avatar preview`],
    provider,
    createdAt: new Date().toISOString(),
  };
}

export function mapTryOnResult(jobId: string, provider: string, previewImage: string): AiResult {
  return {
    jobId,
    status: "completed",
    previewUrl: previewImage,
    downloadUrl: null,
    thumbnail: previewImage,
    logs: [`${provider} applied try-on`],
    provider,
    createdAt: new Date().toISOString(),
  };
}
