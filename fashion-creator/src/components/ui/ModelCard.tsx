import { UserRound } from "lucide-react";
import type { FashionModel } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";

export function ModelCard({ model }: { model: FashionModel }) {
  return (
    <article className="group glass-panel flex flex-col overflow-hidden rounded-xl transition-transform duration-300 ease-[var(--ease-premium)] hover:-translate-y-1">
      <div className="relative aspect-[3/4]">
        <PlaceholderArt seed={model.id} icon={UserRound} label={model.name} className="rounded-none" />
        {model.isFeatured && (
          <div className="absolute left-3 top-3">
            <Badge tone="ai">AI GENERATED</Badge>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-base font-semibold text-foreground">{model.name}</h3>
        <p className="text-xs text-foreground-subtle">
          {model.style} · {model.bodyType}
        </p>
        <div className="mt-auto flex flex-col gap-2 pt-2 sm:flex-row">
          <Button href="/studio" variant="secondary" className="flex-1 text-xs">
            Use This Model
          </Button>
          <Button href="/models" variant="outline" className="flex-1 text-xs">
            Create My Avatar
          </Button>
        </div>
      </div>
    </article>
  );
}
