"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "motion/react";
import { MagneticButton } from "@/components/motion/MagneticButton";

const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((mod) => mod.HeroScene),
  { ssr: false },
);

/**
 * Effect budget 100 (docs/design/visual-concept.md §2). Search CTA must be
 * visible immediately — see TASK-005 완료조건 (모바일 첫 화면 검색 즉시 노출).
 */
export function HomeHero() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <section
      data-theme="dark"
      className="relative overflow-hidden rounded-b-[var(--radius-lg)] px-6 py-20 sm:py-28"
      style={{
        background:
          "radial-gradient(120% 120% at 20% -10%, var(--color-brand-600), var(--color-brand-950) 60%)",
      }}
    >
      <HeroScene
        className="pointer-events-none absolute inset-0 opacity-70"
        fallback={
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(60% 60% at 70% 30%, var(--color-brand-400), transparent 70%)",
            }}
          />
        }
      />

      <div className="relative mx-auto max-w-3xl text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0, 0, 0.2, 1] }}
          className="text-[length:var(--font-size-display-1)] font-extrabold leading-[1.05] tracking-tight"
        >
          궁금한 건강,
          <br />
          믿을 수 있는 답을 찾다
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0, 0, 0.2, 1] }}
          className="mt-4 text-base sm:text-lg text-white/80"
        >
          증상부터 상품까지, 검수된 정보로 연결되는 건강 라이프스타일 플랫폼
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0, 0, 0.2, 1] }}
          role="search"
          className="mt-8 flex items-center gap-2 rounded-full bg-white p-2 shadow-[var(--shadow-lg)]"
        >
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="search"
            placeholder="예: 두통, 고혈압, 수면 보조제"
            aria-label="통합 검색"
            className="flex-1 rounded-full px-4 py-3 text-[var(--text-primary)] outline-none"
          />
          <MagneticButton
            type="submit"
            className="rounded-full bg-[var(--color-accent-500)] px-6 py-3 font-semibold text-white shrink-0"
            aria-label="검색"
          >
            검색
          </MagneticButton>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0, 0, 0.2, 1] }}
          className="mt-4"
        >
          <Link
            href="/ask"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            AI에게 건강 질문하기
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
