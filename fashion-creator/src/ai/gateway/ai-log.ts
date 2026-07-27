export type AiLogEventType = "request" | "response" | "failure" | "retry" | "cancel";

export type AiLogEvent = {
  id: string;
  type: AiLogEventType;
  jobId: string;
  provider: string;
  message: string;
  at: string;
};

// Central log for every AI request/response/failure/retry/cancel
// (Sprint-03 §9) — in-memory, capped, and reset on reload like the Job
// Queue itself; a real backend would ship this to observability instead.
const MAX_LOGS = 200;
let logs: AiLogEvent[] = [];
const listeners = new Set<() => void>();

export function logAiEvent(input: Omit<AiLogEvent, "id" | "at">): void {
  const event: AiLogEvent = {
    ...input,
    id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    at: new Date().toISOString(),
  };
  logs = [event, ...logs].slice(0, MAX_LOGS);
  listeners.forEach((listener) => listener());
}

export function getAiLogs(): AiLogEvent[] {
  return logs;
}

export function subscribeAiLogs(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
