import type { Metadata } from "next";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "회사소개",
  description: "회사소개 페이지는 준비 중입니다.",
};

export default function AboutPage() {
  return (
    <ComingSoon
      title="회사소개"
      description="플랫폼을 만든 팀과 비전을 소개하는 페이지를 준비하고 있습니다."
    />
  );
}
