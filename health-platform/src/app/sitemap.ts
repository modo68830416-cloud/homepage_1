import type { MetadataRoute } from "next";
import { getPublishedArticles } from "@/lib/content/public";
import { categories } from "@/lib/content/data";
import { products, shopCategories } from "@/lib/products/data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example-health-platform.test";

/**
 * TASK-009 §4 SEO — content and product sitemaps are conceptually separate
 * (docs/seo/seo-policy.md §1) even though both are emitted from this one
 * generated file for simplicity at this scale.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/health`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/shop`, changeFrequency: "daily", priority: 0.9 },
  ];

  const healthCategoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${SITE_URL}/health/${category.key}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const articleRoutes: MetadataRoute.Sitemap = getPublishedArticles().map((article) => ({
    url: `${SITE_URL}/health/articles/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const shopCategoryRoutes: MetadataRoute.Sitemap = shopCategories.map((category) => ({
    url: `${SITE_URL}/shop/categories/${category.key}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  // Unpublished/archived/out-of-stock products are intentionally omitted —
  // see docs/seo/seo-policy.md §3 품절·삭제 상품 정책.
  const productRoutes: MetadataRoute.Sitemap = products
    .filter((product) => product.status === "PUBLISHED")
    .map((product) => ({
      url: `${SITE_URL}/shop/products/${product.slug}`,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

  return [...staticRoutes, ...healthCategoryRoutes, ...articleRoutes, ...shopCategoryRoutes, ...productRoutes];
}
