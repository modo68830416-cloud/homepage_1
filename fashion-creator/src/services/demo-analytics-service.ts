import { revenueTransactions } from "@/data/creator-business";
import type { CartItem, CommerceMetrics } from "@/types/commerce";
import type { MarketplaceOrder } from "@/types/marketplace";

const CLOSED_STATUSES = new Set(["completed", "cancelled", "refunded"]);

export type DashboardOverview = {
  savedLooksCount: number;
  contentProjectsCount: number;
  cartItemsCount: number;
  favoriteProductsCount: number;
  activeOrdersCount: number;
  completedOrdersCount: number;
  commerceMetrics: CommerceMetrics;
  demoRevenueTotal: number;
};

// Pure — takes repository snapshots as input instead of reading repositories
// itself. `useDashboardOverview` (src/lib/analytics-store.ts) supplies those
// snapshots via useSyncExternalStore so SSR and the client's first paint
// agree; reading repositories directly here would re-introduce the same
// hydration-mismatch bug the PointerGlow fix addressed earlier.
export const DemoAnalyticsService = {
  computeOverview(input: {
    savedLooksCount: number;
    contentProjectsCount: number;
    favoriteProductsCount: number;
    cartItems: CartItem[];
    orders: MarketplaceOrder[];
    commerceMetrics: CommerceMetrics;
  }): DashboardOverview {
    return {
      savedLooksCount: input.savedLooksCount,
      contentProjectsCount: input.contentProjectsCount,
      cartItemsCount: input.cartItems.reduce((sum, item) => sum + item.quantity, 0),
      favoriteProductsCount: input.favoriteProductsCount,
      activeOrdersCount: input.orders.filter((order) => !CLOSED_STATUSES.has(order.status)).length,
      completedOrdersCount: input.orders.filter((order) => order.status === "completed").length,
      commerceMetrics: input.commerceMetrics,
      demoRevenueTotal: revenueTransactions.reduce((sum, txn) => sum + txn.creatorEarning, 0),
    };
  },
};
