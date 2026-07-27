import { cn } from "@/lib/utils";

type Option<T extends string> = { value: T; label: string };

type BodyOptionCardProps<T extends string> = {
  legend: string;
  name: string;
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
};

export function BodyOptionCard<T extends string>({
  legend,
  name,
  options,
  value,
  onChange,
}: BodyOptionCardProps<T>) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-foreground">{legend}</legend>
      <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label={legend}>
        {options.map((option) => {
          const checked = value === option.value;
          return (
            <label
              key={option.value}
              className={cn(
                "flex min-h-11 cursor-pointer items-center justify-center rounded-lg border px-2 py-2.5 text-center text-xs font-medium transition-colors",
                checked
                  ? "border-accent-lime bg-accent-lime/10 text-accent-lime"
                  : "border-border text-foreground-muted hover:border-border-strong hover:text-foreground",
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              {option.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
