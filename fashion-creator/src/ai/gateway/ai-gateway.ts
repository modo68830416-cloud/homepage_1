import { getProviders } from "@/ai/providers/registry";
import { aiJobQueue } from "@/ai/gateway/job-queue";
import { mapAvatarResult, mapContentResult, mapTryOnResult } from "@/ai/mappers/result-mapper";
import type { AiJob, AiJobKind } from "@/ai/types/job";
import type { PromptInput } from "@/ai/types/provider";
import type { ContentSourceLook, ContentStudioState, GeneratedContent } from "@/types/content";
import { VIDEO_FORMATS } from "@/types/content";
import type { AvatarBasicInfo, BodySettings } from "@/types/models";
import type { Product } from "@/types";

// The single entry point every feature talks to: User Action -> AI Gateway
// -> Provider Adapter -> AI Service -> Result Mapper -> UI (Sprint-03 §1).
// UI and services import only from here (plus useAiJob for progress reads)
// — never a concrete Provider or the Job Queue directly.
export const AiGateway = {
  queue: aiJobQueue,

  startAvatarJob(useRealProvider = false): AiJob {
    const providers = getProviders(useRealProvider);
    return aiJobQueue.create("avatar", providers.avatar.name, [
      "사진 확인",
      "얼굴 특징 준비",
      "체형 설정 반영",
      "스타일 모델 생성",
      "미리보기 완성",
    ]);
  },

  async completeAvatarJob(
    jobId: string,
    input: { basicInfo: AvatarBasicInfo; bodySettings: BodySettings; photoFile?: File; useRealProvider?: boolean },
  ) {
    const providers = getProviders(input.useRealProvider);
    try {
      const { previewImage } = await providers.avatar.generate(input);
      const result = mapAvatarResult(jobId, providers.avatar.name, previewImage);
      aiJobQueue.complete(jobId, result);
      return result;
    } catch (error) {
      aiJobQueue.fail(jobId, error instanceof Error ? error.message : "avatar generation failed");
      throw error;
    }
  },

  startContentJob(format: ContentStudioState["format"]): AiJob {
    const providers = getProviders();
    const kind: AiJobKind = VIDEO_FORMATS.includes(format) ? "video" : "image";
    const provider = kind === "video" ? providers.video : providers.image;
    return aiJobQueue.create(kind, provider.name, [
      "Look 분석",
      "스타일 설정",
      "장면 구성",
      "콘텐츠 생성",
      "출력 최적화",
      "완료",
    ]);
  },

  async completeContentJob(
    jobId: string,
    input: { settings: ContentStudioState; sourceLook: ContentSourceLook; projectId: string },
  ): Promise<{ content: GeneratedContent }> {
    const providers = getProviders();
    const isVideo = VIDEO_FORMATS.includes(input.settings.format);
    const provider = isVideo ? providers.video : providers.image;
    try {
      const content = await provider.generate(input);
      const result = mapContentResult(jobId, provider.name, content);
      aiJobQueue.complete(jobId, result);
      return { content };
    } catch (error) {
      aiJobQueue.fail(jobId, error instanceof Error ? error.message : "content generation failed");
      throw error;
    }
  },

  async applyTryOn(input: { modelPreviewImage: string; productIds: string[] }) {
    const providers = getProviders();
    const { previewImage } = await providers.tryOn.apply(input);
    return mapTryOnResult(`tryon-${Date.now()}`, providers.tryOn.name, previewImage);
  },

  advanceStep(jobId: string): void {
    aiJobQueue.advanceStep(jobId);
  },

  cancelJob(jobId: string): void {
    aiJobQueue.cancel(jobId);
  },

  retryJob(jobId: string): AiJob | null {
    return aiJobQueue.retry(jobId);
  },

  buildPrompt(input: PromptInput): string {
    return getProviders().prompt.build(input);
  },

  async getTrending(limit?: number): Promise<Product[]> {
    return getProviders().trend.getTrending(limit);
  },

  async recommend(worn: Product[], limit?: number): Promise<Product[]> {
    return getProviders().recommendation.recommend(worn, limit);
  },
};
