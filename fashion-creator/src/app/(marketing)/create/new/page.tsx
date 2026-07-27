import type { Metadata } from "next";
import { CreateNewClient } from "@/components/content-studio/create-new-client";

export const metadata: Metadata = {
  title: "Create New Content",
  description: "저장한 Look으로 이미지, 쇼츠, 릴스, 유튜브, 블로그 콘텐츠를 생성하세요.",
};

export default function CreateNewContentPage() {
  return <CreateNewClient />;
}
