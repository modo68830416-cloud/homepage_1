type ShopifyResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

export function isShopifyConfigured(): boolean {
  return Boolean(process.env.SHOPIFY_STORE_DOMAIN && process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN);
}

// Thin fetch wrapper around Shopify's Storefront API — no SDK. Storefront
// tokens are read-only/public-safe by design, but this still only ever runs
// server-side (Server Components, Server Actions, route handlers).
export async function shopifyFetch<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  if (!domain || !token) throw new Error("Shopify is not configured");

  const response = await fetch(`https://${domain}/api/2025-01/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 300 },
  });

  const json: ShopifyResponse<T> = await response.json();
  if (json.errors?.length) throw new Error(json.errors.map((e) => e.message).join("\n"));
  if (!json.data) throw new Error("Shopify returned no data");
  return json.data;
}
