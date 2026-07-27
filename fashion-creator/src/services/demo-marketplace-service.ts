import { calculateLicensePrice } from "@/lib/license-pricing";

export type DemoCheckoutResult = {
  orderId: string;
  status: "confirmed";
  total: number;
  confirmedAt: string;
};

// Shared DEMO checkout used by both the LOOK-purchase flow and the
// marketplace license-purchase flow — no real payment happens here, but the
// result shape is what a real checkout/payment API would return, so the
// checkout modal doesn't need to change when one is connected.
export const DemoMarketplaceService = {
  calculateLicensePrice,

  simulateCheckout(total: number): DemoCheckoutResult {
    return {
      orderId: `demo-order-${Date.now()}`,
      status: "confirmed",
      total,
      confirmedAt: new Date().toISOString(),
    };
  },
};
