import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlayCircle, QrCode, ShoppingBag } from "lucide-react";
import { looks } from "@/data/creators";
import { products } from "@/data/products";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { MinimalHeader } from "@/components/layout/MinimalHeader";
import { formatKRW } from "@/lib/utils";

type LookPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return looks.map((look) => ({ slug: look.slug }));
}

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

  return (
    <>
      <MinimalHeader />
      <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <GlassPanel className="overflow-hidden rounded-2xl" glow>
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
                <li
                  key={product.id}
                  className="flex items-center justify-between border-b border-border pb-3 text-sm last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium text-foreground">{product.name}</p>
                    <p className="text-xs text-foreground-subtle">{product.brand}</p>
                  </div>
                  <span className="font-medium text-foreground">
                    {formatKRW(product.salePrice ?? product.price)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between rounded-xl border border-border bg-surface p-4">
              <div>
                <p className="text-xs text-foreground-subtle">Total look price</p>
                <p className="text-xl font-semibold text-accent-lime">{formatKRW(look.totalPrice)}</p>
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-border bg-background">
                <QrCode className="h-7 w-7 text-foreground-subtle" aria-hidden="true" />
              </div>
            </div>

            <Button variant="primary" className="w-full" disabled>
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              이 룩 전체 구매하기 (준비 중)
            </Button>
          </div>
        </GlassPanel>
      </main>
    </>
  );
}
