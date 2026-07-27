import { Badge } from "@/components/ui/Badge";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { formatCompactNumber } from "@/lib/utils";

const CHANNELS = [
  { name: "YouTube", views: 42800, orders: 210 },
  { name: "Shorts", views: 68200, orders: 340 },
  { name: "Blog", views: 12400, orders: 58 },
  { name: "Instagram", views: 51600, orders: 264 },
  { name: "TikTok", views: 33900, orders: 176 },
  { name: "Direct Link", views: 9800, orders: 84 },
];

export function ChannelPerformance() {
  const maxViews = Math.max(...CHANNELS.map((channel) => channel.views));

  return (
    <GlassPanel className="rounded-xl p-5">
      <div className="mb-4 flex items-center gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-foreground-subtle">채널별 성과</p>
        <Badge tone="mock">DEMO</Badge>
      </div>
      <div className="flex flex-col gap-3">
        {CHANNELS.map((channel) => (
          <div key={channel.name}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-foreground">{channel.name}</span>
              <span className="text-foreground-subtle">
                {formatCompactNumber(channel.views)} views · {channel.orders}건 주문
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-surface-strong">
              <div
                className="h-full rounded-full bg-accent-blue"
                style={{ width: `${(channel.views / maxViews) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}
