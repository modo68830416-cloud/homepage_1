import type { ContentSourceLook, ContentStudioState, GeneratedContent, VideoScene } from "@/types/content";
import { VIDEO_FORMATS } from "@/types/content";

function buildDefaultScenes(state: ContentStudioState): VideoScene[] {
  const sceneDuration = Math.max(3, Math.round((state.duration ?? 15) / 3));
  return [
    {
      id: "scene-hook",
      order: 0,
      title: "Hook",
      duration: sceneDuration,
      shotType: "클로즈업",
      modelAction: "포즈",
      cameraMotion: state.camera,
      background: state.background,
      overlayText: "지금 가장 핫한 룩",
    },
    {
      id: "scene-showcase",
      order: 1,
      title: "Look Showcase",
      duration: sceneDuration,
      shotType: "전신",
      modelAction: state.motion,
      cameraMotion: "트래킹",
      background: state.background,
    },
    {
      id: "scene-cta",
      order: 2,
      title: "CTA / Shop the Look",
      duration: sceneDuration,
      shotType: "전신",
      modelAction: "포즈",
      cameraMotion: "줌아웃",
      background: state.background,
      overlayText: "Shop the Look",
    },
  ];
}

// Provider interface kept separate from the UI so a real image/video backend
// can be swapped in later without touching the studio components.
export interface ContentGenerationProvider {
  generate(input: ContentStudioState, sourceLook: ContentSourceLook, projectId: string): GeneratedContent;
}

export class DemoContentGenerationProvider implements ContentGenerationProvider {
  generate(input: ContentStudioState, sourceLook: ContentSourceLook, projectId: string): GeneratedContent {
    const isVideo = VIDEO_FORMATS.includes(input.format);
    const mediaSeed = [
      "content",
      projectId,
      input.format,
      input.style,
      input.background,
      sourceLook.id,
    ].join("-");

    return {
      id: `content-${projectId}`,
      projectId,
      type: isVideo ? "video" : "image",
      format: input.format,
      aspectRatio: input.aspectRatio,
      duration: isVideo ? (input.duration ?? 15) : undefined,
      mediaSeed,
      thumbnailOptions: [`${mediaSeed}-model`, `${mediaSeed}-product`, `${mediaSeed}-text`],
      scenes: isVideo ? buildDefaultScenes(input) : [],
      isDemo: true,
    };
  }
}

export const contentGenerationProvider = new DemoContentGenerationProvider();

export const GENERATION_STEPS = ["Look 분석", "스타일 설정", "장면 구성", "콘텐츠 생성", "출력 최적화", "완료"];
