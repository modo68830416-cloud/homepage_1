import type { LucideIcon } from "lucide-react";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { cn } from "@/lib/utils";

type AvatarPreviewProps = {
  imageUrl?: string;
  seed: string;
  icon: LucideIcon;
  label?: string;
  className?: string;
};

// Drop-in replacement for PlaceholderArt at every model/avatar preview call
// site: renders the real AI Gateway-generated image when one exists,
// otherwise falls back to the DEMO gradient placeholder exactly as before.
export function AvatarPreview({ imageUrl, seed, icon, label, className }: AvatarPreviewProps) {
  if (imageUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- AI-generated Blob URL, not a static/optimizable local asset
      <img src={imageUrl} alt={label ?? "AI generated avatar"} className={cn("h-full w-full object-cover", className)} />
    );
  }
  return <PlaceholderArt seed={seed} icon={icon} label={label} className={className} />;
}
