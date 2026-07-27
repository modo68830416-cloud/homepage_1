import { Search, Sparkles, Users } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

export function MarketplaceHero() {
  return (
    <section className="relative overflow-hidden px-5 pb-14 pt-20 sm:px-8 sm:pt-28">
      <Reveal className="mx-auto max-w-3xl text-center">
        <Badge tone="ai">Marketplace</Badge>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Where Fashion Creators
          <br />
          Meet Brands.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-foreground-muted">
          AI 패션 콘텐츠를 발견하고, 크리에이터와 협업하며, 판매 가능한 콘텐츠를 확보하세요.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/marketplace/creators" variant="primary">
            <Users className="h-4 w-4" aria-hidden="true" />
            크리에이터 찾기
          </Button>
          <Button href="/marketplace/content" variant="secondary">
            <Search className="h-4 w-4" aria-hidden="true" />
            콘텐츠 둘러보기
          </Button>
          <Button href="/marketplace/campaigns" variant="outline">
            캠페인 등록하기
          </Button>
          <Button href="/creator" variant="outline">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            크리에이터로 참여하기
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
