import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlayCircle } from "lucide-react";
import { creators, looks } from "@/data/creators";
import { products } from "@/data/products";
import { Badge } from "@/components/ui/Badge";
import { CopyLinkButton } from "@/components/ui/CopyLinkButton";
import { CreatorCard } from "@/components/ui/CreatorCard";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { ProductCard } from "@/components/ui/ProductCard";
import { MinimalHeader } from "@/components/layout/MinimalHeader";
import { LookProductRow } from "@/components/commerce/look-product-row";
import { LookPurchaseButton } from "@/components/commerce/look-purchase-button";
import { LookSalesMetrics } from "@/components/commerce/look-sales-metrics";
import { LookViewTracker } from "@/components/commerce/look-view-tracker";
import { QrReveal } from "@/components/commerce/qr-reveal";
import { formatKRW } from "@/lib/utils";

type LookPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return looks.map((look) => ({ slug: look.slug }));
}

// All LOOK slugs are known at build time — any other slug is a real 404,
// not a slow render behind the root loading.tsx Suspense boundary.
export const dynamicParams = false;

export async function generateMetadata({ params }: LookPageProps): Promise<Metadata> {
  const { slug } = await params;
  const look = looks.find((item) => item.slug === slug);
  if (!look) return { title: "LOOK" };
  return {
    title: look.title,
    description: `${look.creatorHandle}의 ${look.title} — ${formatKRW(look.totalPrice)}`,
  };
}

export default async function LookPage({ params }: LookPageProps) {
  const { slug } = await params;
  const look = looks.find((item) => item.slug === slug);
  if (!look) notFound();

  const items = products.filter((product) => look.productIds.includes(product.id));
  const creator = creators.find((item) => item.handle === look.creatorHandle);
  const relatedProducts = products
    .filter((product) => !look.productIds.includes(product.id))
    .sort((a, b) => b.trendScore - a.trendScore)
    .slice(0, 3);
  const shoppableUrl = `https://fashioncreator.co.kr/look/${look.slug}`;

  return (
    <>
      <LookViewTracker />
      <MinimalHeader />
      <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <GlassPanel className="overflow-hidden rounded-2xl" glow edgeGlow>
          <div className="relative aspect-video">
            <PlaceholderArt seed={look.slug} icon={PlayCircle} label={`${look.title} video`} className="rounded-none" />
            <div className="absolute left-4 top-4 flex gap-2">
              <Badge tone="ai">AI GENERATED</Badge>
              {look.isDemo && <Badge tone="mock">DEMO DATA</Badge>}
            </div>
          </div>

          <div className="flex flex-col gap-6 p-6 sm:p-8">
            <div>
              <p className="text-sm text-foreground-subtle">{look.creatorHandle}</p>
              <h1 className="mt-1 text-2xl font-bold text-foreground">{look.title}</h1>
            </div>

            <ul className="flex flex-col gap-3">
              {items.map((product) => (
                <LookProductRow key={product.id} product={product} />
              ))}
            </ul>

            <div className="flex items-center justify-between rounded-xl border border-border bg-surface p-4">
              <div>
                <p className="text-xs text-foreground-subtle">Total look price</p>
                <p className="text-xl font-semibold text-accent-lime">{formatKRW(look.totalPrice)}</p>
              </div>
              <QrReveal url={shoppableUrl} />
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <LookPurchaseButton className="flex-1" />
              <CopyLinkButton path={`/look/${look.slug}`} />
            </div>

            <LookSalesMetrics views={look.views} />
          </div>
        </GlassPanel>

        {creator && (
          <div className="mt-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-foreground-subtle">
              Creator
            </p>
            <CreatorCard creator={creator} />
          </div>
        )}

        {relatedProducts.length > 0 && (
          <div className="mt-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-foreground-subtle">
              관련 상품
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
