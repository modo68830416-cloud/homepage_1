"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { navLinks } from "@/components/layout/nav-links";
import { Button } from "@/components/ui/Button";
import { Stagger } from "@/components/motion/stagger";
import { cn } from "@/lib/utils";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = containerRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-50 flex flex-col bg-background/98 backdrop-blur-xl md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex items-center justify-end px-5 pt-5">
            <Button ref={closeButtonRef} variant="icon" onClick={onClose} aria-label="Close menu">
              <span aria-hidden="true" className="text-lg">
                ✕
              </span>
            </Button>
          </div>
          <nav className="flex flex-1 flex-col justify-center px-8" aria-label="Mobile">
            <Stagger className="flex flex-col gap-2" step={0.05}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block min-h-11 border-b border-border py-4 text-2xl font-semibold text-foreground transition-colors hover:text-accent-lime",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </Stagger>
          </nav>
          <div className="flex flex-col gap-3 p-8">
            <Button variant="secondary" className="w-full" onClick={onClose}>
              로그인
            </Button>
            <Button href="/studio" variant="primary" className="w-full">
              Create a Look
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
