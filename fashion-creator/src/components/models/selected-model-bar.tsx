"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, UserRound } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AvatarPreview } from "@/components/models/avatar-preview";
import { useSelectedModel } from "@/lib/model-store";

export function SelectedModelBar() {
  const { selectedModel } = useSelectedModel();

  return (
    <AnimatePresence>
      {selectedModel && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="glass-panel fixed inset-x-4 bottom-4 z-30 mx-auto flex max-w-xl items-center gap-3 rounded-full py-2 pl-2 pr-3 shadow-lg sm:inset-x-0"
          style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
        >
          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border-strong">
            <AvatarPreview
              imageUrl={selectedModel.previewImageUrl}
              seed={selectedModel.modelId}
              icon={UserRound}
              label={selectedModel.modelName}
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-foreground-subtle">선택한 모델</p>
            <p className="truncate text-sm font-semibold text-foreground">{selectedModel.modelName}</p>
          </div>
          <Button href="/studio" variant="primary" className="shrink-0 text-xs">
            코디 스튜디오로 이동
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
