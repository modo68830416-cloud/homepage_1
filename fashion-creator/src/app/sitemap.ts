import type { MetadataRoute } from "next";
import { looks } from "@/data/creators";
import { products } from "@/data/products";

const SITE_URL = "https://fashion-creator.vercel.app";

const routes = ["/", "/trends", "/models", "/studio", "/marketplace", "/pricing", "/creator"];

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

  return [...staticRoutes, ...lookRoutes, ...productRoutes];
}
