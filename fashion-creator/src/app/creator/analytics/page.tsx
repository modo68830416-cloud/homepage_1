import type { Metadata } from "next";
import { CreatorAnalyticsView } from "@/components/creator/creator-analytics-view";

export const metadata: Metadata = {
  title: "Creator Analytics",
  description: "콘텐츠, 채널, 상품별 성과와 AI 인사이트를 확인하세요.",
};

export default function CreatorAnalyticsPage() {
  return <CreatorAnalyticsView />;
}
