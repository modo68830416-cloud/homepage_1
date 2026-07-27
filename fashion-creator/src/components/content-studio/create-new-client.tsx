"use client";

import { useMemo } from "react";
import { ContentStudioShell } from "@/components/content-studio/content-studio-shell";
import { useSavedLooks } from "@/lib/studio-store";
import { getDemoSourceLook, toContentSourceLook } from "@/lib/content-lookup";

export function CreateNewClient() {
  const { savedLooks } = useSavedLooks();

  const looks = useMemo(() => {
    const converted = savedLooks.map((look) => toContentSourceLook(look));
    return converted.length > 0 ? converted : [getDemoSourceLook()];
  }, [savedLooks]);

  return <ContentStudioShell looks={looks} />;
}
