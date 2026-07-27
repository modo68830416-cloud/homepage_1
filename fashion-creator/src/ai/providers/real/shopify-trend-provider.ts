import { shopifyFetch } from "@/services/shopify/client";
import { BEST_SELLING_PRODUCTS_QUERY } from "@/services/shopify/queries";
import { mapShopifyProduct } from "@/services/shopify/mapper";
import { DemoTrendProvider } from "@/ai/providers/demo/demo-trend-provider";
import type { ShopifyProductsResponse } from "@/services/shopify/types";
import type { TrendProvider } from "@/ai/types/provider";
import type { Product } from "@/types";

// Real popularity data, sourced from the connected Shopify store's actual
// best-selling order — no cost/abuse concern like AI generation, so this is
// available to every visitor, not gated to signed-in users. Falls back to
// the DEMO catalog whenever the store has nothing to show (e.g. an unclaimed
// sandbox store with an empty catalog) so the Trends page never renders
// empty.
export class ShopifyTrendProvider implements TrendProvider {
  readonly name = "shopify";
  private readonly demo = new DemoTrendProvider();

  async getTrending(limit = 10): Promise<Product[]> {
    try {
      const data = await shopifyFetch<ShopifyProductsResponse>(BEST_SELLING_PRODUCTS_QUERY, { first: limit });
      const nodes = data.products.nodes;
      if (nodes.length === 0) return this.demo.getTrending(limit);
      return nodes.map((product, index) => mapShopifyProduct(product, index, nodes.length));
    } catch {
      return this.demo.getTrending(limit);
    }
  }
}
