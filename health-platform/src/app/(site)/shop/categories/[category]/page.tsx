import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/commerce/ProductCard";
import { Reveal } from "@/components/motion/Reveal";
import { products, shopCategories } from "@/lib/products/data";
import { toProductSummary } from "@/lib/products/types";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return shopCategories.map((category) => ({ category: category.key }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const meta = shopCategories.find((entry) => entry.key === category);
  return meta ? { title: meta.label } : {};
}

export default async function ShopCategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const meta = shopCategories.find((entry) => entry.key === category);
  if (!meta) notFound();

  const items = products.filter((product) => product.categoryKey === category).map(toProductSummary);

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <p className="text-sm text-[var(--text-secondary)] mb-2">
        <Link href="/shop">스토어</Link> {'>'} {meta.label}
      </p>
      <h1 className="text-[length:var(--font-size-display-2)] font-bold mb-10">{meta.label}</h1>
      <Reveal>
        {items.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-[var(--text-secondary)]">이 카테고리의 상품을 준비 중입니다.</p>
        )}
      </Reveal>
    </div>
  );
}
