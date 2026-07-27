import type { Metadata } from "next";
import { products } from "@/data/products";
import { StudioWorkspace } from "@/components/studio/studio-workspace";

export const metadata: Metadata = {
  title: "Studio",
  description: "AI 모델에게 상품을 코디하고 Look을 저장하는 가상 스타일링 스튜디오입니다.",
};

export default function StudioPage() {
  return (
    <>
      <div className="mx-auto max-w-[1600px] px-5 pb-6 pt-10 sm:px-8 sm:pt-14">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Virtual Styling Studio</h1>
        <p className="mt-1.5 text-sm text-foreground-muted">
          왼쪽에서 상품을 고르고, 가운데에서 코디를 확인하고, 오른쪽에서 Look을 저장하세요.
        </p>
      </div>
      <StudioWorkspace products={products} />
    </>
  );
}
