import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductStage } from "@/components/commerce/ProductStage";
import { RelatedContent } from "@/components/content/RelatedContent";
import { getPublishedArticles } from "@/lib/content/public";
import { getProductBySlug, products } from "@/lib/products/data";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildProductJsonLd } from "@/lib/seo/structured-data";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return { title: product.seo.metaTitle, description: product.seo.metaDescription };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product || product.status !== "PUBLISHED") notFound();

  const relatedArticles = getPublishedArticles().filter((article) =>
    product.relatedArticleSlugs.includes(article.slug),
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-14 pb-28 sm:pb-14">
      <JsonLd data={buildProductJsonLd(product)} />
      <ProductStage product={product} />
      <RelatedContent articles={relatedArticles} />
    </div>
  );
}
