import { ListRepository } from "@/repositories/base-repository";
import { marketplaceOrders } from "@/data/marketplace";
import type { CampaignApplication, CustomProductionRequest, MarketplaceOrder } from "@/types/marketplace";

export const campaignApplicationRepository = new ListRepository<CampaignApplication>(
  "fashion-creator:campaign-applications",
  [],
);

export const customRequestRepository = new ListRepository<CustomProductionRequest>(
  "fashion-creator:custom-requests",
  [],
);

export const marketplaceOrderRepository = new ListRepository<MarketplaceOrder>(
  "fashion-creator:marketplace-orders",
  marketplaceOrders,
);
