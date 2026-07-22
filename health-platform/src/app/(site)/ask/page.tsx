import type { Metadata } from "next";
import { AskClient } from "./AskClient";

export const metadata: Metadata = {
  title: "건강 질문하기",
  description: "자연어로 건강 관련 질문을 하면 검수된 정보를 기반으로 안내해드립니다. 진단을 대체하지 않습니다.",
};

export default function AskPage() {
  return <AskClient />;
}
