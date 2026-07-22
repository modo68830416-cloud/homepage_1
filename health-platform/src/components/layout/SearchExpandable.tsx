"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "motion/react";

/** Header search entry point — always visible, expands on focus (interaction #10 in docs/motion/interaction-catalog.md). */
export function SearchExpandable() {
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} role="search" className="relative">
      <motion.input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="증상, 질환, 상품을 검색하세요"
        aria-label="통합 검색"
        animate={{ width: focused ? 320 : 220 }}
        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
        className="rounded-full border border-[var(--border-default)] bg-[var(--color-surface-50)] px-4 py-2 text-sm outline-none focus:border-[var(--color-info-500)]"
      />
    </form>
  );
}
