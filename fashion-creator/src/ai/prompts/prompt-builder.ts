import { PROMPT_TEMPLATES, type PromptTemplateKey } from "@/ai/prompts/templates";
import type { PromptInput } from "@/ai/types/provider";

// Turns structured Studio/Content Studio inputs (model, products, style,
// background, camera, length, platform) into one standard prompt string —
// every Provider receives the same shape regardless of which template or
// provider ends up handling it.
export function buildContentPrompt(input: PromptInput, template: PromptTemplateKey = "editorial"): string {
  const parts = [
    input.modelName ? `모델: ${input.modelName}` : null,
    input.productNames.length ? `상품: ${input.productNames.join(", ")}` : null,
    `스타일: ${input.style}`,
    `배경: ${input.background}`,
    `카메라: ${input.camera}`,
    input.motion ? `동작: ${input.motion}` : null,
    input.durationSeconds ? `길이: ${input.durationSeconds}초` : null,
    `플랫폼: ${input.platform}`,
  ].filter((part): part is string => Boolean(part));

  return PROMPT_TEMPLATES[template](parts.join(" · "));
}
