"use client";

import { useWishlist } from "@/lib/commerce/wishlist";
import { productSummaries } from "@/lib/products/data";
import { ProductCard } from "@/components/commerce/ProductCard";

export default function WishlistPage() {
  const { productIds } = useWishlist();
  const products = productSummaries.filter((product) => productIds.includes(product.id));

  if (products.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <p>아직 찜한 상품이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <h1 className="text-[length:var(--font-size-heading-1)] font-bold mb-8">찜한 상품</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
