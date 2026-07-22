import { getPublishedArticles } from "@/lib/content/public";
import type { Article } from "@/lib/content/types";
import { productSummaries } from "@/lib/products/data";
import type { ProductSummary } from "@/lib/products/types";
import { allKnownTerms, synonyms, toCanonicalTerm } from "./synonyms";
import { correctTypo } from "./typo";
import { logSearch } from "./log";

export type SearchResultType = "ARTICLE" | "PRODUCT";

export interface SearchResult {
  type: SearchResultType;
  article?: Article;
  product?: ProductSummary;
}

export interface SearchResponse {
  query: string;
  correctedFrom: string | null;
  results: SearchResult[];
  articleResults: Article[];
  productResults: ProductSummary[];
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function matchesArticle(article: Article, term: string): boolean {
  const haystack = [article.title, article.summary, ...article.sections.map((s) => s.body)]
    .join(" ")
    .toLowerCase();
  return haystack.includes(term);
}

function matchesProduct(product: ProductSummary, term: string): boolean {
  const haystack = `${product.title} ${product.brand}`.toLowerCase();
  return haystack.includes(term);
}

function runSearch(term: string) {
  const canonical = toCanonicalTerm(term);
  const articleResults = getPublishedArticles().filter(
    (article) => matchesArticle(article, term) || matchesArticle(article, canonical),
  );
  const productResults = productSummaries.filter(
    (product) => matchesProduct(product, term) || matchesProduct(product, canonical),
  );
  return { articleResults, productResults };
}

/**
 * Unified search across content and products (TASK-006 §2/§6). Falls back to
 * typo correction when the raw query yields nothing, per docs/ia/search-taxonomy.md §3.
 */
export function search(rawQuery: string): SearchResponse {
  const query = normalize(rawQuery);
  let { articleResults, productResults } = runSearch(query);
  let correctedFrom: string | null = null;

  if (articleResults.length === 0 && productResults.length === 0 && query.length > 0) {
    const corrected = correctTypo(query, allKnownTerms());
    if (corrected) {
      const retry = runSearch(corrected);
      if (retry.articleResults.length > 0 || retry.productResults.length > 0) {
        articleResults = retry.articleResults;
        productResults = retry.productResults;
        correctedFrom = query;
      }
    }
  }

  const totalResults = articleResults.length + productResults.length;
  logSearch(rawQuery, totalResults);

  const results: SearchResult[] = [
    ...articleResults.map((article): SearchResult => ({ type: "ARTICLE", article })),
    ...productResults.map((product): SearchResult => ({ type: "PRODUCT", product })),
  ];

  return {
    query: correctedFrom ?? query,
    correctedFrom,
    results,
    articleResults,
    productResults,
  };
}

/**
 * Matches a free-form question against known vocabulary terms (docs/ia/search-taxonomy.md
 * §2) by substring containment rather than whitespace tokenization, since Korean
 * particles (조사) attach directly to nouns ("잠이", "고혈압인데") and would
 * otherwise hide a real match. Deliberately does NOT fall back to matching
 * arbitrary question words against article bodies — an unrecognized question
 * returns no match rather than a coincidental, likely-wrong one
 * (docs/search/ai-safety-guardrails.md §4: 추측성 답변을 생성하지 않는다).
 */
export function findBestArticleForQuestion(question: string): Article | null {
  const normalizedQuestion = normalize(question);

  const matchedCanonicalTerms = new Set<string>();
  for (const [canonical, variants] of Object.entries(synonyms)) {
    if ([canonical, ...variants].some((term) => normalizedQuestion.includes(term))) {
      matchedCanonicalTerms.add(canonical);
    }
  }

  if (matchedCanonicalTerms.size === 0) return null;

  let best: { article: Article; score: number } | null = null;
  for (const article of getPublishedArticles()) {
    const haystack = [article.title, article.summary, ...article.sections.map((s) => s.body)]
      .join(" ")
      .toLowerCase();
    // Weight the title heavily and count body occurrences so an article's
    // primary topic (e.g. sleep-hygiene-guide mentioning "수면" repeatedly)
    // outranks another article that only mentions the term in passing
    // (e.g. headache-overview's self-care tip about getting enough sleep).
    const titleScore = Array.from(matchedCanonicalTerms).reduce(
      (count, term) => count + (article.title.toLowerCase().includes(term) ? 5 : 0),
      0,
    );
    const bodyScore = Array.from(matchedCanonicalTerms).reduce(
      (count, term) => count + haystack.split(term).length - 1,
      0,
    );
    const score = titleScore + bodyScore;
    if (score > 0 && (!best || score > best.score)) {
      best = { article, score };
    }
  }

  return best?.article ?? null;
}

const POPULAR_QUERIES = ["두통", "고혈압", "불면증", "스트레스", "거북목", "건강검진"];

export function getPopularQueries(): string[] {
  return POPULAR_QUERIES;
}

export function getAutocompleteSuggestions(rawQuery: string): string[] {
  const query = normalize(rawQuery);
  if (!query) return [];

  const titleMatches = getPublishedArticles()
    .filter((article) => article.title.toLowerCase().includes(query))
    .map((article) => article.title);
  const termMatches = allKnownTerms().filter((term) => term.includes(query));

  return Array.from(new Set([...termMatches, ...titleMatches])).slice(0, 8);
}
