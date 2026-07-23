"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Lock, Info } from "lucide-react";

export function LoginForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="mx-auto max-w-sm px-6 py-16">
      <h1 className="text-center font-serif text-[length:var(--font-size-heading-1)] font-bold text-[var(--text-primary)]">
        로그인
      </h1>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
        className="mt-8 space-y-4"
      >
        <div>
          <label htmlFor="email" className="text-[length:var(--font-size-body-sm)] font-medium text-[var(--text-primary)]">
            이메일
          </label>
          <div className="mt-1.5 flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border-default)] px-4 py-2.5 focus-within:border-[var(--color-primary-600)]">
            <Mail size={16} className="text-[var(--text-secondary)]" />
            <input
              id="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full outline-none"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="text-[length:var(--font-size-body-sm)] font-medium text-[var(--text-primary)]">
            비밀번호
          </label>
          <div className="mt-1.5 flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border-default)] px-4 py-2.5 focus-within:border-[var(--color-primary-600)]">
            <Lock size={16} className="text-[var(--text-secondary)]" />
            <input
              id="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-[var(--color-primary-900)] py-3 font-semibold text-white transition hover:opacity-90"
        >
          로그인
        </button>

        {submitted && (
          <p className="flex items-start gap-1.5 rounded-[var(--radius-md)] bg-[var(--bg-surface)] px-3 py-2.5 text-[length:var(--font-size-body-sm)] text-[var(--text-secondary)]">
            <Info size={16} className="mt-0.5 shrink-0" />
            데모 환경입니다 — 실제 로그인은 처리되지 않습니다.
          </p>
        )}
      </form>

      <p className="mt-6 text-center text-[length:var(--font-size-body-sm)] text-[var(--text-secondary)]">
        아직 회원이 아니신가요?{" "}
        <Link href="/signup" className="font-semibold text-[var(--color-primary-600)]">
          회원가입
        </Link>
      </p>
    </div>
  );
}
