import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example-health-platform.test";

/** docs/seo/seo-policy.md §2 — search/ask/account/admin are never indexed. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/search", "/ask", "/account", "/shop/cart", "/shop/checkout", "/go/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
