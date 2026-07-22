"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
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
        <h1 className="text-lg font-bold mb-1">로그인</h1>
        <p className="text-xs text-[var(--text-secondary)] mb-6">
          이번 데모 범위에서는 회원 로그인이 실제로 구현되어 있지 않습니다. 관심 있으시면 아래로 문의해 주세요.
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
          로그인
        </button>

        {submitted && (
          <p role="status" className="mt-4 text-sm text-[var(--color-info-500)]">
            데모 환경에서는 실제 로그인이 지원되지 않습니다. 준비되는 대로 안내드릴게요.
          </p>
        )}

        <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
          계정이 없으신가요?{" "}
          <Link href="/account/signup" className="text-[var(--color-info-500)] underline">
            회원가입
          </Link>
        </p>
      </form>
    </div>
  );
}
