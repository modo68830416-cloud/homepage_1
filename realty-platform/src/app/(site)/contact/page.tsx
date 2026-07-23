import type { Metadata } from "next";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "고객센터",
  description: "고객센터 페이지는 준비 중입니다.",
};

export default function ContactPage() {
  return (
    <ComingSoon
      title="고객센터"
      description="문의 접수와 자주 묻는 질문을 제공하는 고객센터를 준비하고 있습니다."
    />
  );
}
