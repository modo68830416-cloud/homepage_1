import type { DigitalProduct } from "@/lib/products/types";

export interface DigitalEntitlement {
  productId: string;
  downloadsRemaining: number | null;
  expiresAt: string | null;
  licenseType: DigitalProduct["digitalEntitlement"]["licenseType"];
}

/** Issued at order completion for DIGITAL line items (TASK-007 §4 디지털상품 UX). */
export function issueEntitlement(product: DigitalProduct): DigitalEntitlement {
  const { downloadLimit, accessDurationDays, licenseType } = product.digitalEntitlement;
  const expiresAt = accessDurationDays
    ? new Date(Date.now() + accessDurationDays * 24 * 60 * 60 * 1000).toISOString()
    : null;

  return {
    productId: product.id,
    downloadsRemaining: downloadLimit,
    expiresAt,
    licenseType,
  };
}
