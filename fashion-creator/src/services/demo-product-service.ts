import { products } from "@/data/products";
import type { Product } from "@/types";

// UI reads the catalog through this service rather than importing
// `@/data/products` directly. `getCatalog` stays synchronous so existing
// server components keep working without a loading state; `fetchCatalog`
// goes through the /api/demo/products Mock API and is the seam a real
// product API replaces later.
export const DemoProductService = {
  getCatalog(): Product[] {
    return products;
  },

  getById(id: string): Product | undefined {
    return products.find((product) => product.id === id);
  },

  getBySlug(slug: string): Product | undefined {
    return products.find((product) => product.slug === slug);
  },

  getTrending(limit = 10): Product[] {
    return [...products].sort((a, b) => b.trendScore - a.trendScore).slice(0, limit);
  },

  recommendFor(wornProducts: Product[], limit = 3): Product[] {
    const wornIds = new Set(wornProducts.map((product) => product.id));
    const wornCategories = new Set(wornProducts.map((product) => product.category));
    return [...products]
      .filter((product) => !wornIds.has(product.id))
      .sort((a, b) => {
        const aNewCategory = wornCategories.has(a.category) ? 1 : 0;
        const bNewCategory = wornCategories.has(b.category) ? 1 : 0;
        if (aNewCategory !== bNewCategory) return aNewCategory - bNewCategory;
        return b.trendScore - a.trendScore;
      })
      .slice(0, limit);
  },

  async fetchCatalog(params?: { category?: string }): Promise<Product[]> {
    const query = params?.category ? `?category=${encodeURIComponent(params.category)}` : "";
    const response = await fetch(`/api/demo/products${query}`);
    if (!response.ok) throw new Error("Failed to load demo product catalog");
    const data = await response.json();
    return data.products as Product[];
  },
};
