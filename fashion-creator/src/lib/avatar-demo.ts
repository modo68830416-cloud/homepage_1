import type { BodySettings, GenderPresentation } from "@/types/models";

// Deterministic: same inputs always resolve to the same demo avatar seed,
// so regenerating with identical settings never surprises the user.
export function getAvatarSeed(genderPresentation: GenderPresentation, bodySettings: BodySettings) {
  return [
    "avatar",
    genderPresentation,
    bodySettings.bodyType,
    bodySettings.proportion,
    bodySettings.shoulder,
    bodySettings.arms,
    bodySettings.abdomen,
    bodySettings.lowerBody,
  ].join("-");
}

const GENERATION_STEPS = [
  "사진 확인",
  "얼굴 특징 준비",
  "체형 설정 반영",
  "스타일 모델 생성",
  "미리보기 완성",
];

export function getGenerationSteps() {
  return GENERATION_STEPS;
}

type KeywordRule = {
  keywords: string[];
  field: "proportion" | "shoulder";
  value: string;
  label: string;
};

const KEYWORD_RULES: KeywordRule[] = [
  { keywords: ["다리가 짧", "다리 짧"], field: "proportion", value: "upper-long", label: "다리 비율: 약간 짧은 편" },
  { keywords: ["다리가 길", "다리 길", "롱다리"], field: "proportion", value: "leg-long", label: "다리 비율: 긴 편" },
  { keywords: ["어깨가 넓", "어깨 넓"], field: "shoulder", value: "wide", label: "어깨: 넓은 편" },
  { keywords: ["어깨가 좁", "어깨 좁"], field: "shoulder", value: "narrow", label: "어깨: 좁은 편" },
];

export type DescriptionAnalysis = {
  label: string;
}[];

export function analyzeBodyDescription(description: string): DescriptionAnalysis {
  const results: DescriptionAnalysis = [];
  for (const rule of KEYWORD_RULES) {
    if (rule.keywords.some((keyword) => description.includes(keyword))) {
      results.push({ label: rule.label });
    }
  }
  return results;
}
