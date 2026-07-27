import { calculateTrendScore } from "@/lib/trend-score";
import type { Product, TrendSignals } from "@/types";
import type { ShopifyProduct } from "@/services/shopify/types";

// Shopify's Storefront API doesn't expose real search/content/sales
// telemetry to a public storefront token — the BEST_SELLING sort order
// itself *is* the real popularity signal here, so signals are synthesized
// from rank instead of pretending to have analytics Shopify doesn't hand
// out. Products, price, images, and ranking are all real.
function signalsFromRank(rank: number, total: number): TrendSignals {
  const percentile = total > 1 ? 1 - rank / (total - 1) : 1;
  const base = Math.round(60 + percentile * 35);
  return {
    searchScore: base,
    contentScore: base,
    salesScore: Math.min(100, base + 5),
    growthScore: Math.max(40, base - 10),
  };
}

export function mapShopifyProduct(shopifyProduct: ShopifyProduct, rank: number, total: number): Product {
  const signals = signalsFromRank(rank, total);
  const trendScore = calculateTrendScore(signals);
  const price = Math.round(Number(shopifyProduct.priceRange.minVariantPrice.amount));
  const compareAt = shopifyProduct.compareAtPriceRange
    ? Math.round(Number(shopifyProduct.compareAtPriceRange.maxVariantPrice.amount))
    : undefined;

  return {
    id: shopifyProduct.id,
    slug: shopifyProduct.handle,
    name: shopifyProduct.title,
    brand: shopifyProduct.vendor || "Shopify",
    category: shopifyProduct.productType || "Fashion",
    price: compareAt && compareAt > price ? compareAt : price,
    salePrice: compareAt && compareAt > price ? price : undefined,
    image: shopifyProduct.handle,
    imageUrl: shopifyProduct.featuredImage?.url,
    trendScore,
    trendLabel: rank === 0 ? "best-seller" : rank < 3 ? "rising" : "creator-pick",
    growthRate: Math.max(1, Math.round(signals.growthScore / 5)),
    tags: [],
    aiSummary: shopifyProduct.description
      ? shopifyProduct.description.slice(0, 140)
      : "실제 Shopify 스토어의 베스트셀러 상품입니다.",
    signals,
    isDemo: false,
  };
}
