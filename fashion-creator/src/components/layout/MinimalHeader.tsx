import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";

export function MinimalHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8">
        <Logo />
        <Button href="/" variant="ghost" className="text-xs">
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Back to Fashion Creator
        </Button>
      </div>
    </header>
  );
}
