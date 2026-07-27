import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  linkHref?: string;
  linkLabel?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  linkHref,
  linkLabel,
}: SectionHeadingProps) {
  return (
    <Reveal className="mb-10 flex flex-col justify-between gap-6 sm:mb-14 sm:flex-row sm:items-end">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-lime">
          {eyebrow}
        </p>
        <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-3 max-w-lg text-base text-foreground-muted">{description}</p>
        )}
      </div>
      {linkHref && linkLabel && (
        <Link
          href={linkHref}
          className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-accent-lime"
        >
          {linkLabel}
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      )}
    </Reveal>
  );
}
