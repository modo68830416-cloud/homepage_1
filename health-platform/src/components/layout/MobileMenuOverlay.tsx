"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { categories } from "@/lib/content/data";

/** Full-screen accordion menu for small screens (docs/ia/mobile-navigation.md §3). */
export function MobileMenuOverlay() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="메뉴 열기"
        className="md:hidden text-2xl leading-none px-2"
      >
        ≡
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[var(--z-overlay)] bg-[var(--bg-page)] overflow-y-auto p-6"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex justify-between items-center mb-8">
              <span className="font-bold">메뉴</span>
              <button type="button" onClick={() => setOpen(false)} aria-label="메뉴 닫기" className="text-2xl leading-none">
                ×
              </button>
            </div>
            <nav className="space-y-6">
              <div>
                <p className="font-semibold mb-2">건강정보</p>
                <ul className="space-y-2 pl-2">
                  {categories.map((category) => (
                    <li key={category.key}>
                      <Link href={`/health/${category.key}`} onClick={() => setOpen(false)} className="text-[var(--text-secondary)]">
                        {category.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <Link href="/shop" onClick={() => setOpen(false)} className="font-semibold">
                  스토어
                </Link>
              </div>
              <div>
                <Link href="/ask" onClick={() => setOpen(false)} className="font-semibold">
                  건강 질문하기
                </Link>
              </div>
              <div>
                <Link href="/support" onClick={() => setOpen(false)} className="font-semibold">
                  고객지원
                </Link>
              </div>
              <div className="pt-6 border-t border-[var(--border-default)]">
                <Link href="/account/login" onClick={() => setOpen(false)} className="text-[var(--color-info-500)]">
                  로그인 / 회원가입
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
