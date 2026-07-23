import type { Metadata } from "next";
import { getAllInquiries } from "@/db/queries";
import { InquiryManager } from "@/components/admin/InquiryManager";

export const metadata: Metadata = {
  title: "문의관리 — 관리자",
};

export default async function AdminInquiriesPage() {
  const initialRows = await getAllInquiries();
  return <InquiryManager initialRows={initialRows} />;
}
