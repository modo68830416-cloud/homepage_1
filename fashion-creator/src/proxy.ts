import { clerkMiddleware } from "@clerk/nextjs/server";

// Next.js 16 renamed middleware.ts -> proxy.ts, but Clerk's handler is a
// drop-in default export either way. No route protection here — every page
// in this app stays reachable in Guest Mode; this only makes auth() /
// currentUser() resolve correctly in Server Components and Server Actions.
export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
