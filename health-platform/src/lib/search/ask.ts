import { getRelatedArticles } from "@/lib/content/data";
import type { Article } from "@/lib/content/types";
import { getProductsByArticleSlug } from "@/lib/products/data";
import type { ProductSummary } from "@/lib/products/types";
import { findBestArticleForQuestion } from "./engine";
import { logAskQuery } from "./log";

/** Not exhaustive — see docs/search/ai-safety-guardrails.md §3 for the review requirement. */
const EMERGENCY_KEYWORDS = ["극심한", "마비", "의식", "숨쉬기힘듦", "숨이 안", "심한 가슴", "실신"];

export interface AskResponse {
  questionSummary: string;
  generalInfo: string;
  relatedTopics: string[];
  emergency: { isEmergency: boolean; note?: string };
  relatedArticles: Article[];
  lifestyleGuidance: string[];
  relatedProducts: ProductSummary[];
  professionalAdvice: string;
  sources: { label: string; url: string }[];
}

/**
 * Rule-based stand-in for an LLM-backed answer. Always returns the fixed
 * 8-section structure from docs/search/ai-safety-guardrails.md §1 — never
 * free-form generated text.
 */
export function askQuestion(question: string): AskResponse {
  const primary = findBestArticleForQuestion(question);
  const isEmergency =
    (primary?.isEmergencyRelevant && EMERGENCY_KEYWORDS.some((kw) => question.includes(kw))) ??
    false;

  logAskQuery(question, isEmergency);

  if (!primary) {
    return {
      questionSummary: question,
      generalInfo: "이 주제에 대한 검수된 정보가 아직 없습니다.",
      relatedTopics: [],
      emergency: { isEmergency: false },
      relatedArticles: [],
      lifestyleGuidance: [],
      relatedProducts: [],
      professionalAdvice: "증상이 지속되거나 걱정되신다면 가까운 의료기관에서 상담받으시길 권장합니다.",
      sources: [],
    };
  }

  return {
    questionSummary: question,
    generalInfo: primary.summary,
    relatedTopics: primary.toc.map((entry) => entry.label),
    emergency: {
      isEmergency,
      note: isEmergency ? primary.emergencyNote : undefined,
    },
    relatedArticles: getRelatedArticles(primary),
    lifestyleGuidance: primary.keyTakeaways,
    relatedProducts: getProductsByArticleSlug(primary.slug),
    professionalAdvice:
      "이 답변은 일반 정보이며 진단이 아닙니다. 증상이 지속되면 의료 전문가와 상담하세요.",
    sources: primary.sources,
  };
}
