import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Shirt } from "lucide-react";
import { products } from "@/data/products";
import type { TrendSignals } from "@/types";
import { Badge, trendLabelText, trendLabelTone } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DemoActionButton } from "@/components/ui/DemoActionButton";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { Reveal } from "@/components/motion/Reveal";
import { formatKRW } from "@/lib/utils";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

// All product slugs are known at build time — any other slug is a real 404,
// not a slow render behind the root loading.tsx Suspense boundary.
export const dynamicParams = false;

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: `${product.brand} · ${product.name} — Trend Score ${product.trendScore}`,
  };
}

const SIGNAL_LABELS: { key: keyof TrendSignals; label: string }[] = [
  { key: "searchScore", label: "검색 반응" },
  { key: "contentScore", label: "콘텐츠 반응" },
  { key: "salesScore", label: "판매 반응" },
  { key: "growthScore", label: "성장률" },
];

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();

  return (
    <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
      <Reveal>
        <GlassPanel className="grid gap-0 overflow-hidden rounded-2xl lg:grid-cols-[1fr_1fr]" glow>
          <div className="relative aspect-[4/5]">
            <PlaceholderArt seed={product.id} icon={Shirt} label={product.name} className="rounded-none" />
            <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
              <Badge tone={trendLabelTone[product.trendLabel]}>{trendLabelText[product.trendLabel]}</Badge>
              {product.isDemo && <Badge tone="mock">DEMO DATA</Badge>}
            </div>
          </div>

          <div className="flex flex-col gap-5 p-6 sm:p-8">
            <div>
              <p className="text-xs uppercase tracking-wide text-foreground-subtle">{product.brand}</p>
              <h1 className="mt-1 text-2xl font-bold text-foreground">{product.name}</h1>
              <p className="mt-1 text-xs text-foreground-subtle">{product.category}</p>
            </div>

            <div className="flex items-baseline gap-2">
              {product.salePrice ? (
                <>
                  <span className="text-xl font-semibold text-accent-lime">
                    {formatKRW(product.salePrice)}
                  </span>
                  <span className="text-sm text-foreground-subtle line-through">
                    {formatKRW(product.price)}
                  </span>
                </>
              ) : (
                <span className="text-xl font-semibold text-foreground">{formatKRW(product.price)}</span>
              )}
            </div>

            <div className="rounded-xl border border-border bg-surface p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">AI Trend Score</p>
                <span className="text-lg font-bold text-accent-lime">{product.trendScore}</span>
              </div>
              <p className="mb-3 text-xs leading-relaxed text-foreground-muted">{product.aiSummary}</p>
              <div className="flex flex-col gap-2">
                {SIGNAL_LABELS.map(({ key, label }) => (
                  <div key={key} className="flex items-center gap-3">
                    <span className="w-20 shrink-0 text-[11px] text-foreground-subtle">{label}</span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-strong">
                      <div
                        className="h-full rounded-full bg-accent-lime"
                        style={{ width: `${product.signals[key]}%` }}
                      />
                    </div>
                    <span className="w-8 shrink-0 text-right text-[11px] text-foreground-subtle">
                      {product.signals[key]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {product.tags.map((tag) => (
                <Badge key={tag} tone="mock">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="mt-auto flex flex-col gap-2 sm:flex-row">
              <Button href="/models" variant="primary" className="flex-1">
                AI 모델에게 입혀보기
              </Button>
              <Button href="/studio" variant="secondary" className="flex-1">
                콘텐츠 만들기
              </Button>
            </div>
            <DemoActionButton
              variant="outline"
              className="w-full"
              message="실제 결제 연동은 준비 중입니다"
            >
              바로 구매하기
            </DemoActionButton>
          </div>
        </GlassPanel>
      </Reveal>
    </section>
  );
}
