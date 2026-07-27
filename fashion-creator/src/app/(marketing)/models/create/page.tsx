import type { Metadata } from "next";
import { Suspense } from "react";
import { AvatarWizard } from "@/components/models/avatar-wizard";

export const metadata: Metadata = {
  title: "Create Your Avatar",
  description: "정면 사진 한 장과 간편한 체형 선택으로 나만의 AI 아바타를 만들어보세요.",
};

export default function CreateAvatarPage() {
  return (
    <Suspense fallback={null}>
      <AvatarWizard />
    </Suspense>
  );
}
