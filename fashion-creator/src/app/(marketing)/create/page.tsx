import type { Metadata } from "next";
import { ContentHistory } from "@/components/content-studio/content-history";

export const metadata: Metadata = {
  title: "My Content",
  description: "만든 콘텐츠 프로젝트를 확인하고 관리하세요.",
};

export default function CreatePage() {
  return <ContentHistory />;
}
