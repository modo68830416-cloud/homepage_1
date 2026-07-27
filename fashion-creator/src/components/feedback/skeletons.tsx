import { cn } from "@/lib/utils";

function Line({ className }: { className?: string }) {
  return <div className={cn("skeleton-shimmer rounded-md", className)} />;
}

export function ProductCardSkeleton() {
  return (
    <div className="glass-panel flex flex-col overflow-hidden rounded-xl" aria-hidden="true">
      <div className="skeleton-shimmer aspect-[4/5]" />
      <div className="flex flex-col gap-3 p-4">
        <Line className="h-3 w-16" />
        <Line className="h-4 w-3/4" />
        <Line className="h-3 w-1/2" />
        <Line className="mt-2 h-9 w-full rounded-full" />
      </div>
    </div>
  );
}

export function ModelCardSkeleton() {
  return (
    <div className="glass-panel flex flex-col overflow-hidden rounded-xl" aria-hidden="true">
      <div className="skeleton-shimmer aspect-[3/4]" />
      <div className="flex flex-col gap-3 p-4">
        <Line className="h-4 w-2/3" />
        <Line className="h-3 w-1/2" />
      </div>
    </div>
  );
}

export function CreatorCardSkeleton() {
  return (
    <div className="glass-panel flex flex-col gap-4 rounded-xl p-5" aria-hidden="true">
      <div className="flex items-center gap-3">
        <div className="skeleton-shimmer h-14 w-14 shrink-0 rounded-full" />
        <div className="flex-1 space-y-2">
          <Line className="h-3.5 w-2/3" />
          <Line className="h-3 w-1/2" />
        </div>
      </div>
      <Line className="h-3 w-full" />
      <Line className="h-3 w-3/4" />
    </div>
  );
}

export function VideoFrameSkeleton({ className }: { className?: string }) {
  return <div className={cn("skeleton-shimmer aspect-video rounded-xl", className)} aria-hidden="true" />;
}
