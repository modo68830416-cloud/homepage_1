import { PlayCircle, QrCode } from "lucide-react";
import { looks } from "@/data/creators";
import { products } from "@/data/products";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/home/SectionHeading";
import { formatKRW } from "@/lib/utils";

export function LookPreview() {
  const look = looks[0];
  const items = products.filter((product) => look.productIds.includes(product.id));

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <SectionHeading
        eyebrow="LOOK Page"
        title="한 번의 코디가 구매 링크가 됩니다"
        description="생성한 룩은 자동으로 구매 페이지와 추적 링크가 되어 SNS에 바로 공유할 수 있습니다."
      />
      <Reveal>
        <GlassPanel className="grid gap-0 overflow-hidden rounded-2xl lg:grid-cols-[1.1fr_1fr]" glow>
          <div className="relative aspect-video lg:aspect-auto">
            <PlaceholderArt seed={look.slug} icon={PlayCircle} label="LOOK video preview" className="rounded-none" />
            <div className="absolute left-4 top-4 flex gap-2">
              <Badge tone="ai">AI GENERATED</Badge>
              <Badge tone="mock">DEMO DATA</Badge>
            </div>
          </div>
          <div className="flex flex-col gap-5 p-6 sm:p-8">
            <div>
              <p className="text-xs text-foreground-subtle">{look.creatorHandle}</p>
              <h3 className="mt-1 text-xl font-semibold text-foreground">{look.title}</h3>
            </div>

            <ul className="flex flex-col gap-3">
              {items.map((product) => (
                <li key={product.id} className="flex items-center justify-between text-sm">
                  <span className="text-foreground-muted">{product.name}</span>
                  <span className="font-medium text-foreground">
                    {formatKRW(product.salePrice ?? product.price)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between border-t border-border pt-4">
              <div>
                <p className="text-xs text-foreground-subtle">Total look price</p>
                <p className="text-lg font-semibold text-accent-lime">{formatKRW(look.totalPrice)}</p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-border bg-surface">
                <QrCode className="h-6 w-6 text-foreground-subtle" aria-hidden="true" />
              </div>
            </div>

            <Button href="/look/demo-look" variant="primary" className="w-full">
              Open Demo Look
            </Button>
          </div>
        </GlassPanel>
      </Reveal>
    </section>
  );
}
