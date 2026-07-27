import type { LucideIcon } from "lucide-react";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { cn } from "@/lib/utils";

type ProductImageProps = {
  imageUrl?: string;
  seed: string;
  icon: LucideIcon;
  label?: string;
  className?: string;
};

// Same pattern as AvatarPreview: renders the real product photo when a
// product came from a connected commerce store, otherwise falls back to
// the DEMO gradient placeholder exactly as every product card did before.
export function ProductImage({ imageUrl, seed, icon, label, className }: ProductImageProps) {
  if (imageUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- external store-hosted photo, not a static/optimizable local asset
      <img src={imageUrl} alt={label ?? "Product photo"} className={cn("h-full w-full object-cover", className)} />
    );
  }
  return <PlaceholderArt seed={seed} icon={icon} label={label} className={className} />;
}
