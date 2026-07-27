"use client";

import { useSyncExternalStore } from "react";
import { aiJobQueue } from "@/ai/gateway/job-queue";
import type { AiJob } from "@/ai/types/job";

// Jobs are created via AiGateway (server-safe, no hooks). Components read
// their live progress/status through this hook, which is just a thin
// useSyncExternalStore wrapper over the same in-memory Job Queue.
export function useAiJob(jobId: string | null): AiJob | null {
  const jobs = useSyncExternalStore(aiJobQueue.subscribe, aiJobQueue.getSnapshot, aiJobQueue.getSnapshot);
  if (!jobId) return null;
  return jobs.find((job) => job.id === jobId) ?? null;
}
