import type { Article } from "@/lib/content/types";
import type { Product } from "@/lib/products/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example-health-platform.test";

/** MedicalWebPage — signals author/reviewer/dates to search engines (TASK-009 §4). */
export function buildArticleJsonLd(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    headline: article.title,
    description: article.summary,
    author: { "@type": "Organization", name: article.author },
    reviewedBy: { "@type": "Person", name: article.reviewer },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    url: `${SITE_URL}/health/articles/${article.slug}`,
    lastReviewed: article.updatedAt,
  };
}

export function buildProductJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    brand: { "@type": "Brand", name: product.brand },
    description: product.description,
    url: `${SITE_URL}/shop/products/${product.slug}`,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency,
      availability:
        "inventoryPolicy" in product && product.inventoryPolicy.stock === 0
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
    },
  };
}
