import { BACKGROUNDS, CAMERAS, STYLES, type ContentStudioState } from "@/types/content";

export type PromptSummary = {
  background?: string;
  style?: string;
  camera?: string;
  format: string;
  aspectRatio: string;
  duration: string;
};

export function summarizePrompt(prompt: string, state: ContentStudioState): PromptSummary {
  const background = BACKGROUNDS.find((item) => prompt.includes(item));
  const style = STYLES.find((item) => prompt.toLowerCase().includes(item.toLowerCase()));
  const camera = CAMERAS.find((item) => prompt.includes(item));

  return {
    background: background ?? state.background,
    style: style ?? state.style,
    camera: camera ?? state.camera,
    format: state.format,
    aspectRatio: state.aspectRatio,
    duration: state.duration ? `${state.duration}초` : "이미지",
  };
}
