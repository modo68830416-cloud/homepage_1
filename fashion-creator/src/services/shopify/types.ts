export type ShopifyMoney = {
  amount: string;
  currencyCode: string;
};

export type ShopifyProduct = {
  id: string;
  title: string;
  handle: string;
  vendor: string;
  productType: string;
  tags: string[];
  description: string;
  featuredImage: { url: string; altText: string | null } | null;
  priceRange: { minVariantPrice: ShopifyMoney };
  compareAtPriceRange?: { maxVariantPrice: ShopifyMoney };
};

export type ShopifyProductsResponse = {
  products: { nodes: ShopifyProduct[] };
};
