import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function ComingSoon({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 py-24 text-center">
      <span className="rounded-full bg-[var(--bg-surface)] px-4 py-1.5 text-[length:var(--font-size-body-sm)] font-medium text-[var(--text-secondary)]">
        준비 중
      </span>
      <h1 className="mt-4 text-[length:var(--font-size-heading-1)] font-bold text-[var(--text-primary)]">
        {title}
      </h1>
      {description && (
        <p className="mt-3 text-[length:var(--font-size-body-md)] text-[var(--text-secondary)]">
          {description}
        </p>
      )}
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--color-primary-600)] px-6 py-3 font-semibold text-white transition hover:opacity-90"
      >
        <ArrowLeft size={18} />
        홈으로 돌아가기
      </Link>
    </div>
  );
}
