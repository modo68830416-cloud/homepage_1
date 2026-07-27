import { Reveal } from "@/components/motion/Reveal";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <Reveal className="mx-auto max-w-2xl px-5 pb-14 pt-20 text-center sm:px-8 sm:pt-28">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-lime">{eyebrow}</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">{title}</h1>
      <p className="mt-4 text-base leading-relaxed text-foreground-muted">{description}</p>
    </Reveal>
  );
}
