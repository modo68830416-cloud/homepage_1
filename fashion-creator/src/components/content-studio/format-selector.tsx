import { Check } from "lucide-react";
import { CONTENT_FORMATS, type ContentFormat } from "@/types/content";
import { cn } from "@/lib/utils";

export function FormatSelector({
  value,
  onChange,
}: {
  value: ContentFormat;
  onChange: (format: ContentFormat) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-foreground-subtle">
        콘텐츠 형식
      </legend>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3" role="radiogroup" aria-label="콘텐츠 형식">
        {CONTENT_FORMATS.map((format) => {
          const checked = value === format.value;
          return (
            <label
              key={format.value}
              className={cn(
                "relative flex min-h-16 cursor-pointer flex-col justify-center rounded-xl border px-3 py-2.5 transition-colors",
                checked
                  ? "border-accent-lime bg-accent-lime/10"
                  : "border-border hover:border-border-strong",
              )}
            >
              <input
                type="radio"
                name="content-format"
                value={format.value}
                checked={checked}
                onChange={() => onChange(format.value)}
                className="sr-only"
              />
              {checked && (
                <Check className="absolute right-2 top-2 h-3.5 w-3.5 text-accent-lime" aria-hidden="true" />
              )}
              <span className="text-xs font-semibold text-foreground">{format.label}</span>
              <span className="mt-0.5 text-[11px] text-foreground-subtle">{format.description}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
