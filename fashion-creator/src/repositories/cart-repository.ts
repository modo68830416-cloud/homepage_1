import { Repository } from "@/repositories/base-repository";
import type { CartItem } from "@/types/commerce";

// Cart lines are keyed by productId rather than a synthetic id, so this
// stays a plain Repository<CartItem[]> instead of the id-based ListRepository.
export const cartRepository = new Repository<CartItem[]>("fashion-creator:cart", []);
