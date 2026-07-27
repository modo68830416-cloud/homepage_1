import { CreatorShell } from "@/components/creator/creator-shell";

export default function CreatorLayout({ children }: { children: React.ReactNode }) {
  return <CreatorShell>{children}</CreatorShell>;
}
