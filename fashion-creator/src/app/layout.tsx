import type { Metadata, Viewport } from "next";
import "./globals.css";

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
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
