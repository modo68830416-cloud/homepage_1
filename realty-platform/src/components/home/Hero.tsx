"use client";

import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SearchSection } from "@/components/home/SearchSection";

export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero-eyebrow]", { opacity: 0, y: 16, duration: 0.5 })
        .from("[data-hero-title]", { opacity: 0, y: 32, duration: 0.8 }, "-=0.25")
        .from("[data-hero-subtitle]", { opacity: 0, y: 24, duration: 0.6 }, "-=0.4")
        .from("[data-hero-search]", { opacity: 0, y: 24, duration: 0.6 }, "-=0.3")
        .from("[data-hero-scroll]", { opacity: 0, duration: 0.4 }, "-=0.2");
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      data-theme="dark"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center"
      style={{
        background:
          "radial-gradient(120% 90% at 15% -10%, var(--color-hero-bg-end), var(--color-hero-bg-start) 60%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full opacity-30"
        style={{ background: "var(--color-hero-navy)", filter: "blur(120px)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-[28rem] w-[28rem] rounded-full opacity-25"
        style={{ background: "var(--color-accent-gold)", filter: "blur(140px)" }}
      />

      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center">
        <span
          data-hero-eyebrow
          className="rounded-full border border-[var(--color-accent-gold)]/40 bg-[var(--color-accent-gold)]/10 px-4 py-1.5 text-[length:var(--font-size-body-sm)] font-medium text-[var(--color-accent-gold-soft)]"
        >
          프리미엄 부동산 플랫폼
        </span>

        <h1
          data-hero-title
          className="mt-6 text-[length:var(--font-size-display-1)] font-extrabold leading-[1.08] tracking-tight text-white"
        >
          믿을 수 있는 매물,
          <br />
          가장 빠른 검색으로
        </h1>

        <p data-hero-subtitle className="mt-5 max-w-xl text-[length:var(--font-size-body-lg)] text-white/80">
          아파트부터 상가, 경매까지 — 검증된 정보와 프리미엄 큐레이션으로
          완성하는 부동산 검색 경험
        </p>

        <div data-hero-search className="mt-10 w-full">
          <SearchSection />
        </div>
      </div>

      <div
        data-hero-scroll
        className="absolute bottom-8 flex flex-col items-center gap-1 text-white/60"
      >
        <span className="text-[length:var(--font-size-body-sm)]">아래로 스크롤</span>
        <ChevronDown size={20} className="animate-bounce" />
      </div>
    </section>
  );
}
