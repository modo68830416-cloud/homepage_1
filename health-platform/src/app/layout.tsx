import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "@/styles/globals.css";
import { WebVitalsReporter } from "@/components/monitoring/WebVitalsReporter";

const dataMono = JetBrains_Mono({
  variable: "--font-data-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "건강 라이프스타일 플랫폼",
    template: "%s | 건강 라이프스타일 플랫폼",
  },
  description:
    "신뢰할 수 있는 건강정보와 필요한 상품·서비스를 한 곳에서 연결하는 몰입형 건강 라이프스타일 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${dataMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <WebVitalsReporter />
      </body>
    </html>
  );
}
