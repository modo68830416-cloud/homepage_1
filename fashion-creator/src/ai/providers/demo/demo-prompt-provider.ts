import { buildContentPrompt } from "@/ai/prompts/prompt-builder";
import type { PromptInput, PromptProvider } from "@/ai/types/provider";

export class DemoPromptProvider implements PromptProvider {
  readonly name = "demo";

  build(input: PromptInput) {
    return buildContentPrompt(input);
  }
}
