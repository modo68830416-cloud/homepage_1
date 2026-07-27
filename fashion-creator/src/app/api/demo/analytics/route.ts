import { NextResponse } from "next/server";
import { creatorAnalyticsSeries, creatorInsights } from "@/data/creator-business";

// Serves the DEMO analytics baseline (fixture time series + AI insight
// cards). The user-activity counters (saved looks, content projects, cart,
// orders) are NOT here — those come from DemoAnalyticsService, derived live
// from the visitor's own local Repositories.
export async function GET() {
  return NextResponse.json({ series: creatorAnalyticsSeries, insights: creatorInsights, isDemo: true });
}
