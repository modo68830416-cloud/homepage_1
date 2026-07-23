import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";

export function MobileStickyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[var(--z-sticky)] flex gap-2 border-t border-[var(--border-default)] bg-[var(--bg-page)] p-3 lg:hidden">
      <a
        href="tel:1588-0000"
        className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[var(--border-default)] py-3 font-semibold text-[var(--text-primary)]"
      >
        <Phone size={16} />
        전화하기
      </a>
      <Link
        href="/contact"
        className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[var(--color-primary-600)] py-3 font-semibold text-white"
      >
        <MessageCircle size={16} />
        상담 문의하기
      </Link>
    </div>
  );
}
