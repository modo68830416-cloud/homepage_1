"use client";

import { useEffect, useRef } from "react";
import { trackCommerceEvent } from "@/lib/commerce-events";

export function LookViewTracker() {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    trackCommerceEvent("look_opened");
  }, []);

  return null;
}
