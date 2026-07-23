import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { ShieldAlert } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";

export default async function AdminRouteLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();

  if (!user) {
    redirect("/login?redirect_url=/admin");
  }

  const role = user.publicMetadata.role;
  if (role !== "ADMIN") {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-6 text-center">
        <ShieldAlert size={40} className="text-[var(--color-accent-red)]" />
        <h1 className="mt-4 text-[length:var(--font-size-heading-1)] font-bold text-[var(--text-primary)]">
          접근 권한이 없습니다
        </h1>
        <p className="mt-3 text-[var(--text-secondary)]">
          관리자 계정으로 로그인해야 이 페이지를 볼 수 있습니다.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--color-primary-600)] px-6 py-3 font-semibold text-white transition hover:opacity-90"
        >
          홈으로 돌아가기
        </Link>
      </div>
    );
  }

  return <AdminLayout>{children}</AdminLayout>;
}
