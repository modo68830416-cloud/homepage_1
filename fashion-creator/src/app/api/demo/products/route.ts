import { NextResponse } from "next/server";
import { products } from "@/data/products";

// DEMO Mock API — stands in for a real product catalog API. Filtering by
// category keeps the contract close to what a real endpoint would accept,
// so DemoProductService.fetchCatalog doesn't need to change when this route
// is swapped for a real backend.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  const filtered = category ? products.filter((product) => product.category === category) : products;

  return NextResponse.json({ products: filtered, isDemo: true });
}
