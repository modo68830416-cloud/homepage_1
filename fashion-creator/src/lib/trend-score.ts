import type { TrendSignals } from "@/types";

const WEIGHTS = {
  searchScore: 0.25,
  contentScore: 0.25,
  salesScore: 0.35,
  growthScore: 0.15,
} as const;

export function calculateTrendScore(signals: TrendSignals): number {
  const weighted =
    signals.searchScore * WEIGHTS.searchScore +
    signals.contentScore * WEIGHTS.contentScore +
    signals.salesScore * WEIGHTS.salesScore +
    signals.growthScore * WEIGHTS.growthScore;

  return Math.round(Math.min(100, Math.max(0, weighted)));
}
