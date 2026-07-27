import { CreatorSidebar } from "@/components/creator/creator-sidebar";
import { CreatorMobileNav } from "@/components/creator/creator-mobile-nav";

export function CreatorShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-1 flex-col lg:flex-row">
      <CreatorSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <CreatorMobileNav />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
