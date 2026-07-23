import type { Metadata } from "next";
import { InquiryManager } from "@/components/admin/InquiryManager";

export const metadata: Metadata = {
  title: "문의관리 — 관리자",
};

export default function AdminInquiriesPage() {
  return <InquiryManager />;
}
