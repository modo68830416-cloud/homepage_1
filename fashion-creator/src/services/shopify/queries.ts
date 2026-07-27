export const BEST_SELLING_PRODUCTS_QUERY = `
  query BestSellingProducts($first: Int!) {
    products(first: $first, sortKey: BEST_SELLING) {
      nodes {
        id
        title
        handle
        vendor
        productType
        tags
        description
        featuredImage {
          url
          altText
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        compareAtPriceRange {
          maxVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;
