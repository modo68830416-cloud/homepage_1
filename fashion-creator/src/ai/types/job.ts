export type AiJobStatus = "queued" | "processing" | "completed" | "failed" | "cancelled";

export type AiJobKind =
  | "avatar"
  | "tryon"
  | "image"
  | "video"
  | "prompt"
  | "trend"
  | "recommendation";

// Every Provider's output gets normalized into this shape before it reaches
// the UI (Sprint-03 §6 "AI 결과 표준화") — a real provider can change what
// happens inside the Job, but never this contract.
export type AiResult = {
  jobId: string;
  status: AiJobStatus;
  previewUrl: string | null;
  downloadUrl: string | null;
  thumbnail: string | null;
  logs: string[];
  provider: string;
  createdAt: string;
};

export type AiJob = {
  id: string;
  kind: AiJobKind;
  provider: string;
  status: AiJobStatus;
  progress: number;
  etaSeconds: number | null;
  createdAt: string;
  updatedAt: string;
  steps: string[];
  activeStepIndex: number;
  result: AiResult | null;
  error: string | null;
};
