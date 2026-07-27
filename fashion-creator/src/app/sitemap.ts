import type { MetadataRoute } from "next";
import { looks } from "@/data/creators";
import { products } from "@/data/products";
import { marketplaceCampaigns, marketplaceContent, marketplaceCreators } from "@/data/marketplace";

const SITE_URL = "https://fashion-creator.vercel.app";

const routes = [
  "/",
  "/trends",
  "/models",
  "/models/create",
  "/studio",
  "/create",
  "/create/new",
  "/marketplace",
  "/marketplace/creators",
  "/marketplace/content",
  "/marketplace/campaigns",
  "/marketplace/requests/new",
  "/pricing",
  "/creator",
  "/creator/analytics",
  "/creator/revenue",
  "/creator/settlements",
  "/creator/subscription",
  "/creator/settings",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));

  const lookRoutes = looks.map((look) => ({
    url: `${SITE_URL}/look/${look.slug}`,
    lastModified: new Date(),
  }));

  const productRoutes = products.map((product) => ({
    url: `${SITE_URL}/trends/${product.slug}`,
    lastModified: new Date(),
  }));

  const creatorRoutes = marketplaceCreators.map((creator) => ({
    url: `${SITE_URL}/marketplace/creators/${creator.handle.replace("@", "")}`,
    lastModified: new Date(),
  }));

  const contentRoutes = marketplaceContent.map((content) => ({
    url: `${SITE_URL}/marketplace/content/${content.slug}`,
    lastModified: new Date(),
  }));

  const campaignRoutes = marketplaceCampaigns.map((campaign) => ({
    url: `${SITE_URL}/marketplace/campaigns/${campaign.slug}`,
    lastModified: new Date(),
  }));

  return [
    ...staticRoutes,
    ...lookRoutes,
    ...productRoutes,
    ...creatorRoutes,
    ...contentRoutes,
    ...campaignRoutes,
  ];
}
