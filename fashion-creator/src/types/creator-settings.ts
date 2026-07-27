export type BrandKitSettings = {
  brandName: string;
  color: string;
  ctaCopy: string;
  disclosure: string;
};

export type DefaultExportSettings = {
  aspectRatio: "9:16" | "16:9" | "1:1" | "4:5";
  channel: string;
  language: string;
  watermark: boolean;
  hashtags: boolean;
};

export type DemoPaymentMethod = {
  label: string;
  last4: string;
  addedAt: string;
};

export type CreatorSubscriptionState = {
  planName: string;
  creditsRemaining: number;
  paymentMethod: DemoPaymentMethod | null;
};
