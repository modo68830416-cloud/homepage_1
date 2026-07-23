"use client";

import { useEffect } from "react";
import { useRecentlyViewed } from "@/lib/use-local-list";

export function RecordView({ propertyId }: { propertyId: string }) {
  const { recordView } = useRecentlyViewed();

  useEffect(() => {
    recordView(propertyId);
  }, [propertyId, recordView]);

  return null;
}
