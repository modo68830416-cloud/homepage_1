import { TrainFront, Bus, School, Cross, ShoppingCart, Trees, Store } from "lucide-react";
import type { NearbyCategory, NearbyPlace } from "@/types/property";

const CATEGORY_ICON: Record<NearbyCategory, typeof TrainFront> = {
  지하철: TrainFront,
  버스: Bus,
  학교: School,
  병원: Cross,
  마트: ShoppingCart,
  공원: Trees,
  편의점: Store,
};

export function NearbySection({ nearby }: { nearby: NearbyPlace[] }) {
  return (
    <div>
      <h2 className="font-serif text-[length:var(--font-size-heading-2)] font-bold text-[var(--text-primary)]">
        주변 시설
      </h2>
      <ul className="mt-4 space-y-2">
        {nearby.map((place) => {
          const Icon = CATEGORY_ICON[place.category];
          return (
            <li
              key={place.name}
              className="flex items-center justify-between rounded-[var(--radius-md)] border border-[var(--border-default)] px-4 py-3"
            >
              <span className="flex items-center gap-2.5 text-[var(--text-primary)]">
                <Icon size={18} className="text-[var(--color-primary-600)]" />
                <span className="font-medium">{place.name}</span>
                <span className="text-[length:var(--font-size-body-sm)] text-[var(--text-secondary)]">
                  {place.category}
                </span>
              </span>
              <span className="text-[length:var(--font-size-body-sm)] text-[var(--text-secondary)]">
                {place.distanceM >= 1000
                  ? `${(place.distanceM / 1000).toFixed(1)}km`
                  : `${place.distanceM}m`}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
