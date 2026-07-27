import { Sparkle } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-lime text-[#0a0a0a]">
        <Sparkle className="h-6 w-6 animate-pulse" strokeWidth={2.25} aria-hidden="true" />
      </span>
      <div className="h-px w-40 overflow-hidden bg-border">
        <div className="h-full w-1/3 animate-[loading-line_1.1s_ease-in-out_infinite] bg-gradient-to-r from-accent-lime via-accent-pink to-accent-violet" />
      </div>
      <p className="text-xs uppercase tracking-[0.3em] text-foreground-subtle">Fashion Creator</p>
      <style>{`
        @keyframes loading-line {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  );
}
