import type { NextConfig } from "next";

// docs/new-project-tasks/TASK-010.md §7 보안 요구사항 — 모든 응답에 적용.
// 'unsafe-eval'은 dev 전용: React dev 모드 스택 트레이스 재구성에 필요하며
// 프로덕션은 eval()을 호출하지 않으므로 prod CSP는 엄격하게 유지한다.
// Clerk(인증)는 자체 서브도메인에서 스크립트/이미지를 로드하므로 별도 허용 필요.
const scriptSrc =
  process.env.NODE_ENV === "production"
    ? "script-src 'self' 'unsafe-inline' https://*.clerk.accounts.dev https://*.clerk.com"
    : "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.clerk.accounts.dev https://*.clerk.com";

const CSP = [
  "default-src 'self'",
  scriptSrc,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://images.unsplash.com https://img.clerk.com",
  "font-src 'self' data:",
  "connect-src 'self' https://*.clerk.accounts.dev https://*.clerk.com https://clerk-telemetry.com",
  "worker-src 'self' blob:",
  "frame-src https://*.clerk.accounts.dev https://*.clerk.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CSP },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
    ];
  },
};

export default nextConfig;
