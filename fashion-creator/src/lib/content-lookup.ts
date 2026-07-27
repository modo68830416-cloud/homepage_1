import type { Product } from "@/types";
import type { Look as StudioLook } from "@/types/studio";
import type { ContentSourceLook } from "@/types/content";
import { looks as demoLooks } from "@/data/creators";
import { products } from "@/data/products";

export function toContentSourceLook(look: StudioLook, allProducts: Product[] = products): ContentSourceLook {
  const lookProducts = look.productIds
    .map((id) => allProducts.find((product) => product.id === id))
    .filter((product): product is Product => Boolean(product));

  return {
    id: look.id,
    name: look.name,
    modelId: look.modelId,
    modelType: look.modelId ? "preset" : null,
    modelPreviewImage: look.modelId ?? "demo-look",
    products: lookProducts.map((product) => ({ id: product.id, name: product.name, price: product.salePrice ?? product.price })),
    totalPrice: look.totalPrice,
    styleTags: [],
    isDemo: true,
  };
}

export function getDemoSourceLook(): ContentSourceLook {
  const demo = demoLooks[0];
  const lookProducts = demo.productIds
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is Product => Boolean(product));

  return {
    id: demo.slug,
    name: demo.title,
    modelId: null,
    modelType: null,
    modelPreviewImage: demo.coverImage,
    products: lookProducts.map((product) => ({ id: product.id, name: product.name, price: product.salePrice ?? product.price })),
    totalPrice: demo.totalPrice,
    styleTags: ["Editorial"],
    isDemo: true,
  };
}
