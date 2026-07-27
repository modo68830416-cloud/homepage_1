import { NextResponse } from "next/server";
import { marketplaceContent } from "@/data/marketplace";

// Serves the public marketplace content catalog. A user's own generated
// Content Studio projects stay in their local Repository, same reasoning as
// /api/demo/looks.
export async function GET() {
  return NextResponse.json({ content: marketplaceContent, isDemo: true });
}
