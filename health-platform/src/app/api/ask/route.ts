import { NextRequest, NextResponse } from "next/server";
import { askQuestion } from "@/lib/search/ask";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const question = typeof body?.question === "string" ? body.question.trim() : "";

  if (!question) {
    return NextResponse.json({ error: "질문을 입력해주세요." }, { status: 400 });
  }

  return NextResponse.json(askQuestion(question));
}
