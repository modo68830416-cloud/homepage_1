import { logAiEvent } from "@/ai/gateway/ai-log";
import type { AiJob, AiJobKind, AiResult } from "@/ai/types/job";

// In-memory Job Queue — queued/processing/completed/failed/cancelled with
// progress + ETA (Sprint-03 §4). Jobs are DEMO-scoped and short-lived (a
// content/avatar generation takes a few seconds), so they intentionally do
// not survive a full reload, same as the phase state the Studio components
// already kept locally before this Sprint.
class AiJobQueue {
  private jobs = new Map<string, AiJob>();
  private listeners = new Set<() => void>();
  // useSyncExternalStore compares snapshots with Object.is — getSnapshot
  // must return the same array reference until something actually changes,
  // or every render looks "changed" and React loops forever re-rendering.
  private cachedSnapshot: AiJob[] | null = null;

  private notify() {
    this.cachedSnapshot = null;
    this.listeners.forEach((listener) => listener());
  }

  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getSnapshot = (): AiJob[] => {
    if (!this.cachedSnapshot) {
      this.cachedSnapshot = Array.from(this.jobs.values());
    }
    return this.cachedSnapshot;
  };

  get(id: string): AiJob | undefined {
    return this.jobs.get(id);
  }

  create(kind: AiJobKind, provider: string, steps: string[]): AiJob {
    const now = new Date().toISOString();
    const job: AiJob = {
      id: `job-${kind}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      kind,
      provider,
      status: "queued",
      progress: 0,
      etaSeconds: steps.length,
      createdAt: now,
      updatedAt: now,
      steps,
      activeStepIndex: 0,
      result: null,
      error: null,
    };
    this.jobs.set(job.id, job);
    logAiEvent({ type: "request", jobId: job.id, provider, message: `${kind} job queued` });
    this.notify();
    return job;
  }

  private patch(id: string, patch: Partial<AiJob>) {
    const current = this.jobs.get(id);
    if (!current) return;
    this.jobs.set(id, { ...current, ...patch, updatedAt: new Date().toISOString() });
    this.notify();
  }

  advanceStep(id: string): void {
    const current = this.jobs.get(id);
    if (!current) return;
    const nextIndex = Math.min(current.steps.length, current.activeStepIndex + 1);
    const progress = current.steps.length ? Math.round((nextIndex / current.steps.length) * 100) : 100;
    this.patch(id, {
      status: "processing",
      activeStepIndex: nextIndex,
      progress,
      etaSeconds: Math.max(0, current.steps.length - nextIndex),
    });
  }

  complete(id: string, result: AiResult): void {
    this.patch(id, { status: "completed", progress: 100, etaSeconds: 0, result });
    logAiEvent({ type: "response", jobId: id, provider: result.provider, message: "job completed" });
  }

  fail(id: string, error: string): void {
    const job = this.jobs.get(id);
    this.patch(id, { status: "failed", error });
    logAiEvent({ type: "failure", jobId: id, provider: job?.provider ?? "unknown", message: error });
  }

  cancel(id: string): void {
    const job = this.jobs.get(id);
    this.patch(id, { status: "cancelled" });
    logAiEvent({ type: "cancel", jobId: id, provider: job?.provider ?? "unknown", message: "job cancelled" });
  }

  retry(id: string): AiJob | null {
    const current = this.jobs.get(id);
    if (!current) return null;
    logAiEvent({ type: "retry", jobId: id, provider: current.provider, message: "job retried" });
    return this.create(current.kind, current.provider, current.steps);
  }
}

export const aiJobQueue = new AiJobQueue();
