"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { PlayCircle, QrCode } from "lucide-react";
import { looks } from "@/data/creators";
import { products } from "@/data/products";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CopyLinkButton } from "@/components/ui/CopyLinkButton";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/home/SectionHeading";
import { formatKRW } from "@/lib/utils";

const INDICATOR_POSITIONS = [
  { top: "30%", left: "45%" },
  { top: "55%", left: "62%" },
  { top: "70%", left: "30%" },
];

export function LookPreview() {
  const look = looks[0];
  const items = products.filter((product) => look.productIds.includes(product.id));
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8"
      style={{
        backgroundImage: "radial-gradient(700px circle at 50% 0%, rgba(111,240,165,0.05), transparent 60%)",
      }}
    >
      <SectionHeading
        eyebrow="LOOK Page"
        title="한 번의 코디가 구매 링크가 됩니다"
        description="생성한 룩은 자동으로 구매 페이지와 추적 링크가 되어 SNS에 바로 공유할 수 있습니다."
      />
      <Reveal>
        <GlassPanel className="grid gap-0 overflow-hidden rounded-2xl lg:grid-cols-[1.1fr_1fr]" glow edgeGlow>
          <div className="relative aspect-video lg:aspect-auto">
            <PlaceholderArt seed={look.slug} icon={PlayCircle} label="LOOK video preview" className="rounded-none" />
            <div className="absolute left-4 top-4 flex gap-2">
              <Badge tone="ai">AI GENERATED</Badge>
              <Badge tone="mock">DEMO DATA</Badge>
            </div>
            {hoveredIndex !== null && INDICATOR_POSITIONS[hoveredIndex] && (
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent-lime bg-accent-lime/40"
                style={INDICATOR_POSITIONS[hoveredIndex]}
                aria-hidden="true"
              />
            )}
          </div>
          <div className="flex flex-col gap-5 p-6 sm:p-8">
            <div>
              <p className="text-xs text-foreground-subtle">{look.creatorHandle}</p>
              <h3 className="mt-1 text-xl font-semibold text-foreground">{look.title}</h3>
            </div>

            <ul className="flex flex-col gap-3">
              {items.map((product, index) => (
                <li
                  key={product.id}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="flex items-center justify-between rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-surface"
                >
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

            <div className="flex flex-col gap-2 sm:flex-row">
              <Button href="/look/demo-look" variant="primary" className="flex-1">
                Open Demo Look
              </Button>
              <CopyLinkButton path={`/look/${look.slug}`} />
            </div>
          </div>
        </GlassPanel>
      </Reveal>
    </section>
  );
}
