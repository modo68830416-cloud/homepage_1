import { Bot } from "lucide-react";
import type { Product } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { ProductCard } from "@/components/ui/ProductCard";
import { Reveal } from "@/components/motion/Reveal";

export function AIPicks({ products }: { products: Product[] }) {
  const picks = products.slice().sort((a, b) => b.signals.growthScore - a.signals.growthScore).slice(0, 3);

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <Reveal className="mb-8 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-violet/15">
          <Bot className="h-4 w-4 text-accent-violet" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-xl font-semibold text-foreground">AI 추천 · 곧 유행 예상</h2>
          <p className="text-sm text-foreground-subtle">성장 신호가 가장 가파른 아이템을 AI가 선별했습니다.</p>
        </div>
        <Badge tone="ai" className="ml-auto">
          AI PREDICTION
        </Badge>
      </Reveal>
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
        {picks.map((product, index) => (
          <Reveal key={product.id} delay={index * 0.06}>
            <ProductCard product={product} showTrendDetails />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
