"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Star } from "lucide-react";
import { reviews } from "@/lib/properties/mock-data";

export function ReviewSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % reviews.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const review = reviews[index];

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-20 sm:py-24">
      <h2 className="text-center text-[length:var(--font-size-heading-1)] font-bold text-[var(--text-primary)]">
        고객이 직접 남긴 후기
      </h2>

      <div className="mx-auto mt-10 max-w-2xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={review.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
            className="rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--bg-page)] p-8 text-center shadow-[var(--shadow-sm)]"
          >
            <div className="flex justify-center gap-1 text-[var(--color-accent-amber)]">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </div>
            <p className="mt-4 text-[length:var(--font-size-body-lg)] text-[var(--text-primary)]">
              &ldquo;{review.content}&rdquo;
            </p>
            <p className="mt-4 text-[length:var(--font-size-body-sm)] text-[var(--text-secondary)]">
              {review.author} · {review.role}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex justify-center gap-2">
          {reviews.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-label={`${i + 1}번째 후기 보기`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-[var(--color-primary-600)]" : "w-2 bg-[var(--border-default)]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
