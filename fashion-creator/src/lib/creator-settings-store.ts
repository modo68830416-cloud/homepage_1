"use client";

import { useSyncExternalStore } from "react";
import { useUser } from "@clerk/nextjs";
import { creatorProfile, subscriptionPlans } from "@/data/creator-business";
import {
  brandKitRepository,
  creatorSubscriptionRepository,
  defaultExportSettingsRepository,
} from "@/repositories/creator-repository";
import { useCloudSync } from "@/lib/cloud-sync";
import {
  getBrandKitRemote,
  getExportSettingsRemote,
  getSubscriptionRemote,
  setBrandKitRemote,
  setExportSettingsRemote,
  setSubscriptionRemote,
} from "@/db/actions/creator-settings";
import type { BrandKitSettings, CreatorSubscriptionState, DefaultExportSettings, DemoPaymentMethod } from "@/types/creator-settings";

const DEFAULT_BRAND_KIT: BrandKitSettings = {
  brandName: "Fashion Creator Studio",
  color: "#D9FF57",
  ctaCopy: "Shop the Look",
  disclosure: "이 콘텐츠에는 제휴 링크가 포함될 수 있으며, 구매 시 크리에이터에게 일정 수익이 발생할 수 있습니다.",
};

const DEFAULT_EXPORT_SETTINGS: DefaultExportSettings = {
  aspectRatio: "9:16",
  channel: "YouTube",
  language: "한국어",
  watermark: true,
  hashtags: true,
};

export function useBrandKit() {
  const { isSignedIn } = useUser();
  const stored = useSyncExternalStore(
    brandKitRepository.subscribe.bind(brandKitRepository),
    brandKitRepository.get.bind(brandKitRepository),
    brandKitRepository.getServerSnapshot.bind(brandKitRepository),
  );

  useCloudSync<BrandKitSettings | null>({
    isSignedIn,
    local: stored,
    setLocal: (value) => brandKitRepository.set(value),
    isEmpty: (value) => value === null,
    load: getBrandKitRemote,
    save: (value) => (value ? setBrandKitRemote(value) : Promise.resolve()),
  });

  function save(settings: BrandKitSettings) {
    brandKitRepository.set(settings);
  }

  return { brandKit: stored ?? DEFAULT_BRAND_KIT, save };
}

export function useDefaultExportSettings() {
  const { isSignedIn } = useUser();
  const stored = useSyncExternalStore(
    defaultExportSettingsRepository.subscribe.bind(defaultExportSettingsRepository),
    defaultExportSettingsRepository.get.bind(defaultExportSettingsRepository),
    defaultExportSettingsRepository.getServerSnapshot.bind(defaultExportSettingsRepository),
  );

  useCloudSync<DefaultExportSettings | null>({
    isSignedIn,
    local: stored,
    setLocal: (value) => defaultExportSettingsRepository.set(value),
    isEmpty: (value) => value === null,
    load: getExportSettingsRemote,
    save: (value) => (value ? setExportSettingsRemote(value) : Promise.resolve()),
  });

  function save(settings: DefaultExportSettings) {
    defaultExportSettingsRepository.set(settings);
  }

  return { exportSettings: stored ?? DEFAULT_EXPORT_SETTINGS, save };
}

export function useCreatorSubscription() {
  const { isSignedIn } = useUser();
  const stored = useSyncExternalStore(
    creatorSubscriptionRepository.subscribe.bind(creatorSubscriptionRepository),
    creatorSubscriptionRepository.get.bind(creatorSubscriptionRepository),
    creatorSubscriptionRepository.getServerSnapshot.bind(creatorSubscriptionRepository),
  );

  useCloudSync<CreatorSubscriptionState | null>({
    isSignedIn,
    local: stored,
    setLocal: (value) => creatorSubscriptionRepository.set(value),
    isEmpty: (value) => value === null,
    load: getSubscriptionRemote,
    save: (value) => (value ? setSubscriptionRemote(value) : Promise.resolve()),
  });

  const state = stored ?? {
    planName: creatorProfile.subscriptionPlan,
    creditsRemaining: creatorProfile.creditsRemaining,
    paymentMethod: null as DemoPaymentMethod | null,
  };

  function changePlan(planName: string) {
    const plan = subscriptionPlans.find((item) => item.name === planName);
    creatorSubscriptionRepository.set({
      ...state,
      planName,
      creditsRemaining: plan?.credits ?? state.creditsRemaining,
    });
  }

  function registerPaymentMethod(method: DemoPaymentMethod) {
    creatorSubscriptionRepository.set({ ...state, paymentMethod: method });
  }

  function removePaymentMethod() {
    creatorSubscriptionRepository.set({ ...state, paymentMethod: null });
  }

  function cancelSubscription() {
    creatorSubscriptionRepository.set({ ...state, planName: "Free", creditsRemaining: 20, paymentMethod: null });
  }

  return { subscription: state, changePlan, registerPaymentMethod, removePaymentMethod, cancelSubscription };
}
