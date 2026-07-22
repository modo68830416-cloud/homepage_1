/**
 * Full multi-commerce product domain model (TASK-007 §2/§3).
 * `ProductSummary` (the card-sized shape used since TASK-005) is kept as a
 * derived projection so content pages don't need to change.
 */

export type SaleType =
  | "DIRECT"
  | "AFFILIATE"
  | "DROPSHIP"
  | "MARKETPLACE"
  | "DIGITAL"
  | "SUBSCRIPTION"
  | "BOOKING";

export type ProductStatus = "DRAFT" | "PUBLISHED" | "UNPUBLISHED" | "ARCHIVED";

export interface Seller {
  id: string;
  name: string;
  /** Only meaningful for MARKETPLACE — DIRECT-sold products use the platform itself as seller. */
  isPlatform: boolean;
}

export interface InventoryPolicy {
  trackInventory: boolean;
  stock: number | null;
  allowBackorder: boolean;
}

export interface ShippingPolicy {
  feeKrw: number;
  freeShippingThresholdKrw: number | null;
  /** DROPSHIP products from different suppliers often cannot be combined into one parcel. */
  combinedShippingAllowed: boolean;
  estimatedDeliveryDays: string;
}

export interface RefundPolicy {
  windowDays: number;
  description: string;
}

export interface SeoMeta {
  metaTitle: string;
  metaDescription: string;
}

interface ProductBase {
  id: string;
  slug: string;
  title: string;
  brand: string;
  seller: Seller;
  categoryKey: string;
  description: string;
  images: string[];
  price: number;
  compareAtPrice?: number;
  currency: "KRW";
  taxIncluded: boolean;
  status: ProductStatus;
  seo: SeoMeta;
  relatedArticleSlugs: string[];
  /** Must be true for AFFILIATE/MARKETPLACE/DROPSHIP — enforced by the completion criteria in TASK-007 §6. */
  adDisclosure: boolean;
}

export interface DirectProduct extends ProductBase {
  saleType: "DIRECT";
  inventoryPolicy: InventoryPolicy;
  shippingPolicy: ShippingPolicy;
  refundPolicy: RefundPolicy;
}

export interface AffiliateProduct extends ProductBase {
  saleType: "AFFILIATE";
  externalUrl: string;
  priceAsOf: string;
  merchantName: string;
}

export interface DropshipProduct extends ProductBase {
  saleType: "DROPSHIP";
  supplierName: string;
  shippingPolicy: ShippingPolicy;
  refundPolicy: RefundPolicy;
}

export interface MarketplaceProduct extends ProductBase {
  saleType: "MARKETPLACE";
  inventoryPolicy: InventoryPolicy;
  shippingPolicy: ShippingPolicy;
  refundPolicy: RefundPolicy;
}

export interface DigitalProduct extends ProductBase {
  saleType: "DIGITAL";
  digitalEntitlement: {
    downloadLimit: number | null;
    accessDurationDays: number | null;
    licenseType: "PERSONAL" | "PERSONAL_LIFETIME";
  };
}

export interface SubscriptionProduct extends ProductBase {
  saleType: "SUBSCRIPTION";
  subscription: {
    intervalDays: number;
    trialDays: number;
  };
  shippingPolicy?: ShippingPolicy;
}

export interface BookingProduct extends ProductBase {
  saleType: "BOOKING";
  booking: {
    availableSlots: string[];
    durationMinutes: number;
    cancellationPolicy: string;
  };
}

export type Product =
  | DirectProduct
  | AffiliateProduct
  | DropshipProduct
  | MarketplaceProduct
  | DigitalProduct
  | SubscriptionProduct
  | BookingProduct;

/** Card-sized projection used by list/grid components (TASK-005 onward). */
export interface ProductSummary {
  id: string;
  slug: string;
  saleType: SaleType;
  title: string;
  brand: string;
  thumbnail: string;
  price: number;
  compareAtPrice?: number;
  currency: "KRW";
  relatedArticleSlugs: string[];
}

export function toProductSummary(product: Product): ProductSummary {
  return {
    id: product.id,
    slug: product.slug,
    saleType: product.saleType,
    title: product.title,
    brand: product.brand,
    thumbnail: product.images[0] ?? "",
    price: product.price,
    compareAtPrice: product.compareAtPrice,
    currency: product.currency,
    relatedArticleSlugs: product.relatedArticleSlugs,
  };
}

/**
 * Sale types that cannot share a cart with each other or with most other
 * types, per TASK-007 §6 완료조건. BOOKING and AFFILIATE never enter the
 * cart at all (booking confirms immediately, affiliate redirects out).
 */
export const CART_ELIGIBLE_SALE_TYPES: SaleType[] = [
  "DIRECT",
  "DROPSHIP",
  "MARKETPLACE",
  "DIGITAL",
  "SUBSCRIPTION",
];

/** DIGITAL/SUBSCRIPTION checkout is always its own single-item cart — see docs/commerce/cart-policy.md. */
export const SINGLE_ITEM_ONLY_SALE_TYPES: SaleType[] = ["DIGITAL", "SUBSCRIPTION"];
