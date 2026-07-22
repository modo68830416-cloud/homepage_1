import { NextRequest, NextResponse } from "next/server";
import { getAutocompleteSuggestions, getPopularQueries } from "@/lib/search/engine";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") ?? "";

  if (!query) {
    return NextResponse.json({ suggestions: getPopularQueries(), source: "popular" });
  }

  return NextResponse.json({ suggestions: getAutocompleteSuggestions(query), source: "query" });
}
