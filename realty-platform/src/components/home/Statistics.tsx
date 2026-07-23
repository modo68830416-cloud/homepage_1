"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { stats } from "@/lib/properties/mock-data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Statistics() {
  const rootRef = useRef<HTMLDivElement>(null);
  const valueRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useGSAP(
    () => {
      stats.forEach((stat, index) => {
        const el = valueRefs.current[index];
        if (!el) return;

        const counter = { value: 0 };
        gsap.to(counter, {
          value: stat.value,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.textContent = Math.round(counter.value).toLocaleString();
          },
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      data-theme="dark"
      className="py-20 sm:py-24"
      style={{
        background:
          "radial-gradient(120% 100% at 80% 0%, var(--color-primary-600), var(--color-primary-900) 60%)",
      }}
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-8 px-6 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={stat.id} className="text-center text-white">
            <p className="text-[length:var(--font-size-display-2)] font-extrabold">
              <span ref={(el) => { valueRefs.current[index] = el; }}>0</span>
              {stat.suffix}
            </p>
            <p className="mt-2 text-white/70">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
