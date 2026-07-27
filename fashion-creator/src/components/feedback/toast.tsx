"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, Info } from "lucide-react";
import { duration, easing } from "@/lib/motion";

type Toast = {
  id: number;
  message: string;
  tone: "success" | "info";
};

type ToastContextValue = {
  showToast: (message: string, tone?: Toast["tone"]) => void;
};

const ToastContext = React.createContext<ToastContextValue | null>(null);

let toastId = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const showToast = React.useCallback((message: string, tone: Toast["tone"] = "success") => {
    const id = ++toastId;
    setToasts((current) => [...current.slice(-2), { id, message, tone }]);
    setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 2800);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] flex flex-col items-center gap-2 px-4 sm:bottom-8"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        aria-live="polite"
        role="status"
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: duration.fast, ease: easing.standard }}
              className="glass-panel pointer-events-auto flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-foreground shadow-lg"
            >
              {toast.tone === "success" ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-accent-lime" aria-hidden="true" />
              ) : (
                <Info className="h-4 w-4 shrink-0 text-accent-blue" aria-hidden="true" />
              )}
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}
