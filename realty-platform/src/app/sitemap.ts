import type { MetadataRoute } from "next";
import { newsArticles, popularRegions } from "@/lib/properties/mock-data";
import { getAllProperties } from "@/db/queries";

const BASE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/search",
    "/map",
    "/region",
    "/news",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/login",
    "/signup",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));

  const properties = await getAllProperties();
  const propertyRoutes = properties.map((property) => ({
    url: `${BASE_URL}/property/${property.id}`,
    lastModified: new Date(),
  }));

  const regionRoutes = popularRegions.map((region) => ({
    url: `${BASE_URL}/region/${region.id}`,
    lastModified: new Date(),
  }));

  const newsRoutes = newsArticles.map((article) => ({
    url: `${BASE_URL}/news/${article.id}`,
    lastModified: new Date(article.publishedAt),
  }));

  return [...staticRoutes, ...propertyRoutes, ...regionRoutes, ...newsRoutes];
}
