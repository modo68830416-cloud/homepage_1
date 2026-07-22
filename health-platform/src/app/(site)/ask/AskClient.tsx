"use client";

import { useState } from "react";
import { EmergencyBanner } from "@/components/content/EmergencyBanner";
import { DisclaimerNote } from "@/components/content/DisclaimerNote";
import { RelatedContent } from "@/components/content/RelatedContent";
import { RelatedProducts } from "@/components/commerce/RelatedProducts";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Skeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import type { AskResponse } from "@/lib/search/ask";

const SAMPLE_QUESTIONS = ["두통이 3일째 계속되는데 병원에 가야 할까요?", "고혈압인데 어떤 운동이 좋을까요?", "잠이 안 올 때 어떻게 해야 하나요?"];

export function AskClient() {
  const [question, setQuestion] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [answer, setAnswer] = useState<AskResponse | null>(null);

  async function submitQuestion(value: string) {
    if (!value.trim()) return;
    setStatus("loading");
    setAnswer(null);
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: value }),
      });
      if (!res.ok) throw new Error("request failed");
      const data: AskResponse = await res.json();
      setAnswer(data);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-14">
      <h1 className="text-[length:var(--font-size-heading-1)] font-bold mb-2">건강 질문하기</h1>
      <p className="text-sm text-[var(--text-secondary)] mb-6">
        자연어로 편하게 질문해보세요. AI는 진단하지 않으며 일반 정보만 제공합니다.
      </p>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          submitQuestion(question);
        }}
        className="flex gap-2 mb-4"
      >
        <input
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="예: 두통이 3일째 계속되는데 병원에 가야 할까요?"
          className="flex-1 rounded-full border border-[var(--border-default)] px-4 py-3 outline-none focus:border-[var(--color-info-500)]"
        />
        <MagneticButton
          type="submit"
          className="rounded-full bg-[var(--color-brand-600)] text-white px-6 py-3 font-semibold shrink-0"
          aria-label="질문 보내기"
        >
          질문하기
        </MagneticButton>
      </form>

      <div className="flex flex-wrap gap-2 mb-10">
        {SAMPLE_QUESTIONS.map((sample) => (
          <button
            key={sample}
            type="button"
            onClick={() => {
              setQuestion(sample);
              submitQuestion(sample);
            }}
            className="text-xs rounded-full border border-[var(--border-default)] px-3 py-1.5 text-[var(--text-secondary)]"
          >
            {sample}
          </button>
        ))}
      </div>

      {status === "loading" && (
        <div className="space-y-3">
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      )}

      {status === "error" && <ErrorState onRetry={() => submitQuestion(question)} />}

      {answer && status === "idle" && (
        <div className="space-y-8">
          <section>
            <p className="text-xs text-[var(--text-secondary)] mb-1">질문 요약</p>
            <p className="font-medium">{answer.questionSummary}</p>
          </section>

          {answer.emergency.isEmergency && answer.emergency.note && (
            <EmergencyBanner note={answer.emergency.note} />
          )}

          <section>
            <p className="text-xs text-[var(--text-secondary)] mb-1">관련 일반정보</p>
            <p>{answer.generalInfo}</p>
          </section>

          {answer.relatedTopics.length > 0 && (
            <section>
              <p className="text-xs text-[var(--text-secondary)] mb-2">관련 증상·주제</p>
              <div className="flex flex-wrap gap-2">
                {answer.relatedTopics.map((topic) => (
                  <span key={topic} className="text-xs rounded-full bg-[var(--color-surface-50)] px-3 py-1">
                    {topic}
                  </span>
                ))}
              </div>
            </section>
          )}

          {answer.lifestyleGuidance.length > 0 && (
            <section>
              <p className="text-xs text-[var(--text-secondary)] mb-2">생활관리 정보</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {answer.lifestyleGuidance.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          <RelatedContent articles={answer.relatedArticles} />
          <RelatedProducts products={answer.relatedProducts} />

          <section>
            <p className="text-xs text-[var(--text-secondary)] mb-1">전문가 상담 안내</p>
            <p className="text-sm">{answer.professionalAdvice}</p>
          </section>

          {answer.sources.length > 0 && (
            <section>
              <p className="text-xs text-[var(--text-secondary)] mb-1">근거·출처</p>
              <ul className="text-sm text-[var(--text-secondary)]">
                {answer.sources.map((source) => (
                  <li key={source.label}>
                    <a href={source.url}>{source.label}</a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <DisclaimerNote />
        </div>
      )}
    </div>
  );
}
