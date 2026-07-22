"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6 py-20">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
        className="w-full max-w-sm rounded-[var(--radius-md)] border border-[var(--border-default)] bg-[var(--color-surface-0)] p-8"
      >
        <h1 className="text-lg font-bold mb-1">회원가입</h1>
        <p className="text-xs text-[var(--text-secondary)] mb-6">
          이번 데모 범위에서는 회원가입이 실제로 구현되어 있지 않습니다. 관심 주제를 남겨두시면 준비되는 대로 안내드립니다.
        </p>

        <label htmlFor="email" className="block text-sm font-medium mb-2">
          이메일
        </label>
        <input
          id="email"
          type="email"
          required
          placeholder="you@example.com"
          className="w-full rounded border border-[var(--border-default)] px-3 py-2 mb-4 text-sm"
        />

        <label htmlFor="password" className="block text-sm font-medium mb-2">
          비밀번호
        </label>
        <input
          id="password"
          type="password"
          required
          placeholder="••••••••"
          className="w-full rounded border border-[var(--border-default)] px-3 py-2 mb-6 text-sm"
        />

        <button
          type="submit"
          className="w-full rounded-full bg-[var(--color-brand-600)] text-white px-6 py-3 font-semibold"
        >
          회원가입
        </button>

        {submitted && (
          <p role="status" className="mt-4 text-sm text-[var(--color-info-500)]">
            데모 환경에서는 실제 회원가입이 지원되지 않습니다. 준비되는 대로 안내드릴게요.
          </p>
        )}

        <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
          이미 계정이 있으신가요?{" "}
          <Link href="/account/login" className="text-[var(--color-info-500)] underline">
            로그인
          </Link>
        </p>
      </form>
    </div>
  );
}
