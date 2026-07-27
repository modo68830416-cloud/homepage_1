import { cn } from "@/lib/utils";

type OptionChipsProps<T extends string | number> = {
  legend: string;
  name: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  formatLabel?: (value: T) => string;
};

export function OptionChips<T extends string | number>({
  legend,
  name,
  options,
  value,
  onChange,
  formatLabel,
}: OptionChipsProps<T>) {
  return (
    <fieldset>
      <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-foreground-subtle">
        {legend}
      </legend>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={legend}>
        {options.map((option) => {
          const checked = value === option;
          return (
            <label
              key={option}
              className={cn(
                "flex min-h-9 cursor-pointer items-center rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                checked
                  ? "border-accent-lime bg-accent-lime/10 text-accent-lime"
                  : "border-border text-foreground-muted hover:border-border-strong hover:text-foreground",
              )}
            >
              <input
                type="radio"
                name={name}
                value={String(option)}
                checked={checked}
                onChange={() => onChange(option)}
                className="sr-only"
              />
              {formatLabel ? formatLabel(option) : option}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
