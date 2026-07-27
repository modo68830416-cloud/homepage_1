import { Repository } from "@/repositories/base-repository";
import type { BrandKitSettings, CreatorSubscriptionState, DefaultExportSettings } from "@/types/creator-settings";

export const brandKitRepository = new Repository<BrandKitSettings | null>(
  "fashion-creator:creator-brand-kit",
  null,
);

export const defaultExportSettingsRepository = new Repository<DefaultExportSettings | null>(
  "fashion-creator:creator-export-settings",
  null,
);

export const creatorSubscriptionRepository = new Repository<CreatorSubscriptionState | null>(
  "fashion-creator:creator-subscription",
  null,
);
