import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products/data";
import { logAffiliateClick } from "@/lib/commerce/affiliate-tracking";
import { ExternalRedirectNotice } from "@/components/commerce/ExternalRedirectNotice";

interface GoPageProps {
  params: Promise<{ trackingId: string }>;
}

export const metadata = { robots: { index: false, follow: false } };

/**
 * Affiliate redirect interstitial — url-policy.md §6. `trackingId` is the
 * product slug in this scaffold; a real implementation would issue opaque
 * per-click tokens instead.
 */
export default async function AffiliateRedirectPage({ params }: GoPageProps) {
  const { trackingId } = await params;
  const product = getProductBySlug(trackingId);

  if (!product || product.saleType !== "AFFILIATE") notFound();

  logAffiliateClick(product.slug);

  return (
    <ExternalRedirectNotice
      externalUrl={product.externalUrl}
      merchantName={product.merchantName}
      priceAsOf={product.priceAsOf}
    />
  );
}
