export type CommerceEventType =
  | "look_opened"
  | "product_clicked"
  | "add_to_cart"
  | "purchase_started"
  | "qr_scanned";

export type CartItem = {
  productId: string;
  quantity: number;
  addedAt: string;
};

export type CommerceMetrics = Record<CommerceEventType, number>;
