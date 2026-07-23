"use client";

import Link from "next/link";
import { useState } from "react";
import { User, Mail, Lock, Phone, Info } from "lucide-react";

export function SignupForm() {
  const [submitted, setSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="mx-auto max-w-sm px-6 py-16">
      <h1 className="text-center text-[length:var(--font-size-heading-1)] font-bold text-[var(--text-primary)]">
        회원가입
      </h1>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
        className="mt-8 space-y-4"
      >
        <div>
          <label htmlFor="name" className="text-[length:var(--font-size-body-sm)] font-medium text-[var(--text-primary)]">
            이름
          </label>
          <div className="mt-1.5 flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border-default)] px-4 py-2.5 focus-within:border-[var(--color-primary-600)]">
            <User size={16} className="text-[var(--text-secondary)]" />
            <input id="name" type="text" required placeholder="홍길동" className="w-full outline-none" />
          </div>
        </div>

        <div>
          <label htmlFor="signup-email" className="text-[length:var(--font-size-body-sm)] font-medium text-[var(--text-primary)]">
            이메일
          </label>
          <div className="mt-1.5 flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border-default)] px-4 py-2.5 focus-within:border-[var(--color-primary-600)]">
            <Mail size={16} className="text-[var(--text-secondary)]" />
            <input id="signup-email" type="email" required placeholder="you@example.com" className="w-full outline-none" />
          </div>
        </div>

        <div>
          <label htmlFor="signup-password" className="text-[length:var(--font-size-body-sm)] font-medium text-[var(--text-primary)]">
            비밀번호
          </label>
          <div className="mt-1.5 flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border-default)] px-4 py-2.5 focus-within:border-[var(--color-primary-600)]">
            <Lock size={16} className="text-[var(--text-secondary)]" />
            <input id="signup-password" type="password" required placeholder="8자 이상" className="w-full outline-none" />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="text-[length:var(--font-size-body-sm)] font-medium text-[var(--text-primary)]">
            휴대폰 번호
          </label>
          <div className="mt-1.5 flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border-default)] px-4 py-2.5 focus-within:border-[var(--color-primary-600)]">
            <Phone size={16} className="text-[var(--text-secondary)]" />
            <input id="phone" type="tel" required placeholder="010-0000-0000" className="w-full outline-none" />
          </div>
        </div>

        <label className="flex items-center gap-2 text-[length:var(--font-size-body-sm)] text-[var(--text-primary)]">
          <input
            type="checkbox"
            required
            checked={agreed}
            onChange={(event) => setAgreed(event.target.checked)}
            className="h-4 w-4 rounded border-[var(--border-default)]"
          />
          <Link href="/terms" className="underline">
            이용약관
          </Link>{" "}
          및{" "}
          <Link href="/privacy" className="underline">
            개인정보처리방침
          </Link>
          에 동의합니다
        </label>

        <button
          type="submit"
          disabled={!agreed}
          className="w-full rounded-full bg-[var(--color-primary-900)] py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          회원가입
        </button>

        {submitted && (
          <p className="flex items-start gap-1.5 rounded-[var(--radius-md)] bg-[var(--bg-surface)] px-3 py-2.5 text-[length:var(--font-size-body-sm)] text-[var(--text-secondary)]">
            <Info size={16} className="mt-0.5 shrink-0" />
            데모 환경입니다 — 실제 가입은 처리되지 않습니다.
          </p>
        )}
      </form>

      <p className="mt-6 text-center text-[length:var(--font-size-body-sm)] text-[var(--text-secondary)]">
        이미 계정이 있으신가요?{" "}
        <Link href="/login" className="font-semibold text-[var(--color-primary-600)]">
          로그인
        </Link>
      </p>
    </div>
  );
}
