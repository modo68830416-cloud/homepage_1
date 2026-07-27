import { NextResponse } from "next/server";
import { products } from "@/data/products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit") ?? "20");

  const trending = [...products].sort((a, b) => b.trendScore - a.trendScore).slice(0, limit);

  return NextResponse.json({ trends: trending, isDemo: true });
}
