import { NextRequest, NextResponse } from "next/server";
import { search } from "@/lib/search/engine";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") ?? "";
  const type = request.nextUrl.searchParams.get("type");

  const response = search(query);

  if (type === "health") {
    return NextResponse.json({ ...response, productResults: [] });
  }
  if (type === "product") {
    return NextResponse.json({ ...response, articleResults: [] });
  }

  return NextResponse.json(response);
}
