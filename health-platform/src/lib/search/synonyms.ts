/**
 * Synonym dictionary (TASK-006 §4 산출물, TASK-002 [[search-taxonomy]] §2).
 * Keys are canonical terms; values are alternate forms users type
 * (colloquial terms, abbreviations, common misspellings).
 */
export const synonyms: Record<string, string[]> = {
  두통: ["머리아픔", "머리아픈거", "편두통", "두퉁"],
  고혈압: ["혈압높음", "고혈압증"],
  불면증: ["수면장애", "잠못잠", "불면"],
  스트레스: ["스트래스", "정신적피로"],
  거북목: ["일자목", "목통증"],
  건강검진: ["종합검진", "건강검진결과"],
  수면: ["잠", "수면습관"],
  운동: ["스트레칭", "운동법"],
};

const reverseIndex: Map<string, string> = new Map();
for (const [canonical, variants] of Object.entries(synonyms)) {
  reverseIndex.set(canonical, canonical);
  for (const variant of variants) reverseIndex.set(variant, canonical);
}

/** Expands a raw query term to its canonical form, if a mapping exists. */
export function toCanonicalTerm(term: string): string {
  return reverseIndex.get(term) ?? term;
}

export function allKnownTerms(): string[] {
  return Array.from(reverseIndex.keys());
}
