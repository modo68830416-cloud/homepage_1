import { Check, ShoppingBag } from "lucide-react";
import type { ContentSourceLook } from "@/types/content";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { formatKRW } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function LookSourcePanel({
  looks,
  selectedLookId,
  onSelect,
}: {
  looks: ContentSourceLook[];
  selectedLookId: string | null;
  onSelect: (lookId: string) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-foreground-subtle">
        Look 선택
      </legend>
      <div className="flex flex-col gap-2" role="radiogroup" aria-label="Look 선택">
        {looks.map((look) => {
          const checked = selectedLookId === look.id;
          return (
            <label
              key={look.id}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-xl border p-2.5 transition-colors",
                checked ? "border-accent-lime bg-accent-lime/5" : "border-border hover:border-border-strong",
              )}
            >
              <input
                type="radio"
                name="source-look"
                value={look.id}
                checked={checked}
                onChange={() => onSelect(look.id)}
                className="sr-only"
              />
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                <PlaceholderArt seed={look.id} icon={ShoppingBag} label={look.name} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{look.name}</p>
                <p className="truncate text-xs text-foreground-subtle">
                  {look.products.length}개 상품 · {formatKRW(look.totalPrice)}
                </p>
              </div>
              {checked && <Check className="h-4 w-4 shrink-0 text-accent-lime" aria-hidden="true" />}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
