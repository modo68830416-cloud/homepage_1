import { Repository } from "@/repositories/base-repository";
import type { CommerceMetrics } from "@/types/commerce";

// Seeded baseline so the DEMO dashboard doesn't start at zero — these are
// clearly marked DEMO everywhere they're displayed, never presented as real.
const BASELINE: CommerceMetrics = {
  look_opened: 18420,
  product_clicked: 6840,
  add_to_cart: 2310,
  purchase_started: 940,
  qr_scanned: 512,
};

export const commerceMetricsRepository = new Repository<CommerceMetrics>(
  "fashion-creator:commerce-metrics",
  BASELINE,
);
