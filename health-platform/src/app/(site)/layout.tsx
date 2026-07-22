import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/motion/PageTransition";
import { CartProvider } from "@/lib/commerce/cart";

/** Shared shell for all public-facing routes. /admin (TASK-008) intentionally does not use this layout. */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <Header />
      <PageTransition>
        <main className="wide flex-1">{children}</main>
      </PageTransition>
      <Footer />
    </CartProvider>
  );
}
