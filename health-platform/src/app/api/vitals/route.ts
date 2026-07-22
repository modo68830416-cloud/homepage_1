import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Minimal collection endpoint — logs only. A real deployment forwards to APM/RUM storage. */
export async function POST(request: NextRequest) {
  const metric = await request.json().catch(() => null);
  if (metric) {
    console.log(`[web-vitals] ${metric.name}: ${metric.value}`);
  }
  return NextResponse.json({ ok: true });
}
