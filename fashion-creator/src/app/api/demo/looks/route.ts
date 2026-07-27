import { NextResponse } from "next/server";
import { looks } from "@/data/creators";

// Serves the public/showcase LOOKs (e.g. the demo-look used across
// marketing pages). A user's own saved Looks stay in their local Repository
// — they're private DEMO data, not something a shared API should list.
export async function GET() {
  return NextResponse.json({ looks, isDemo: true });
}
