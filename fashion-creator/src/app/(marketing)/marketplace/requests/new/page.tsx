import type { Metadata } from "next";
import { PageIntro } from "@/components/home/PageIntro";
import { CustomRequestForm } from "@/components/marketplace/custom-request-form";

export const metadata: Metadata = {
  title: "Custom Production Request",
  description: "원하는 크리에이터에게 주문 제작을 의뢰하세요.",
};

export default function CustomRequestPage() {
  return (
    <>
      <PageIntro eyebrow="Marketplace" title="주문 제작 의뢰" description="원하는 크리에이터에게 상품, 형식, 스타일을 지정해 제작을 의뢰하세요." />
      <section className="px-5 pb-24 sm:px-8">
        <CustomRequestForm />
      </section>
    </>
  );
}
