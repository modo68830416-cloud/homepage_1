import { Repository } from "@/repositories/base-repository";

// Session-scoped studio state: the products currently worn on the active
// look, and a most-recently-viewed product trail. Neither has its own
// identity beyond the product id, so a plain string[] repository is enough.
export const wornProductsRepository = new Repository<string[]>(
  "fashion-creator:studio-worn-products",
  [],
);

export const recentlyViewedRepository = new Repository<string[]>(
  "fashion-creator:studio-recently-viewed",
  [],
);
