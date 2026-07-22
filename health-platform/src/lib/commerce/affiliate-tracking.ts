import "server-only";

export interface AffiliateClickLog {
  productSlug: string;
  timestamp: string;
}

/** In-memory click log — a real deployment persists this for reconciliation with merchant reports. */
const clicks: AffiliateClickLog[] = [];

export function logAffiliateClick(productSlug: string) {
  clicks.push({ productSlug, timestamp: new Date().toISOString() });
}

export function getAffiliateClicks(): AffiliateClickLog[] {
  return clicks;
}
