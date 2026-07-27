// Prompt templates kept separate from the builder logic so adding a new
// tone doesn't require touching buildContentPrompt.
export const PROMPT_TEMPLATES = {
  editorial: (body: string) => `[Editorial Fashion Photography] ${body}`,
  street: (body: string) => `[Street Style Shoot] ${body}`,
  commerce: (body: string) => `[Shoppable Product Video] ${body}`,
} as const;

export type PromptTemplateKey = keyof typeof PROMPT_TEMPLATES;
