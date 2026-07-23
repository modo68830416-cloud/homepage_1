import type { Metadata } from "next";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "프리미엄부동산 — 신뢰할 수 있는 프리미엄 부동산 플랫폼",
    template: "%s | 프리미엄부동산",
  },
  description:
    "검색 중심, 고급 비주얼, 빠른 사용자 경험을 갖춘 차세대 프리미엄 부동산 플랫폼",
  openGraph: {
    title: "프리미엄부동산",
    description:
      "검색 중심, 고급 비주얼, 빠른 사용자 경험을 갖춘 차세대 프리미엄 부동산 플랫폼",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
