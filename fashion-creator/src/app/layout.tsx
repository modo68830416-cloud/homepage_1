import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ReducedMotionProvider } from "@/components/motion/reduced-motion-provider";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { PointerGlow } from "@/components/motion/pointer-glow";
import { GrainOverlay } from "@/components/motion/grain-overlay";
import { ToastProvider } from "@/components/feedback/toast";

const SITE_URL = "https://fashion-creator.vercel.app";
const TITLE = "Fashion Creator — AI Fashion Content Commerce Platform";
const DESCRIPTION =
  "AI 모델과 아바타에게 패션을 코디하고, 영상과 쇼츠를 만들어 구매와 수익으로 연결하세요.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — Fashion Creator",
  },
  description: DESCRIPTION,
  applicationName: "Fashion Creator",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    languages: {
      ko: "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: "Fashion Creator",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#070707",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="relative flex min-h-full flex-col">
        <ReducedMotionProvider>
          <ScrollProgress />
          <PointerGlow />
          <GrainOverlay />
          <ToastProvider>
            <div className="relative z-[2] flex min-h-full flex-1 flex-col">{children}</div>
          </ToastProvider>
        </ReducedMotionProvider>
      </body>
    </html>
  );
}
